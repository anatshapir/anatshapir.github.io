import React from 'react';
import { Heart, Mail, Share2, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="flex justify-center items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-sm bg-background">
            <img 
              src="https://v3b.fal.media/files/b/0a90db10/6A0xvq8l-vgZ-umxuJ-v8_JlrJieuL.png" 
              alt="Anat's Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-2xl font-serif font-bold text-primary">
            דברים שענת אוהבת במיוחד
          </span>
        </div>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
          "העולם מלא בדברים קטנים ומיוחדים, צריך רק לדעת איפה לחפש אותם."
        </p>
        
        <div className="flex justify-center gap-6">
          <a href="#" className="p-4 rounded-2xl bg-background shadow-md hover:shadow-lg hover:scale-110 transition-all text-primary">
            <Mail size={24} />
          </a>
          <a href="#" className="p-4 rounded-2xl bg-background shadow-md hover:shadow-lg hover:scale-110 transition-all text-primary">
            <Instagram size={24} />
          </a>
          <a href="#" className="p-4 rounded-2xl bg-background shadow-md hover:shadow-lg hover:scale-110 transition-all text-primary">
            <Share2 size={24} />
          </a>
        </div>
        
        <div className="pt-12 border-t border-primary/10 text-muted-foreground font-medium">
          <p className="flex items-center justify-center gap-1">
            נבנה באהבה עבור ענת <Heart size={16} className="text-primary fill-current" /> {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
