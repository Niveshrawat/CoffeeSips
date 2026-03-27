import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Yadav",
    date: "31 Jan 2026",
    text: "I had an excellent experience with Coffeesips. The personalized approach to financial planning made me feel confident about my investments. Highly recommended for anyone starting their SIP journey!",
  },
  {
    name: "Sachin Bhatia",
    date: "23 Jan 2026",
    text: "I am extremely satisfied with the mutual fund services provided. The team is knowledgeable, approachable, and always available to guide me through every step of the process.",
  },
  {
    name: "Ravi Verma",
    date: "19 Dec 2025",
    text: "It addresses the right problem — building the habit of investing consistently. The coffee analogy makes investing feel less intimidating and more like a daily ritual.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding bg-gradient-section" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.3em] text-coffee-warm mb-4 font-body"
          >
            Client Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            What People Are <span className="text-gradient-gold">Saying</span>
          </motion.h2>
          <div className="divider-gold mb-4" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-body text-sm"
          >
            100% recommend · Based on the opinion of 4 people
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="glass-card rounded-2xl p-8 hover-lift"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/90 font-body text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground font-body">{t.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
