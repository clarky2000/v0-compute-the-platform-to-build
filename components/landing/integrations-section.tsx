"use client";

import { useEffect, useState, useRef } from "react";

const logos: Record<string, React.ReactNode> = {
  "Microsoft 365": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M0 0h11.377v11.377H0zm12.623 0H24v11.377H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z"/>
    </svg>
  ),
  WordPress: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.109m-7.981.105c.647-.034 1.232-.105 1.232-.105.582-.07.514-.925-.068-.893 0 0-1.754.138-2.88.138-1.059 0-2.84-.138-2.84-.138-.582-.034-.644.857-.063.893 0 0 .549.07 1.128.105l1.674 4.58-2.351 7.053-3.912-11.633c.648-.034 1.232-.105 1.232-.105.583-.07.514-.925-.067-.893 0 0-1.754.138-2.88.138-.203 0-.443-.005-.693-.014C4.98 3.012 8.241 1.254 12 1.254c2.8 0 5.353 1.07 7.271 2.823-.046-.003-.091-.009-.141-.009-1.058 0-1.81.924-1.81 1.916 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .924-.355 1.994-.821 3.487l-1.075 3.59-3.886-11.564zM12 22.746c-1.497 0-2.925-.305-4.222-.855l4.483-13.026 4.592 12.58c.03.074.066.145.102.214-1.504.618-3.162.987-4.955.987M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0"/>
    </svg>
  ),
  "Google Workspace": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C6.478 2 1.546 6.932 1.546 13s4.932 11 11 11c6.346 0 10.545-4.461 10.545-10.732 0-.732-.074-1.44-.211-2.121l-10.335-.009z"/>
    </svg>
  ),
  Sage: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  Mailchimp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M18.823 11.907c-.192-.067-.389-.12-.589-.163.088-.139.165-.283.229-.433.247-.564.334-1.105.261-1.615-.189-1.264-1.441-1.847-2.78-1.624-.334.055-.67.155-1.001.297l-.088.041c-.073-.479-.232-.89-.463-1.199-.518-.683-1.302-.99-2.22-.87-.544.075-1.1.303-1.623.655-.281-.252-.613-.466-.985-.622C8.44 5.884 7.19 6.127 6.38 7.08c-.507.593-.76 1.354-.731 2.183-.352.165-.666.378-.928.63-.641.611-.942 1.418-.847 2.267.101.927.617 1.754 1.405 2.252-.055.244-.085.497-.088.754-.014 1.133.576 2.137 1.605 2.738.626.365 1.365.545 2.093.545.263 0 .525-.023.78-.069 1.138-.205 2.146-.876 2.761-1.838.614.223 1.267.342 1.926.351.05.001.1.001.149.001 1.278 0 2.478-.48 3.392-1.354.904-.865 1.395-2.009 1.392-3.225-.002-.619-.146-1.229-.424-1.794-.169-.346-.385-.649-.641-.904.276-.132.534-.3.77-.507.571-.505.899-1.167.928-1.87.029-.702-.236-1.393-.749-1.953-.192-.21-.419-.392-.67-.532z"/>
    </svg>
  ),
  WooCommerce: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M2.227 4.857A2.228 2.228 0 000 7.094v7.457c0 1.236 1.001 2.237 2.237 2.237h9.253l4.229 2.355-.962-2.355h7.006c1.236 0 2.237-1.001 2.237-2.237V7.094c0-1.236-1.001-2.237-2.237-2.237H2.227z"/>
    </svg>
  ),
  Cloudflare: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.5765-.4934-.9873-.5236l-8.2822-.1123c-.0489-.0029-.0946-.0234-.1266-.0584-.0322-.0352-.0478-.0806-.0439-.1266.0083-.083.0761-.1475.159-.1545l8.3696-.1123c1.0947-.0606 2.2822-.9385 2.7036-2.0043l.5765-1.4552c.0246-.0638.0372-.1313.0372-.2.0001-.1069-.0387-.2094-.1082-.2895-.5773-.6768-1.4149-1.0645-2.3423-1.0846-1.653-.0355-3.0722.9857-3.5839 2.4748-.2529-.1816-.5586-.2891-.8916-.2891-1.0081 0-1.7153.9395-1.5737 1.9834-.0122-.0005-.0242-.0015-.0364-.0015-1.3741 0-2.4891 1.116-2.4891 2.4907 0 .0873.0045.1723.0127.2565.0119.1195.1104.2111.2305.2111h8.5667c.0853 0 .1626-.0542.1909-.1352z"/>
    </svg>
  ),
  Veeam: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Datto: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  TeamViewer: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M22.597 24H1.406A1.41 1.41 0 010 22.594V1.406A1.41 1.41 0 011.406 0h21.191a1.41 1.41 0 011.406 1.406v21.188A1.41 1.41 0 0122.597 24zM11.911 4.478l-3.355 7.025 3.355 7.024 3.357-7.024-3.357-7.025zm4.357 7.025l2.886 6.04h-2.54l-1.684-3.524 1.338-2.516zm-8.713 0l-1.339 2.516 1.685 3.524H5.36l2.886-6.04h1.309zm8.713 0h1.31l-2.886-6.04h-2.54l1.685 3.523 2.431 2.517zm-8.713 0l2.432-2.516-1.685-3.524H5.76l2.886 6.04h1.309z"/>
    </svg>
  ),
  WHMCS: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
  ),
  Stripe: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
    </svg>
  ),
};

