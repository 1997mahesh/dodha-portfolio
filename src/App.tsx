/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Award, 
  Calendar, 
  Camera, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ChevronDown,
  Star,
  User,
  Briefcase,
  Home,
  Music,
  Volume2,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Constants & Data ---

const FATHER_NAME = "श्री. दोधा काशीराम अहिरे";
const SON_NAME = "नेहा अहिरे";

const JOURNEY_DATA = [
  {
    year: "१९६५ - १९८५",
    title: "बालपण आणि शिक्षण",
    desc: "एका छोट्या गावातून संघर्षातून प्राथमिक शिक्षण पूर्ण केले. शिक्षणाची ओढ आणि जिद्द लहानपणापासूनच होती.",
    icon: <User className="w-6 h-6" />,
    image: "https://picsum.photos/300/200?random=1"
  },
  {
    year: "१९८६ - १९९५",
    title: "करिअरची सुरुवात",
    desc: "पहिल्या नोकरीची सुरुवात आणि स्वतःच्या पायावर उभे राहण्याचा प्रवास. कष्टाने स्वतःची ओळख निर्माण केली.",
    icon: <Briefcase className="w-6 h-6" />,
    image: "https://picsum.photos/300/200?random=2"
  },
  {
    year: "१९९६ - २०१०",
    title: "कौटुंबिक जबाबदाऱ्या",
    desc: "लग्नानंतर संसाराचा गाडा समर्थपणे ओढला. मुलांचे संगोपन आणि त्यांच्या शिक्षणासाठी अहोरात्र मेहनत घेतली.",
    icon: <Home className="w-6 h-6" />,
    image: "https://picsum.photos/300/200?random=3"
  },
  {
    year: "२०११ - आजवर",
    title: "मार्गदर्शक आणि आधारस्तंभ",
    desc: "आज संपूर्ण कुटुंबाचे प्रेरणास्थान म्हणून सर्वांना मार्गदर्शन करत आहेत. निवृत्तीनंतरही सामाजिक कार्यात सक्रिय.",
    icon: <Star className="w-6 h-6" />,
    image: "https://picsum.photos/300/200?random=4"
  }
];

const ACHIEVEMENTS = [
  {
    title: "आदर्श कर्मचारी पुरस्कार",
    desc: "नोकरीत असताना त्यांच्या प्रामाणिकपणासाठी आणि उत्कृष्ट कामासाठी मिळालेला सन्मान.",
    icon: <Award className="text-warm-orange" />
  },
  {
    title: "यशस्वी पालकत्व",
    desc: "दोन्ही मुलांना उच्च शिक्षित करून त्यांना समाजात मानाचे स्थान मिळवून दिले.",
    icon: <Heart className="text-red-500" />
  },
  {
    title: "सामाजिक योगदान",
    desc: "गावातील विकासकामात आणि गरजूंच्या मदतीसाठी नेहमीच तत्पर राहून मिळवलेला आदर.",
    icon: <Star className="text-yellow-500" />
  }
];

const GALLERY_IMAGES = [
  { url: "https://picsum.photos/seed/father-child1/600/400", category: "बालपण" },
  { url: "https://picsum.photos/seed/father-child2/600/400", category: "बालपण" },
  { url: "https://picsum.photos/seed/father-family1/600/400", category: "कुटुंब" },
  { url: "https://picsum.photos/seed/father-family2/600/400", category: "कुटुंब" },
  { url: "https://picsum.photos/seed/father-family3/600/400", category: "कुटुंब" },
  { url: "https://picsum.photos/seed/father-career1/600/400", category: "करिअर" },
  { url: "https://picsum.photos/seed/father-career2/600/400", category: "करिअर" },
  { url: "https://picsum.photos/seed/father-career3/600/400", category: "करिअर" },
  { url: "https://picsum.photos/seed/father-family4/600/400", category: "कुटुंब" },
];

