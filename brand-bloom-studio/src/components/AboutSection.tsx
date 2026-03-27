import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutCoffee from "@/assets/about-coffee.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-gradient-section" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border-glow shadow-warm">
              <img
                src={aboutCoffee}
                alt="Coffee and finance blend"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 md:-right-8 glass-card rounded-xl p-5 shadow-warm"
            >
              <p className="text-3xl font-display font-bold text-gradient-gold">100%</p>
              <p className="text-sm text-muted-foreground font-body">Client Satisfaction</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm uppercase tracking-[0.3em] text-coffee-warm mb-4 font-body"
            >
              Who We Are
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Welcome to{" "}
              <span className="text-gradient-gold">Coffeesips</span>
            </motion.h2>

            <div className="divider-gold mb-8 !mx-0" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-6"
            >
              At Coffeesips, we blend the experience of investing with the comforting warmth
              of your daily coffee ritual. We believe that the journey to financial independence
              can be as refreshing as enjoying your favorite cup of coffee.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-10"
            >
              Our commitment to financial literacy ensures that mutual fund investments
              are accessible and worry-free for everyone. We offer personalized portfolio
              reviews and encourage systematic investment plans to help you on your path
              to financial success.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              href="https://wa.me/919205911900"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-coffee-warm transition-colors duration-300"
            >
              Message us on WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