const integrations = [
  { name: "Microsoft 365", category: "Productivity" },
  { name: "WordPress", category: "Websites" },
  { name: "Google Workspace", category: "Collaboration" },
  { name: "Sage", category: "Accounting" },
  { name: "Mailchimp", category: "Email Marketing" },
  { name: "WooCommerce", category: "eCommerce" },
  { name: "Cloudflare", category: "Security" },
  { name: "Veeam", category: "Backup" },
  { name: "Datto", category: "Disaster Recovery" },
  { name: "TeamViewer", category: "Remote Support" },
  { name: "WHMCS", category: "Client Portal" },
  { name: "Stripe", category: "Payments" },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative overflow-hidden">

      {/* Header */}
      <div className="relative z-10 pt-32 lg:pt-40 text-center">
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="w-12 h-px bg-foreground/20" />
          Integrations
          <span className="w-12 h-px bg-foreground/20" />
        </span>

        <h2 className={`text-5xl md:text-6xl lg:text-[96px] font-display tracking-tight leading-[0.95] transition-all duration-1000 max-w-5xl mx-auto px-6 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          We work with the tools your business already uses.
        </h2>

        <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          From productivity suites to accounting software, we integrate seamlessly with your existing technology stack.
        </p>
      </div>

      {/* Full-width image */}
      <div className={`relative left-1/2 -translate-x-1/2 w-screen -mt-16 transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Integration grid */}
      <div className="relative z-10 mt-0 lg:-mt-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className={`group relative overflow-hidden p-6 lg:p-8 border transition-all duration-500 cursor-default ${
                hoveredIndex === index
                  ? "border-foreground bg-foreground/[0.04] scale-[1.02]"
                  : "border-foreground/10 hover:border-foreground/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${index * 30 + 300}ms`,
              }}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setMousePos(null);
              }}
            >
              {/* Cursor-following halo */}
              {hoveredIndex === index && mousePos && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                  }}
                />
              )}
              {/* Category tag */}
              <span className={`absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 transition-colors ${
                hoveredIndex === index
                  ? "bg-foreground text-background"
                  : "bg-foreground/10 text-muted-foreground"
              }`}>
                {integration.category}
              </span>

              {/* Logo */}
              <div className={`w-10 h-10 mb-6 flex items-center justify-center transition-colors ${
                hoveredIndex === index ? "text-white" : "text-foreground/60"
              }`}>
                {logos[integration.name]}
              </div>

              <span className="font-medium block">{integration.name}</span>

              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20 overflow-hidden">
                <div className={`h-full bg-foreground transition-all duration-500 ${
                  hoveredIndex === index ? "w-full" : "w-0"
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats row */}
        <div className={`flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-12">
            {[
              { value: "50+", label: "Tools Supported" },
              { value: "Secure", label: "Remote Access" },
              { value: "Real-Time", label: "Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-3xl font-display">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#" className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
            View all integrations
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
