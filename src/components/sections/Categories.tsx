import React from 'react';
import { BookOpen, Star, Sparkles, Pencil, Heart, Coffee, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Material } from '@/blink/client';

interface CategoriesProps {
  teachingMaterials: Material[];
  generalMaterials: Material[];
}

export function Categories({ teachingMaterials = [], generalMaterials = [] }: CategoriesProps) {
  // Group materials by subcategory
  const teachingBySub = (teachingMaterials ?? []).reduce((acc, m) => {
    const sub = m.subcategory || 'כללי'
    if (!acc[sub]) acc[sub] = []
    acc[sub].push(m)
    return acc
  }, {} as Record<string, Material[]>)

  const generalBySub = (generalMaterials ?? []).reduce((acc, m) => {
    const sub = m.subcategory || 'כללי'
    if (!acc[sub]) acc[sub] = []
    acc[sub].push(m)
    return acc
  }, {} as Record<string, Material[]>)

  const sections = [
    {
      id: 'teaching',
      title: 'חומרי למידה',
      description: teachingMaterials.length > 0 
        ? `${teachingMaterials.length} חומרים זמינים`
        : 'מערכי שיעור, דפי עבודה ומשחקים לימודיים שיצרתי באהבה עבור תלמידים ומורים.',
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      items: Object.entries(teachingBySub).slice(0, 3).map(([sub, mats]) => ({
        name: sub,
        count: mats.length,
        icon: <Pencil size={18} />
      })),
      materials: teachingMaterials.slice(0, 6),
      color: 'bg-primary/5',
      borderColor: 'border-primary/20',
    },
    {
      id: 'general',
      title: 'דברים מעניינים',
      description: generalMaterials.length > 0 
        ? `${generalMaterials.length} דברים מעניינים`
        : 'פינה של השראה - ספרים, שירים, וסתם דברים שעושים לי טוב ומעוררים מחשבה.',
      icon: <Star className="w-10 h-10 text-secondary" />,
      items: Object.entries(generalBySub).slice(0, 3).map(([sub, mats]) => ({
        name: sub,
        count: mats.length,
        icon: <Heart size={18} />
      })),
      materials: generalMaterials.slice(0, 6),
      color: 'bg-secondary/5',
      borderColor: 'border-secondary/20',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">
            מה תמצאו כאן?
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sections.map((section) => (
            <Card 
              key={section.id} 
              id={section.id}
              className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 ${section.borderColor} ${section.color}`}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
              
              <CardHeader className="pt-8 px-8 space-y-4">
                <div className="p-4 bg-background rounded-2xl shadow-sm inline-flex">
                  {section.icon}
                </div>
                <CardTitle className="text-3xl font-serif font-bold">{section.title}</CardTitle>
                <CardDescription className="text-xl text-muted-foreground leading-relaxed">
                  {section.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8 space-y-6">
                {/* Subcategories */}
                {section.items.length > 0 && (
                  <div className="grid grid-cols-1 gap-3">
                    {section.items.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-background/50 rounded-xl hover:bg-background transition-colors group/item"
                      >
                        <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover/item:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <span className="text-lg font-medium flex-1">{item.name}</span>
                        <span className="text-sm text-muted-foreground">({item.count})</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Materials Preview */}
                {section.materials.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-muted-foreground">תוכן אחרון שנוסף:</h4>
                    {section.materials.slice(0, 3).map((mat) => (
                      <a 
                        key={mat.id}
                        href={mat.linkUrl || '#'}
                        target={mat.linkUrl ? '_blank' : undefined}
                        rel={mat.linkUrl ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between p-3 bg-background/70 rounded-lg hover:bg-background transition-colors group/link"
                      >
                        <span className="font-medium truncate flex-1">{mat.title}</span>
                        {mat.linkUrl && <ExternalLink size={14} className="text-muted-foreground group-hover/link:text-primary" />}
                      </a>
                    ))}
                  </div>
                )}
                
                <a href={`#${section.id}`} className="block w-full py-4 rounded-xl bg-background border-2 border-primary/20 text-primary font-bold text-lg hover:bg-primary hover:text-white transition-all text-center">
                  צפו בכל התכנים
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
