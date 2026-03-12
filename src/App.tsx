import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { AdminPanel } from '@/components/Admin';
import { Toaster } from 'react-hot-toast';
import { blink, Material } from '@/blink/client';

interface HomePageProps {
  teachingMaterials: Material[];
  generalMaterials: Material[];
}

function HomePage({ teachingMaterials, generalMaterials }: HomePageProps) {
  return (
    <>
      <Hero />
      
      {/* About Section (Intro) */}
      <section id="about" className="py-24 bg-secondary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-block p-4 bg-background rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-xl rotate-3">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                <img 
                  src="https://v3b.fal.media/files/b/0a90db10/6A0xvq8l-vgZ-umxuJ-v8_JlrJieuL.png" 
                  alt="Anat's Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground">
              קצת על הפינה שלי
            </h2>
            
            <div className="space-y-6 text-xl sm:text-2xl text-muted-foreground leading-relaxed">
              <p>
                שלום לכולם! אני ענת, ואני שמחה להזמין אתכם למרחב האישי שלי. כאן אני מרכזת את כל הדברים שממלאים אותי בהשראה ובאהבה.
              </p>
              <p>
                בין אם אתם מורים שמחפשים חומרי למידה יצירתיים, הורים שמחפשים רעיונות להשראה, או פשוט אנשים שאוהבים לגלות דברים חדשים ומעניינים - אני מקווה שתמצאו כאן משהו שידבר אליכם.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Categories teachingMaterials={teachingMaterials} generalMaterials={generalMaterials} />
      
      {/* Contact/CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">
              רוצים להיות בקשר?
            </h2>
            <p className="text-2xl opacity-90 leading-relaxed">
              אשמח לשמוע מכם, לקבל משוב, או פשוט להכיר! כתבו לי וביחד נמשיך ליצור ולהפיץ טוב.
            </p>
            <button className="bg-background text-primary px-12 py-5 rounded-2xl text-2xl font-bold shadow-2xl hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-1">
              צרו קשר עכשיו
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState('home')
  const [materials, setMaterials] = useState<Material[]>([])

  useEffect(() => {
    // Handle hash routing
    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'admin') {
        setPage('admin')
      } else {
        setPage('home')
      }
    }
    
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    // Load materials from DB for the home page
    const loadMaterials = async () => {
      try {
        const data = await blink.db.materials.list({
          orderBy: { createdAt: 'desc' }
        })
        setMaterials(data as Material[])
      } catch (error) {
        console.log('No materials yet or DB not connected')
        setMaterials([])
      }
    }
    
    if (page === 'home') {
      loadMaterials()
    }
  }, [page])

  // Pass materials to Categories
  const teachingMaterials = materials.filter(m => m.category === 'teaching')
  const generalMaterials = materials.filter(m => m.category === 'general')

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Toaster position="top-center" />
      <Navbar />
      
      <main className="relative z-10">
        {page === 'home' ? (
          <HomePage teachingMaterials={teachingMaterials} generalMaterials={generalMaterials} />
        ) : (
          <AdminPanel />
        )}
      </main>
      
      {page === 'home' && <Footer />}
    </div>
  );
}
