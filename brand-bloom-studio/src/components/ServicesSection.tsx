import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, PieChart, Calculator, BookOpen, Shield, Coffee } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "SIP Planning",
    description: "Automate your wealth creation with disciplined, regular investments tailored to your goals.",
  },
  {
    icon: PieChart,
    title: "Portfolio Review",
    description: "Comprehensive analysis of your investment portfolio to maximize returns and minimize risk.",
  },
  {
    icon: Calculator,
    title: "Financial Calculators",
    description: "Interactive tools to plan your SIP, estimate returns, and visualize your wealth journey.",
  },
  {
    icon: BookOpen,
    title: "Financial Literacy",
    description: "Educational resources to empower you with knowledge for confident investment decisions.",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Understand your risk profile and align investments with your comfort and ambitions.",
  },
  {
    icon: Coffee,
    title: "Personal Consultation",
    description: "One-on-one sessions over coffee to craft your personalized financial roadmap.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-brand-tan" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.3em] text-coffee-warm mb-4 font-body"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-espresso"
          >
            Our <span className="text-gradient-gold">Services</span>
          </motion.h2>
          <div className="divider-gold" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="bg-white border border-espresso/5 rounded-2xl p-8 hover-lift group cursor-default shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-espresso">
                {service.title}
              </h3>
              <p className="text-sm text-espresso/70 font-body leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
