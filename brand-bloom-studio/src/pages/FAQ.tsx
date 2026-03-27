import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const faqs = [
  {
    question: "What is an SIP?",
    answer: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. It helps in rupee cost averaging and brings discipline to your investment journey."
  },
  {
    question: "When is the right time to start investing?",
    answer: "The best time to start was yesterday. The second best time is today. Starting early gives your investments more time to compound, creating significant wealth over the long term."
  },
  {
    question: "Can I stop or pause my SIP anytime?",
    answer: "Yes, you have complete flexibility. You can pause, modify, or stop your SIP at any time without any penalties, giving you full control over your finances."
  },
  {
    question: "What returns can I expect from my investments?",
    answer: "Returns depend on the selected mutual funds and market conditions. Historically, equity mutual funds have delivered 10-15% annualized returns over a long investment horizon (10+ years)."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-beige theme-beige flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Frequently Asked <span className="text-gradient-gold">Questions</span></h1>
          <p className="text-muted-foreground font-body">Everything you need to know about brewing your wealth.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-border rounded-2xl overflow-hidden bg-secondary/30 backdrop-blur-sm"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-black/5 transition-colors"
              >
                <span className="font-display text-xl font-medium">{faq.question}</span>
                {openIndex === index ? <Minus className="text-gold shrink-0 ml-4" /> : <Plus className="text-muted-foreground shrink-0 ml-4" />}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-6 pt-0 text-muted-foreground font-body leading-relaxed border-t border-border/50">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};
export default FAQ;
