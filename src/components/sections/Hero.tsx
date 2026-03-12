import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full blur-[80px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-right space-y-8 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium animate-fade-in">
            <Star size={18} />
            <span>ברוכים הבאים לעולם של ענת</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-foreground leading-[1.2] animate-slide-up">
            הדברים הקטנים <br />
            <span className="text-primary italic">שאני אוהבת במיוחד</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-xl ml-auto leading-relaxed animate-slide-up delay-100">
            מרחב אישי המוקדש לאהבות שלי: מחומרי למידה יצירתיים ועד לדברים שפשוט עושים טוב על הלב.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-end animate-slide-up delay-200">
            <a href="#materials">
              <Button size="lg" className="text-xl px-8 h-16 rounded-2xl group shadow-lg hover:shadow-primary/20 transition-all duration-300 w-full">
                <BookOpen className="ml-2 group-hover:rotate-6 transition-transform" />
                חומרי למידה
              </Button>
            </a>
            <a href="#interesting">
              <Button variant="outline" size="lg" className="text-xl px-8 h-16 rounded-2xl border-2 hover:bg-secondary/10 transition-all duration-300 w-full">
                <Star className="ml-2" />
                דברים מעניינים
              </Button>
            </a>
          </div>
        </div>

        {/* Illustration Content */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center">
          <div className="relative w-full max-w-[500px] aspect-square animate-fade-in delay-300">
            {/* Artistic frame */}
            <div className="absolute inset-0 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-pulse-slow" />
            <div className="absolute inset-4 bg-background rounded-[50%_50%_50%_50%/50%_50%_50%_50%] shadow-2xl overflow-hidden border-8 border-background p-4">
              <img 
                src="https://v3b.fal.media/files/b/0a90db10/6A0xvq8l-vgZ-umxuJ-v8_JlrJieuL.png" 
                alt="Anat Illustration" 
                className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-700"
              />
            </div>
            {/* Small floating elements */}
            <div className="absolute top-10 right-10 w-12 h-12 bg-secondary/20 rounded-full blur-xl animate-bounce-slow" />
            <div className="absolute bottom-20 left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-sm font-medium">גלו עוד</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
