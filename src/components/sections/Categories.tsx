import React from 'react';
import { BookOpen, Star, Pencil, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useMaterials } from '@/context/MaterialsContext';

export function Categories() {
  const { materials } = useMaterials();
  const teachingMaterials = materials.filter(m => m.category === 'teaching');
  const generalMaterials = materials.filter(m => m.category === 'general');

  // Count by subcategory
  const teachingSubs = Object.entries(
    teachingMaterials.reduce((acc, m) => {
      acc[m.path[0]] = (acc[m.path[0]] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).slice(0, 4);

  const generalSubs = Object.entries(
    generalMaterials.reduce((acc, m) => {
      acc[m.path[0]] = (acc[m.path[0]] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).slice(0, 4);

  const sections = [
    {
      id: 'teaching',
      title: 'חומרי למידה',
      description: `${teachingMaterials.length} חומרים זמינים`,
      longDesc: 'מערכי שיעור, דפי עבודה ומשחקים לימודיים שיצרתי באהבה עבור תלמידים ומורים.',
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      subs: teachingSubs,
      subIcon: <Pencil size={18} />,
      color: 'bg-primary/5',
      borderColor: 'border-primary/20',
    },
    {
      id: 'general',
      title: 'דברים מעניינים',
      description: `${generalMaterials.length} דברים מעניינים`,
      longDesc: 'פינה של השראה - ספרים, שירים, וסתם דברים שעושים לי טוב ומעוררים מחשבה.',
      icon: <Star className="w-10 h-10 text-secondary" />,
      subs: generalSubs,
      subIcon: <Heart size={18} />,
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
              className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 ${section.borderColor} ${section.color}`}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/20 group-hover:bg-primary transition-colors" />

              <CardHeader className="pt-8 px-8 space-y-4">
                <div className="p-4 bg-background rounded-2xl shadow-sm inline-flex">
                  {section.icon}
                </div>
                <CardTitle className="text-3xl font-serif font-bold">{section.title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                  {section.longDesc}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 pb-8 space-y-6">
                {section.subs.length > 0 && (
                  <div className="grid grid-cols-1 gap-3">
                    {section.subs.map(([name, count]) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 p-4 bg-background/50 rounded-xl hover:bg-background transition-colors group/item"
                      >
                        <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover/item:scale-110 transition-transform">
                          {section.subIcon}
                        </span>
                        <span className="text-lg font-medium flex-1">{name}</span>
                        <span className="text-sm text-muted-foreground">({count})</span>
                      </div>
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
