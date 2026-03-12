import React, { useState, useEffect } from 'react'
import { blink, Material } from '@/blink/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, Edit, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export function AdminPanel() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('teaching')
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subcategory: '',
    content: '',
    linkUrl: '',
    imageUrl: ''
  })

  useEffect(() => {
    loadMaterials()
  }, [])

  const loadMaterials = async () => {
    try {
      const data = await blink.db.materials.list({
        orderBy: { createdAt: 'desc' }
      })
      setMaterials(data as Material[])
    } catch (error) {
      console.error('Error loading materials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        await blink.db.materials.update(editingId, {
          title: formData.title,
          description: formData.description,
          subcategory: formData.subcategory,
          content: formData.content,
          linkUrl: formData.linkUrl,
          imageUrl: formData.imageUrl,
          category: activeTab as 'teaching' | 'general',
          updatedAt: new Date().toISOString()
        })
        toast.success('התוכן עודכן בהצלחה!')
      } else {
        await blink.db.materials.create({
          title: formData.title,
          description: formData.description,
          subcategory: formData.subcategory,
          content: formData.content,
          linkUrl: formData.linkUrl,
          imageUrl: formData.imageUrl,
          category: activeTab as 'teaching' | 'general'
        })
        toast.success('התוכן נוסף בהצלחה!')
      }
      
      resetForm()
      loadMaterials()
    } catch (error) {
      console.error('Error saving material:', error)
      toast.error('שגיאה בשמירה')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('האם את בטוחה שברצונך למחוק?')) return
    
    try {
      await blink.db.materials.delete(id)
      toast.success('נמחק בהצלחה')
      loadMaterials()
    } catch (error) {
      console.error('Error deleting:', error)
      toast.error('שגיאה במחיקה')
    }
  }

  const handleEdit = (material: Material) => {
    setEditingId(material.id)
    setActiveTab(material.category)
    setFormData({
      title: material.title,
      description: material.description || '',
      subcategory: material.subcategory || '',
      content: material.content || '',
      linkUrl: material.linkUrl || '',
      imageUrl: material.imageUrl || ''
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      subcategory: '',
      content: '',
      linkUrl: '',
      imageUrl: ''
    })
  }

  const teachingMaterials = materials.filter(m => m.category === 'teaching')
  const generalMaterials = materials.filter(m => m.category === 'general')

  return (
    <div className="min-h-screen bg-background py-24 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            ניהול תוכן
          </h1>
          <p className="text-xl text-muted-foreground">
            הוסיפי, ערכי ומחקי תוכן באתר
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="teaching" className="text-lg">
              חומרי למידה ({teachingMaterials.length})
            </TabsTrigger>
            <TabsTrigger value="general" className="text-lg">
              דברים מעניינים ({generalMaterials.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <Card className="h-fit sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">
                    {editingId ? 'עריכת תוכן' : 'הוספת תוכן חדש'}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === 'teaching' 
                      ? 'מלאי את הפרטים להוספת חומר לימודי חדש'
                      : 'מלאי את הפרטים להוספת תוכן מעניין חדש'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">כותרת *</label>
                      <Input
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="למשל: דף עבודה לכיתה א'"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">תיאור קצר</label>
                      <Textarea
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="תיאור קצר של התוכן..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">תת-קטגוריה</label>
                      <Input
                        value={formData.subcategory}
                        onChange={e => setFormData({...formData, subcategory: e.target.value})}
                        placeholder="למשל: דפי עבודה, משחקים, וכו'"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">תוכן מפורט</label>
                      <Textarea
                        value={formData.content}
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        placeholder="תוכן מלא, הוראות, וכו'"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">קישור (אופציונלי)</label>
                      <Input
                        value={formData.linkUrl}
                        onChange={e => setFormData({...formData, linkUrl: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">תמונה (URL אופציונלי)</label>
                      <Input
                        value={formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                        placeholder="https://... (קישור לתמונה)"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingId ? (
                          <> <Check className="ml-2 w-4 h-4" /> שמור שינויים</>
                        ) : (
                          <> <Plus className="ml-2 w-4 h-4" /> הוסף תוכן</>
                        )}
                      </Button>
                      {editingId && (
                        <Button type="button" variant="outline" onClick={resetForm}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold">
                  {activeTab === 'teaching' ? 'חומרי הלמידה שלי' : 'הדברים המעניינים שלי'}
                </h2>
                
                {loading ? (
                  <p className="text-center text-muted-foreground">טוען...</p>
                ) : (activeTab === 'teaching' ? teachingMaterials : generalMaterials).length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">אין תוכן עדיין</p>
                    <p className="text-sm text-muted-foreground">הוסיפי תוכן ראשון!</p>
                  </div>
                ) : (
                  (activeTab === 'teaching' ? teachingMaterials : generalMaterials).map(material => (
                    <Card key={material.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold">{material.title}</h3>
                            {material.subcategory && (
                              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-sm rounded mt-2">
                                {material.subcategory}
                              </span>
                            )}
                            {material.description && (
                              <p className="text-muted-foreground mt-2 line-clamp-2">
                                {material.description}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                              נוצר: {new Date(material.createdAt).toLocaleDateString('he-IL')}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleEdit(material)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => handleDelete(material.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
