import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin, X } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/919205911900?text=Hi, I'm ${form.name}. I'd like to book a consultation.`, "_blank");
  };

  return (
    <section id="contact" className="section-padding bg-brand-tan" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-coffee-warm mb-4 font-body">
              Let's Connect
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-espresso">
              Begin Your <span className="text-gradient-gold">Journey</span>
            </h2>
            <div className="divider-gold mb-8 !mx-0" />
            <p className="text-espresso/70 font-body mb-10 leading-relaxed">
              Ready to start your wealth creation journey? Reach out and let us help you
              take the first step toward financial freedom.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "phone", label: "Phone Number", type: "tel" },
                { key: "email", label: "Email Address", type: "email" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs uppercase tracking-widest text-espresso/60 font-body mb-2 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-white border border-espresso/10 rounded-xl px-5 py-3.5 text-espresso font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-espresso/30"
                    placeholder={field.label}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base tracking-wide hover:bg-coffee-warm transition-colors duration-300 shadow-warm"
              >
                Book Consultation
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white/60 backdrop-blur-xl border border-espresso/5 rounded-2xl p-8 lg:p-10 space-y-8 shadow-sm">
              {[
                { icon: Phone, label: "Call Us", value: "+91 92059 11900", href: "tel:+919205911900" },
                { icon: Mail, label: "Email", value: "rajeshdiwan@coffeesips.in", href: "mailto:rajeshdiwan@coffeesips.in" },
                { icon: MapPin, label: "Location", value: "Ghaziabad, Uttar Pradesh, India", href: null },
                { icon: MessageCircle, label: "WhatsApp", value: "Message us directly", href: "https://wa.me/919205911900" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-espresso/50 font-body mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-espresso font-body text-sm hover:text-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-espresso font-body text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              {[
                { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582620938010", icon: Facebook },
                { label: "Instagram", href: "https://www.instagram.com/coffeesipsclub", icon: Instagram },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/coffeesips/", icon: Linkedin },
                { label: "X", href: "https://www.x.com/coffeesipsclub", icon: X },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-espresso/10 flex items-center justify-center text-xs text-espresso/60 hover:border-coffee-warm hover:text-gold transition-all duration-300 font-body font-semibold"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
