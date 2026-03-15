import React, { useState, useEffect } from 'react'
import { type StaticMaterial } from '@/data/materials'
import { useMaterials } from '@/context/MaterialsContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import {
  Plus, Trash2, Edit, X, Check, Upload, Settings, BookOpen,
  Tag, Key, LogOut, Save, FolderOpen, ChevronRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import * as github from '@/lib/github'

// ─── Types ────────────────────────────────────────────
interface CategoryMeta {
  icon: string
  color: string
}

// ─── Generate materials.json content from data ──────────
function generateMaterialsJSON(
  materials: StaticMaterial[],
  meta: Record<string, CategoryMeta>
): string {
  return JSON.stringify({
    meta,
    materials: materials.map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      category: m.category,
      path: m.path,
      linkUrl: m.linkUrl,
      icon: m.icon,
    })),
  }, null, 2)
}

// ─── Emoji Picker ─────────────────────────────────────
const EMOJI_OPTIONS = [
  { group: 'למידה', emojis: ['📄', '📚', '📖', '📝', '📋', '🧠', '💡', '🎓', '✏️', '📐'] },
  { group: 'מדעים', emojis: ['💻', '📊', '📈', '📉', '🔬', '🧪', '⚗️', '🔭', '🧮', '🧬'] },
  { group: 'כללי', emojis: ['🌐', '⚙️', '🔧', '🔑', '🏰', '🎵', '⭐', '✨', '🌳', '🔄'] },
  { group: 'עוד', emojis: ['🎯', '🚀', '💎', '🎨', '🎪', '🐼', '☕', '🔍', '📜', '🖥️'] },
]

function isImageIcon(v: string) {
  return v.startsWith('/') || v.startsWith('http') || v.startsWith('data:')
}

function EmojiPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [uploadingIcon, setUploadingIcon] = useState(false)

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      toast.error('תמונת אייקון עד 2MB')
      return
    }
    setUploadingIcon(true)
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve((reader.result as string).split(',')[1])
        reader.readAsDataURL(file)
      })
      const fileName = `icons/${Date.now()}_${file.name}`
      await github.uploadBinaryFile(`docs/${fileName}`, base64, `העלאת אייקון ${file.name}`)
      await github.uploadBinaryFile(`public/${fileName}`, base64, `העלאת אייקון ${file.name} (public)`)
      onChange(`/${fileName}`)
      setOpen(false)
      toast.success('האייקון הועלה!')
    } catch (err: any) {
      toast.error(`שגיאה: ${err.message}`)
    } finally {
      setUploadingIcon(false)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-muted transition-colors"
      >
        {isImageIcon(value) ? (
          <img src={value} alt="" className="w-7 h-7 object-contain" />
        ) : (
          <span className="text-2xl">{value || '📄'}</span>
        )}
        <span className="text-xs text-muted-foreground">בחרי אייקון</span>
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 bg-background border rounded-lg shadow-lg p-3 w-72">
          {EMOJI_OPTIONS.map(group => (
            <div key={group.group} className="mb-2">
              <p className="text-xs text-muted-foreground mb-1">{group.group}</p>
              <div className="flex flex-wrap gap-1">
                {group.emojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => { onChange(emoji); setOpen(false) }}
                    className={`text-xl p-1 rounded hover:bg-muted transition-colors ${
                      value === emoji ? 'bg-primary/10 ring-2 ring-primary' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 space-y-2">
            <Input
              value={isImageIcon(value) ? '' : value}
              onChange={e => onChange(e.target.value)}
              placeholder="או הקלידי אימוג'י..."
              className="text-center"
            />
            <label className={`flex items-center justify-center gap-2 px-3 py-2 border border-dashed rounded-md cursor-pointer hover:bg-muted transition-colors text-sm ${uploadingIcon ? 'opacity-50' : ''}`}>
              <Upload className="w-4 h-4" />
              {uploadingIcon ? 'מעלה...' : 'העלי תמונת אייקון'}
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.gif,.svg,.webp"
                className="hidden"
                onChange={handleIconUpload}
                disabled={uploadingIcon}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Path Builder Component ──────────────────────────
function PathBuilder({
  path,
  onChange,
  categories,
  allMaterials,
}: {
  path: string[]
  onChange: (path: string[]) => void
  categories: Record<string, CategoryMeta>
  allMaterials: StaticMaterial[]
}) {
  const [addingAt, setAddingAt] = useState<number | null>(null)
  const [newSegment, setNewSegment] = useState('')

  // Get existing segments at each level from all materials
  const getOptionsAtLevel = (level: number, parentPath: string[]): string[] => {
    const options = new Set<string>()
    allMaterials.forEach(m => {
      if (m.path.length > level && parentPath.every((seg, i) => m.path[i] === seg)) {
        options.add(m.path[level])
      }
    })
    // Also include category meta names at level 0
    if (level === 0) {
      Object.keys(categories).forEach(name => options.add(name))
    }
    return Array.from(options).sort()
  }

  const currentOptions = getOptionsAtLevel(path.length, path)

  const addSegment = (seg: string) => {
    onChange([...path, seg])
    setAddingAt(null)
    setNewSegment('')
  }

  const removeFromLevel = (level: number) => {
    onChange(path.slice(0, level))
  }

  return (
    <div className="space-y-3">
      {/* Current path display */}
      {path.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          {path.map((seg, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                {categories[seg]?.icon || '📁'} {seg}
                <button
                  type="button"
                  onClick={() => removeFromLevel(i)}
                  className="mr-1 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Options for next level */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          {path.length === 0 ? 'בחרי נושא ראשי *' : 'הוסיפי תת-נושא (אופציונלי)'}
        </p>
        <div className="flex gap-2 flex-wrap">
          {currentOptions.map(opt => (
            <Button
              key={opt}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSegment(opt)}
            >
              {categories[opt]?.icon || '📁'} {opt}
            </Button>
          ))}
          {addingAt === path.length ? (
            <div className="flex gap-1 items-center">
              <Input
                value={newSegment}
                onChange={e => setNewSegment(e.target.value)}
                placeholder="שם חדש..."
                className="w-32 h-8 text-sm"
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter' && newSegment.trim()) addSegment(newSegment.trim())
                  if (e.key === 'Escape') { setAddingAt(null); setNewSegment('') }
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => { if (newSegment.trim()) addSegment(newSegment.trim()) }}
              >
                <Check className="w-3 h-3" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => { setAddingAt(null); setNewSegment('') }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-dashed"
              onClick={() => setAddingAt(path.length)}
            >
              <Plus className="w-3 h-3 ml-1" /> {path.length === 0 ? 'נושא חדש' : 'תת-נושא חדש'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Material Form ────────────────────────────────────
function MaterialForm({
  material,
  categories,
  allMaterials,
  onSave,
  onCancel,
  initialLinkUrl,
}: {
  material?: StaticMaterial
  categories: Record<string, CategoryMeta>
  allMaterials: StaticMaterial[]
  onSave: (m: StaticMaterial) => void
  onCancel: () => void
  initialLinkUrl?: string
}) {
  const [form, setForm] = useState<StaticMaterial>(
    material || {
      id: '',
      title: '',
      description: '',
      category: 'teaching',
      path: [],
      linkUrl: initialLinkUrl || '',
      icon: '📄',
    }
  )

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error('חובה למלא כותרת')
      return
    }
    if (form.path.length === 0) {
      toast.error('חובה לבחור לפחות נושא אחד')
      return
    }
    const id = form.id || form.title.toLowerCase().replace(/[^a-z0-9א-ת]/g, '-').replace(/-+/g, '-')
    onSave({ ...form, id })
  }

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">כותרת *</label>
        <Input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="שם החומר"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">תיאור</label>
        <Textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="תיאור קצר"
          rows={2}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-2">קטגוריה ראשית</label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={form.category === 'teaching' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setForm({ ...form, category: 'teaching' })}
          >
            📚 חומרי למידה
          </Button>
          <Button
            type="button"
            variant={form.category === 'general' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setForm({ ...form, category: 'general' })}
          >
            ✨ דברים מעניינים
          </Button>
        </div>
      </div>

      {/* Path (dynamic hierarchy) */}
      <div>
        <label className="block text-sm font-medium mb-2">מיקום בהיררכיה *</label>
        <PathBuilder
          path={form.path}
          onChange={path => setForm({ ...form, path })}
          categories={categories}
          allMaterials={allMaterials}
        />
      </div>

      {/* Link */}
      <div>
        <label className="block text-sm font-medium mb-1">קישור</label>
        <Input
          value={form.linkUrl}
          onChange={e => setForm({ ...form, linkUrl: e.target.value })}
          placeholder="/fileName.html או https://..."
        />
        <p className="text-xs text-muted-foreground mt-1">
          לקובץ שהעלית: <code className="bg-muted px-1 rounded">/שם-הקובץ.html</code> | לאתר חיצוני: <code className="bg-muted px-1 rounded">https://...</code>
        </p>
      </div>

      {/* Icon */}
      <div>
        <label className="block text-sm font-medium mb-2">אייקון</label>
        <EmojiPicker value={form.icon} onChange={icon => setForm({ ...form, icon })} />
      </div>

      {/* Preview */}
      <div className="border rounded-lg p-4 bg-muted/30">
        <p className="text-xs text-muted-foreground mb-2">תצוגה מקדימה:</p>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{form.icon}</span>
          <div>
            <h4 className="font-bold">{form.title || 'כותרת החומר'}</h4>
            <p className="text-sm text-muted-foreground">{form.description || 'תיאור...'}</p>
            {form.path.length > 0 && (
              <div className="flex items-center gap-1 mt-1 text-xs">
                {form.path.map((seg, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {categories[seg]?.icon || '📁'} {seg}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 ml-1" /> ביטול
        </Button>
        <Button onClick={handleSave}>
          <Check className="w-4 h-4 ml-1" /> {material ? 'שמור שינויים' : 'הוסף'}
        </Button>
      </div>
    </div>
  )
}

// ─── Category Form ────────────────────────────────────
function CategoryForm({
  name: initialName,
  meta: initialMeta,
  onSave,
  onCancel,
}: {
  name?: string
  meta?: CategoryMeta
  onSave: (name: string, meta: CategoryMeta) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initialName || '')
  const [icon, setIcon] = useState(initialMeta?.icon || '📁')
  const [color, setColor] = useState(initialMeta?.color || 'from-gray-50 to-slate-50 border-gray-200')

  const colorPresets = [
    { label: 'כתום', value: 'from-orange-50 to-amber-50 border-orange-200' },
    { label: 'כחול', value: 'from-blue-50 to-indigo-50 border-blue-200' },
    { label: 'סגול', value: 'from-purple-50 to-fuchsia-50 border-purple-200' },
    { label: 'ירוק', value: 'from-emerald-50 to-teal-50 border-emerald-200' },
    { label: 'אדום', value: 'from-rose-50 to-pink-50 border-rose-200' },
    { label: 'צהוב', value: 'from-amber-50 to-yellow-50 border-amber-200' },
    { label: 'תכלת', value: 'from-sky-50 to-cyan-50 border-sky-200' },
    { label: 'סגול-כהה', value: 'from-violet-50 to-purple-50 border-violet-200' },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        <label className="text-sm font-medium">שם הקטגוריה *</label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="למשל: אלגוריתמים"
          disabled={!!initialName}
        />

        <label className="text-sm font-medium">אייקון</label>
        <Input value={icon} onChange={e => setIcon(e.target.value)} className="w-20" />

        <label className="text-sm font-medium">צבע</label>
        <div className="flex gap-2 flex-wrap">
          {colorPresets.map(cp => (
            <button
              key={cp.value}
              onClick={() => setColor(cp.value)}
              className={`px-3 py-1 rounded-lg border-2 text-xs bg-gradient-to-br ${cp.value} ${
                color === cp.value ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              {cp.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
        <span className="text-sm text-muted-foreground">תצוגה מקדימה:</span>
        <div className={`px-4 py-2 rounded-xl border bg-gradient-to-br ${color}`}>
          <span className="text-2xl ml-2">{icon}</span>
          <span className="font-medium">{name || 'שם הקטגוריה'}</span>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>ביטול</Button>
        <Button onClick={() => {
          if (!name.trim()) { toast.error('חובה למלא שם'); return }
          onSave(name, { icon, color })
        }}>
          <Check className="w-4 h-4 ml-1" /> שמור
        </Button>
      </div>
    </div>
  )
}

// ─── Main Admin Panel ─────────────────────────────────
export function AdminPanel() {
  // Load from runtime context (fetched from materials.json)
  const { materials: loadedMaterials, meta: loadedMeta } = useMaterials()

  // State
  const [materials, setMaterials] = useState<StaticMaterial[]>([...loadedMaterials])
  const [categories, setCategories] = useState<Record<string, CategoryMeta>>({ ...loadedMeta })

  // Sync when context data loads from JSON
  useEffect(() => {
    setMaterials([...loadedMaterials])
    setCategories({ ...loadedMeta })
  }, [loadedMaterials, loadedMeta])
  const [authenticated, setAuthenticated] = useState(github.hasToken())
  const [tokenInput, setTokenInput] = useState('')
  const [validating, setValidating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [activeTab, setActiveTab] = useState('materials')

  // Dialogs
  const [editingMaterial, setEditingMaterial] = useState<StaticMaterial | null>(null)
  const [showAddMaterial, setShowAddMaterial] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  // Filter
  const [filterCategory, setFilterCategory] = useState<'all' | 'teaching' | 'general'>('all')

  const filteredMaterials = filterCategory === 'all'
    ? materials
    : materials.filter(m => m.category === filterCategory)

  // ─── Auth ─────────────────────
  const [authError, setAuthError] = useState('')

  const handleLogin = async () => {
    setValidating(true)
    setAuthError('')
    github.setToken(tokenInput)
    const result = await github.validateToken()
    setValidating(false)
    if (result.valid && result.canWrite) {
      setAuthenticated(true)
      toast.success('התחברת בהצלחה! יש הרשאת כתיבה ✅')
    } else {
      github.clearToken()
      setAuthError(result.error || 'טוקן לא תקין')
    }
  }

  const handleLogout = () => {
    github.clearToken()
    setAuthenticated(false)
    setTokenInput('')
  }

  // ─── Materials CRUD ───────────
  const addMaterial = (m: StaticMaterial) => {
    // Auto-add category meta for new path segments
    m.path.forEach(seg => {
      if (!categories[seg]) {
        setCategories(prev => ({
          ...prev,
          [seg]: { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' }
        }))
      }
    })
    setMaterials(prev => [...prev, m])
    setShowAddMaterial(false)
    setHasChanges(true)
    toast.success(`"${m.title}" נוסף!`)
  }

  const updateMaterial = (m: StaticMaterial) => {
    m.path.forEach(seg => {
      if (!categories[seg]) {
        setCategories(prev => ({
          ...prev,
          [seg]: { icon: '📁', color: 'from-gray-50 to-slate-50 border-gray-200' }
        }))
      }
    })
    setMaterials(prev => prev.map(existing => existing.id === m.id ? m : existing))
    setEditingMaterial(null)
    setHasChanges(true)
    toast.success(`"${m.title}" עודכן!`)
  }

  const deleteMaterial = (id: string) => {
    const m = materials.find(x => x.id === id)
    if (!confirm(`למחוק את "${m?.title}"?`)) return
    setMaterials(prev => prev.filter(x => x.id !== id))
    setHasChanges(true)
    toast.success('נמחק!')
  }

  // ─── Categories CRUD ──────────
  const saveCategory = (name: string, meta: CategoryMeta) => {
    setCategories(prev => ({ ...prev, [name]: meta }))
    setEditingCategory(null)
    setShowAddCategory(false)
    setHasChanges(true)
    toast.success(`קטגוריה "${name}" נשמרה!`)
  }

  const deleteCategory = (name: string) => {
    const usedBy = materials.filter(m => m.path.includes(name))
    if (usedBy.length > 0) {
      toast.error(`לא ניתן למחוק - ${usedBy.length} חומרים משתמשים בקטגוריה זו`)
      return
    }
    if (!confirm(`למחוק את הקטגוריה "${name}"?`)) return
    setCategories(prev => {
      const next = { ...prev }
      delete next[name]
      return next
    })
    setHasChanges(true)
    toast.success('קטגוריה נמחקה!')
  }

  // ─── Save to GitHub ───────────
  const saveToGitHub = async () => {
    if (!authenticated) {
      toast.error('יש להתחבר עם GitHub token קודם')
      return
    }
    setSaving(true)
    try {
      const newContent = generateMaterialsJSON(materials, categories)
      // Save to both docs/ (immediate effect) and public/ (survives rebuilds)
      const paths = ['docs/materials.json', 'public/materials.json']
      for (const path of paths) {
        let sha: string | undefined
        try {
          const existing = await github.getFileContent(path)
          sha = existing.sha
        } catch {
          // File doesn't exist yet, that's OK
        }
        if (sha) {
          await github.updateFile(path, newContent, `עדכון חומרי למידה מ-Admin Panel (${path})`, sha)
        } else {
          await github.createFile(path, newContent, `עדכון חומרי למידה מ-Admin Panel (${path})`)
        }
      }
      setHasChanges(false)
      toast.success('השינויים נשמרו ונכנסו לתוקף מיידית!')
    } catch (error: any) {
      console.error('Save error:', error)
      toast.error(`שגיאה בשמירה: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  // ─── File Upload ──────────────
  const [uploadedFileLink, setUploadedFileLink] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!authenticated) {
      toast.error('יש להתחבר עם GitHub token קודם')
      return
    }
    if (file.size > 100 * 1024 * 1024) {
      toast.error('הקובץ גדול מדי (מקסימום 100MB)')
      return
    }

    setUploading(true)
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1]
        const fileName = file.name
        // Upload to both docs/ (immediate) and public/ (survives rebuilds)
        await github.uploadBinaryFile(`docs/${fileName}`, base64, `העלאת קובץ ${fileName} מ-Admin Panel`)
        await github.uploadBinaryFile(`public/${fileName}`, base64, `העלאת קובץ ${fileName} מ-Admin Panel (public)`)
        toast.success(`"${fileName}" הועלה בהצלחה!`)
        // For .ipynb files, generate a Google Colab link
        if (fileName.endsWith('.ipynb')) {
          setUploadedFileLink(`https://colab.research.google.com/github/anatshapir/anatshapir.github.io/blob/main/docs/${fileName}`)
        } else {
          setUploadedFileLink(`/${fileName}`)
        }
      } catch (error: any) {
        toast.error(`שגיאה בהעלאה: ${error.message}`)
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleCreateMaterialFromUpload = () => {
    setShowAddMaterial(true)
    setActiveTab('materials')
  }

  // ─── Login Screen ─────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-5xl mb-4">🔐</div>
            <CardTitle className="text-2xl font-serif">ניהול האתר</CardTitle>
            <p className="text-muted-foreground mt-2">
              הכניסי GitHub Personal Access Token כדי להתחבר
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              value={tokenInput}
              onChange={e => { setTokenInput(e.target.value); setAuthError('') }}
              placeholder="ghp_xxxxxxxxxxxx או github_pat_xxxx"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800 whitespace-pre-line">
                ❌ {authError}
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={!tokenInput || validating}
            >
              {validating ? 'בודק הרשאות...' : <><Key className="w-4 h-4 ml-2" /> התחברי</>}
            </Button>

            <div className="text-xs text-muted-foreground space-y-2 bg-muted/50 rounded-lg p-3">
              <p className="font-bold">איך מייצרים Token?</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>GitHub → Settings → Developer settings → Personal access tokens</li>
                <li>בחרי <strong>Fine-grained tokens</strong> → Generate new token</li>
                <li>ב-Repository access: בחרי <strong>Only select repositories</strong> → <code className="bg-background px-1 rounded">anatshapir.github.io</code></li>
                <li>ב-Permissions → Repository permissions:</li>
              </ol>
              <div className="mr-4 space-y-0.5">
                <p>• <strong>Contents</strong>: Read and write ✅</p>
                <p>• <strong>Metadata</strong>: Read-only ✅ (אוטומטי)</p>
              </div>
              <p className="mt-2 text-amber-700 font-medium">⚠️ Classic token? צריך scope של <code className="bg-background px-1 rounded">repo</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ─── Main Admin UI ────────────
  return (
    <div className="min-h-screen bg-background py-24 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              ניהול האתר
            </h1>
            <p className="text-muted-foreground mt-1">הוסיפי, ערכי ומחקי תוכן</p>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <Button onClick={saveToGitHub} disabled={saving} className="animate-pulse">
                <Save className="w-4 h-4 ml-2" />
                {saving ? 'שומר...' : 'שמור ב-GitHub'}
              </Button>
            )}
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← חזרה לאתר
            </a>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="התנתק">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Unsaved changes banner */}
        {hasChanges && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-center justify-between">
            <span className="text-amber-800 text-sm font-medium">
              יש שינויים שלא נשמרו! לחצי "שמור ב-GitHub" כדי לפרסם.
            </span>
            <Button size="sm" onClick={saveToGitHub} disabled={saving}>
              {saving ? 'שומר...' : 'שמור עכשיו'}
            </Button>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="materials" className="text-base">
              <BookOpen className="w-4 h-4 ml-1" /> חומרים ({materials.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-base">
              <Tag className="w-4 h-4 ml-1" /> קטגוריות ({Object.keys(categories).length})
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-base">
              <Upload className="w-4 h-4 ml-1" /> העלאת קבצים
            </TabsTrigger>
          </TabsList>

          {/* ══════ Materials Tab ══════ */}
          <TabsContent value="materials">
            <div className="space-y-6">
              {/* Toolbar */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex gap-2">
                  <Button
                    variant={filterCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory('all')}
                  >
                    הכל ({materials.length})
                  </Button>
                  <Button
                    variant={filterCategory === 'teaching' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory('teaching')}
                  >
                    חומרי למידה ({materials.filter(m => m.category === 'teaching').length})
                  </Button>
                  <Button
                    variant={filterCategory === 'general' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory('general')}
                  >
                    דברים מעניינים ({materials.filter(m => m.category === 'general').length})
                  </Button>
                </div>
                <Button onClick={() => setShowAddMaterial(true)}>
                  <Plus className="w-4 h-4 ml-2" /> הוסף חומר חדש
                </Button>
              </div>

              {/* Materials List */}
              <div className="grid gap-3">
                {filteredMaterials.map(m => (
                  <Card key={m.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{m.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg truncate">{m.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              m.category === 'teaching'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {m.category === 'teaching' ? 'למידה' : 'מעניין'}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{m.description}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            {m.path.map((seg, i) => (
                              <React.Fragment key={i}>
                                {i > 0 && <ChevronRight className="w-3 h-3" />}
                                <span className={`px-2 py-0.5 rounded bg-gradient-to-br ${categories[seg]?.color || 'bg-muted'}`}>
                                  {categories[seg]?.icon || '📁'} {seg}
                                </span>
                              </React.Fragment>
                            ))}
                            {m.linkUrl && (
                              <span className="text-primary mr-2">{m.linkUrl}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setEditingMaterial(m)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteMaterial(m.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ══════ Categories Tab ══════ */}
          <TabsContent value="categories">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">קטגוריות ונושאים</h2>
                <Button onClick={() => setShowAddCategory(true)}>
                  <Plus className="w-4 h-4 ml-2" /> קטגוריה חדשה
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(categories).map(([name, meta]) => {
                  const count = materials.filter(m => m.path.includes(name)).length
                  return (
                    <Card key={name} className={`bg-gradient-to-br ${meta.color} hover:shadow-md transition-shadow`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{meta.icon}</span>
                            <div>
                              <h3 className="font-bold text-lg">{name}</h3>
                              <p className="text-sm text-muted-foreground">{count} חומרים</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => setEditingCategory(name)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteCategory(name)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          {/* ══════ Upload Tab ══════ */}
          <TabsContent value="upload">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" /> העלאת קבצים
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    העלי קובץ שיהיה זמין באתר. הקובץ יועלה לשורש הפרויקט ויהיה נגיש בכתובת
                    <code className="mx-1 px-1 bg-muted rounded">/fileName</code>
                  </p>

                  {!uploadedFileLink ? (
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      uploading ? 'border-primary bg-primary/5' : 'hover:border-primary'
                    }`}>
                      {uploading ? (
                        <>
                          <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                          <p className="text-lg font-medium">מעלה את הקובץ...</p>
                        </>
                      ) : (
                        <>
                          <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                          <label className="cursor-pointer">
                            <span className="text-lg font-medium text-primary hover:underline">בחרי קובץ להעלאה</span>
                            <input
                              type="file"
                              accept=".html,.htm,.pdf,.mp4,.webm,.mov,.png,.jpg,.jpeg,.gif,.svg,.ipynb"
                              className="hidden"
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className="text-sm text-muted-foreground mt-2">HTML, PDF, MP4, Jupyter Notebooks, תמונות (עד 100MB)</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-green-300 bg-green-50 rounded-xl p-6 text-center space-y-4">
                      <div className="text-4xl">✅</div>
                      <div>
                        <p className="font-bold text-lg text-green-800">הקובץ הועלה בהצלחה!</p>
                        <p className="text-green-700 mt-1">
                          הקובץ זמין בכתובת: <code className="bg-white px-2 py-0.5 rounded font-mono">{uploadedFileLink}</code>
                        </p>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button onClick={handleCreateMaterialFromUpload}>
                          <Plus className="w-4 h-4 ml-2" /> צרי חומר עם הקישור הזה
                        </Button>
                        <Button variant="outline" onClick={() => setUploadedFileLink(null)}>
                          העלי קובץ נוסף
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h4 className="font-medium text-sm">איך זה עובד:</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>בחרי קובץ להעלאה (HTML, PDF, MP4, Jupyter Notebooks, תמונות)</li>
                      <li>הקובץ יועלה ל-GitHub אוטומטית</li>
                      <li>לחצי "צרי חומר" כדי להוסיף אותו לאתר עם כותרת, תיאור ואייקון</li>
                      <li>שמרי ב-GitHub והאתר יתעדכן!</li>
                    </ol>
                    <p className="text-xs text-amber-700 mt-2">
                      סרטונים גדולים (מעל 25MB) עלולים להיות איטיים בהעלאה. מקסימום 100MB.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ══════ Dialogs ══════ */}

      {/* Add Material Dialog */}
      <Dialog open={showAddMaterial} onOpenChange={(open) => {
        setShowAddMaterial(open)
        if (!open) setUploadedFileLink(null)
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>הוספת חומר חדש</DialogTitle>
            <DialogDescription>
              {uploadedFileLink
                ? `הקובץ ${uploadedFileLink} הועלה - מלאי את שאר הפרטים`
                : 'מלאי את הפרטים של החומר החדש'}
            </DialogDescription>
          </DialogHeader>
          <MaterialForm
            categories={categories}
            allMaterials={materials}
            onSave={addMaterial}
            onCancel={() => setShowAddMaterial(false)}
            initialLinkUrl={uploadedFileLink || undefined}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Material Dialog */}
      <Dialog open={!!editingMaterial} onOpenChange={() => setEditingMaterial(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>עריכת חומר</DialogTitle>
            <DialogDescription>ערכי את הפרטים של "{editingMaterial?.title}"</DialogDescription>
          </DialogHeader>
          {editingMaterial && (
            <MaterialForm
              material={editingMaterial}
              categories={categories}
              allMaterials={materials}
              onSave={updateMaterial}
              onCancel={() => setEditingMaterial(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle>קטגוריה חדשה</DialogTitle>
            <DialogDescription>הוסיפי קטגוריה חדשה עם אייקון וצבע</DialogDescription>
          </DialogHeader>
          <CategoryForm
            onSave={saveCategory}
            onCancel={() => setShowAddCategory(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle>עריכת קטגוריה</DialogTitle>
            <DialogDescription>שני את האייקון או הצבע של "{editingCategory}"</DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              name={editingCategory}
              meta={categories[editingCategory]}
              onSave={saveCategory}
              onCancel={() => setEditingCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