const CATEGORIES = ["सर्व", "बालपण", "कुटुंब", "करिअर"];

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-soft-brown mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-warm-orange font-medium"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-1 bg-warm-orange mx-auto mt-4 rounded-full" />
  </div>
);

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("सर्व");

  const filteredImages = selectedCategory === "सर्व" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === selectedCategory);

  useEffect(() => {
    // Birthday confetti on load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-warm-orange selection:text-white">
      
      {/* Background Music Toggle (Placeholder Logic) */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-warm-orange/20 hover:scale-110 transition-transform"
      >
        {isMuted ? <VolumeX className="text-soft-brown" /> : <Volume2 className="text-warm-orange" />}
      </button>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block px-6 py-2 bg-warm-orange text-white rounded-full font-bold text-lg shadow-xl"
          >
            🎂 वाढदिवसाच्या हार्दिक शुभेच्छा!
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            {FATHER_NAME}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl md:text-2xl text-cream/90 font-medium italic mb-12"
          >
            "माझ्या आयुष्यातील प्रेरणास्थान"
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <a href="#about" className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md border border-white/30 transition-all animate-bounce">
              <ChevronDown className="text-white w-8 h-8" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 max-w-5xl mx-auto">
        <SectionHeading subtitle="एक प्रेमळ प्रवास">माझ्या वडिलांबद्दल</SectionHeading>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://picsum.photos/seed/father-about/800/1000" 
              alt="Father" 
              className="rounded-2xl shadow-2xl border-8 border-white"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-warm-orange rounded-full flex items-center justify-center text-white shadow-xl">
              <Heart className="w-12 h-12 fill-current" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-soft-brown/80">
              बाबा, तुम्ही केवळ माझे वडील नाही, तर माझे सर्वात मोठे शिक्षक आणि मार्गदर्शक आहात. तुमचे कष्ट, तुमचा प्रामाणिकपणा आणि तुमचे आमच्यावरील अफाट प्रेम आम्हाला नेहमीच प्रेरणा देते. 
            </p>
            <p className="text-lg leading-relaxed text-soft-brown/80">
              आयुष्यात कितीही संकटे आली तरी तुम्ही कधीही डगमगला नाहीत. तुमच्या शांत स्वभावाने आणि संयमाने तुम्ही प्रत्येक परिस्थितीवर मात केली. तुमच्याकडून शिकलेली मूल्ये हीच आमची खरी संपत्ती आहे.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-warm-orange/10 rounded-xl border border-warm-orange/20">
                <h4 className="font-bold text-warm-orange mb-1">कष्टाळू</h4>
                <p className="text-sm">अहोरात्र मेहनत घेणारे</p>
              </div>
              <div className="p-4 bg-warm-orange/10 rounded-xl border border-warm-orange/20">
                <h4 className="font-bold text-warm-orange mb-1">प्रामाणिक</h4>
                <p className="text-sm">तत्त्वांना जागणारे</p>
              </div>
              <div className="p-4 bg-warm-orange/10 rounded-xl border border-warm-orange/20">
                <h4 className="font-bold text-warm-orange mb-1">प्रेमळ</h4>
                <p className="text-sm">सर्वांची काळजी घेणारे</p>
              </div>
              <div className="p-4 bg-warm-orange/10 rounded-xl border border-warm-orange/20">
                <h4 className="font-bold text-warm-orange mb-1">मार्गदर्शक</h4>
                <p className="text-sm">योग्य दिशा दाखवणारे</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Life Journey Timeline */}
      <section className="py-24 bg-soft-brown/5">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading subtitle="संघर्ष ते यश">जीवन प्रवास</SectionHeading>
          
          <div className="relative mt-16">
            <div className="timeline-line" />
            
            <div className="space-y-24">
              {JOURNEY_DATA.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-8 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-warm-orange rounded-full z-10 flex items-center justify-center text-warm-orange group-hover:scale-110 transition-transform max-md:hidden">
                    {item.icon}
                  </div>

                  {/* Card (Untouched Design) */}
                  <div className="w-full md:w-[45%] p-8 bg-white rounded-3xl shadow-xl border border-warm-orange/10 hover:shadow-2xl transition-shadow">
                    <span className="text-warm-orange font-bold text-sm block mb-2">{item.year}</span>
                    <h3 className="text-2xl font-bold mb-3 text-soft-brown">{item.title}</h3>
                    <p className="text-soft-brown/70 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Image (Outside Card) */}
                  <div className="timeline-image w-full md:w-[45%] flex justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-[300px] h-[200px] object-cover rounded-[12px] shadow-lg border-4 border-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <SectionHeading subtitle="अभिमानास्पद क्षण">यश आणि उपलब्धी</SectionHeading>
        
        <div className="grid md:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-3xl shadow-xl border border-warm-orange/5 text-center"
            >
              <div className="w-16 h-16 bg-warm-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8" })}
              </div>
              <h3 className="text-xl font-bold mb-4 text-soft-brown">{item.title}</h3>
              <p className="text-soft-brown/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-warm-orange/5">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading subtitle="आठवणींचा खजिना">छायाचित्र दालन</SectionHeading>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-warm-orange text-white shadow-lg"
                    : "bg-white text-soft-brown hover:bg-warm-orange/10 border border-warm-orange/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, idx) => (
                <motion.div 
                  key={img.url}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                >
                  <img 
                    src={img.url} 
                    alt={`Gallery ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-warm-orange/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="text-white w-8 h-8" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.category}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-warm-orange/10">
          <div className="md:flex">
            <div className="md:w-1/3 relative group overflow-hidden min-h-[300px]">
              <img 
                src="https://picsum.photos/seed/neha-portrait/500/800" 
                alt="Neha Ahire" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-orange/90 via-warm-orange/20 to-transparent flex flex-col items-center justify-end p-12 text-white text-center">
                <Heart className="w-12 h-12 mb-4 animate-pulse fill-white" />
                <h3 className="text-2xl font-bold mb-1">मनातील भावना</h3>
                <p className="text-white/90 italic text-sm">मुलीकडून एक छोटी भेट</p>
              </div>
            </div>
            <div className="md:w-2/3 p-12 relative">
              <MessageCircle className="absolute top-6 right-8 text-warm-orange/10 w-24 h-24" />
              <div className="relative z-10">
                <p className="text-xl leading-relaxed text-soft-brown italic mb-8">
                  "प्रिय बाबा, आज तुमच्या वाढदिवसानिमित्त मी देवाकडे एवढीच प्रार्थना करते की तुम्हाला उदंड आयुष्य आणि उत्तम आरोग्य लाभो. तुम्ही आमच्यासाठी जे काही केले आहे, त्याबद्दल आम्ही तुमचे सदैव ऋणी राहू. तुम्ही आमचे आधारस्तंभ आहात. वाढदिवसाच्या खूप खूप शुभेच्छा!"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-soft-brown">तुमची लाडकी मुलगी,</p>
                    <p className="text-warm-orange font-bold text-lg">{SON_NAME}</p>
                  </div>
                  <button 
                    onClick={triggerConfetti}
                    className="px-6 py-3 bg-warm-orange text-white rounded-full font-bold hover:bg-warm-orange/90 transition-colors shadow-lg"
                  >
                    शुभेच्छा द्या! 🎉
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-soft-brown border-t border-white/10 text-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Left Side (70%) */}
            <div className="w-full md:w-[70%] grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              {/* Phone */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
                  <Phone className="w-5 h-5 text-warm-orange" />
                </div>
                <h4 className="font-bold text-warm-orange">फोन</h4>
                <p className="text-cream/70 text-sm">+९१ ९८७६५ ४३२१०</p>
              </div>
              {/* Address */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
                  <MapPin className="w-5 h-5 text-warm-orange" />
                </div>
                <h4 className="font-bold text-warm-orange">पत्ता</h4>
                <p className="text-cream/70 text-sm">ब्राह्मणगाव, महाराष्ट्र</p>
              </div>
              {/* Birthday */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
                  <Calendar className="w-5 h-5 text-warm-orange" />
                </div>
                <h4 className="font-bold text-warm-orange">जन्मदिन</h4>
                <p className="text-cream/70 text-sm">८ एप्रिल २०२६</p>
              </div>
            </div>

            {/* Right Side (30%) */}
            <div className="w-full md:w-[30%]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104267.25847017193!2d74.26642608289184!3d20.5314977656399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bde861b32a1f1bf%3A0x5d8c0031aceed105!2sBrahmangaon%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1774423658845!5m2!1sen!2sin" 
                width="100%" 
                height="120" 
                style={{ border: 0, borderRadius: '10px' }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-cream/80 text-sm md:text-base mb-4">
              ही वेबसाइट नेहा अहिरे यांनी त्यांच्या वडिलांसाठी (श्री. दोधा काशीराम अहिरे) प्रेमाने तयार करून घेतली आहे.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-cream/40">
              <p className="flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Mahesh Mishra
              </p>
              <p>© २०२६ सर्व हक्क राखीव</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
