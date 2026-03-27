const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="/#home" className="inline-flex items-center justify-center px-4 py-2.5 mb-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-sm border border-white/20 group hover:bg-white transition-all duration-300">
            <img 
              src="/logo.png" 
              alt="Coffeesips" 
              className="h-12 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105" 
            />
          </a>
          <p className="text-xs text-muted-foreground font-body">
            Grow your wealth, sip by sip
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {[
            { label: "Home", href: "/#home" },
            { label: "About", href: "/#about" },
            { label: "Services", href: "/#services" },
            { label: "Calculators", href: "/calculators" },
            { label: "Blogs", href: "/blogs" },
            { label: "FAQ", href: "/faq" }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs text-muted-foreground hover:text-foreground font-body uppercase tracking-wider transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted-foreground font-body">
          © 2026 Coffeesips.in · All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
