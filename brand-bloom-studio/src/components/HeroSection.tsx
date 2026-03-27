import { motion } from "framer-motion";
import heroCoffee from "@/assets/hero-coffee.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroCoffee}
          alt="Premium coffee experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm font-body uppercase tracking-[0.3em] text-coffee-warm mb-6"
          >
            Creating Wealth · Sip by Sip
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
          >
            <span className="text-foreground">SIP your</span>
            <br />
            <span className="text-foreground">way to </span>
            <span className="text-gradient-gold">wealth</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col gap-3 mb-12"
          >
            {[
              { letter: "S", word: "tart early" },
              { letter: "I", word: "nvest small" },
              { letter: "P", word: "lay consistent" },
            ].map((item, i) => (
              <motion.p
                key={item.letter}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                className="text-lg md:text-xl font-body text-foreground/80"
              >
                <span className="text-gold font-bold text-2xl md:text-3xl">{item.letter}</span>
                <span className="text-muted-foreground">{item.word}</span>
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base tracking-wide hover:bg-coffee-warm transition-all duration-300 shadow-warm"
            >
              Start Your Journey
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full border border-foreground/20 text-foreground font-semibold text-base tracking-wide hover:border-coffee-warm hover:text-gold transition-all duration-300"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-coffee-warm to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
