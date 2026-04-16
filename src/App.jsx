import React, { useState, useEffect } from "react";

// ── Icons (inline SVG to avoid external deps) ──────────────────────────────
const Icon = ({ name, className = "" }) => {
  const icons = {
    play_circle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`inline-block ${className}`}>
        <circle cx="12" cy="12" r="10" /><polygon fill="currentColor" stroke="none" points="10,8 16,12 10,16" />
      </svg>
    ),
    check_circle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <circle cx="12" cy="12" r="10" /><path d="M8 12.5l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`inline-block ${className}`}>
        <path d="M5 12.5l4.5 4.5 9-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    warning: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <path d="M12 3L2 21h20L12 3z" strokeLinejoin="round" /><line x1="12" y1="9" x2="12" y2="14" strokeLinecap="round" /><circle cx="12" cy="18" r="0.5" fill="currentColor" />
      </svg>
    ),
    cancel: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <circle cx="12" cy="12" r="10" /><path d="M8 8l8 8M16 8l-8 8" strokeLinecap="round" />
      </svg>
    ),
    security: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`inline-block ${className}`}>
        <path d="M12 2L4 5v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V5L12 2z" strokeLinejoin="round" />
      </svg>
    ),
    bolt: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <path d="M13 2L4.5 13.5H12L11 22l8.5-11.5H13L13 2z" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
    medical: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8M8 12h8" strokeLinecap="round" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" /><polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gamepad: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <rect x="2" y="7" width="20" height="11" rx="5" /><path d="M7 11v4M5 13h4" strokeLinecap="round" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    school: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <path d="M3 12l9-7 9 7" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 12v7" strokeLinecap="round" />
      </svg>
    ),
    clean: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <path d="M3 17l4-10h10l4 10H3z" strokeLinejoin="round" /><path d="M8 17v2a1 1 0 001 1h6a1 1 0 001-1v-2" />
      </svg>
    ),
    ergo: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    scale: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block ${className}`}>
        <path d="M12 3v18M3 9l9-6 9 6M3 9h18" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 9l-2 6h4L5 9zM19 9l-2 6h4L19 9z" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`inline-block ${className}`}>
        <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" /><line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" /><line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`inline-block ${className}`}>
        <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ── Eye SVG placeholder (the product visual) ──────────────────────────────
// const OcularMaskSVG = () => (
//   <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//     <defs>
//       <radialGradient id="maskGrad" cx="50%" cy="40%" r="60%">
//         <stop offset="0%" stopColor="#e8f0ff" />
//         <stop offset="100%" stopColor="#c5d8f0" />
//       </radialGradient>
//       <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor="#6ab0e8" />
//         <stop offset="60%" stopColor="#2d7db8" />
//         <stop offset="100%" stopColor="#1a4a7a" />
//       </radialGradient>
//       <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
//         <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0057ce" floodOpacity="0.15" />
//       </filter>
//     </defs>
//     {/* Main mask body */}
//     <ellipse cx="210" cy="165" rx="175" ry="110" fill="url(#maskGrad)" filter="url(#softShadow)" rx2="175" />
//     <ellipse cx="210" cy="160" rx="170" ry="105" fill="#ddeaf8" />
//     {/* Left eye chamber */}
//     <ellipse cx="145" cy="155" rx="55" ry="42" fill="#b8cfe8" />
//     <ellipse cx="145" cy="155" rx="45" ry="34" fill="#8fb8e0" />
//     <circle cx="145" cy="155" r="28" fill="url(#eyeGrad)" />
//     <circle cx="145" cy="155" r="14" fill="#1a2a4a" />
//     <circle cx="145" cy="155" r="8" fill="#0d1a2e" />
//     <circle cx="137" cy="148" r="4" fill="white" opacity="0.7" />
//     {/* Right eye chamber */}
//     <ellipse cx="275" cy="155" rx="55" ry="42" fill="#b8cfe8" />
//     <ellipse cx="275" cy="155" rx="45" ry="34" fill="#8fb8e0" />
//     <circle cx="275" cy="155" r="28" fill="url(#eyeGrad)" />
//     <circle cx="275" cy="155" r="14" fill="#1a2a4a" />
//     <circle cx="275" cy="155" r="8" fill="#0d1a2e" />
//     <circle cx="267" cy="148" r="4" fill="white" opacity="0.7" />
//     {/* Bridge */}
//     <path d="M190 155 Q210 145 230 155" stroke="#a0bcda" strokeWidth="3" fill="none" />
//     {/* Side straps */}
//     <path d="M35 155 Q55 155 75 160" stroke="#a0bcda" strokeWidth="12" strokeLinecap="round" fill="none" />
//     <path d="M345 155 Q365 155 385 160" stroke="#a0bcda" strokeWidth="12" strokeLinecap="round" fill="none" />
//     {/* Status LED */}
//     <circle cx="210" cy="235" r="6" fill="#0057ce" opacity="0.8" />
//     <circle cx="210" cy="235" r="10" fill="#0057ce" opacity="0.2" />
//     {/* Top detail */}
//     <path d="M130 120 Q210 105 290 120" stroke="#b8cfe8" strokeWidth="2" fill="none" />
//     <text x="210" y="285" textAnchor="middle" fill="#566166" fontSize="11" fontFamily="Manrope" fontWeight="700" letterSpacing="3">OCULAR</text>
//   </svg>
// );

// ── EyeSVG for solution section ────────────────────────────────────────────
const EyeCloseSVG = () => (
  <img src="./heroImg.jpeg" alt="Ocular Mask in use" className="w-full h-full object-cover" />
);

// ── Chart SVG for market section ───────────────────────────────────────────
const MarketChartSVG = () => (
  <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0057ce" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0057ce" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="480" height="320" fill="#f0f4f7" rx="16" />
    {/* Grid lines */}
    {[60, 120, 180, 240].map(y => (
      <line key={y} x1="60" y1={y} x2="450" y2={y} stroke="#d9e4ea" strokeWidth="1" />
    ))}
    {/* Area fill */}
    <path d="M60 260 C120 240 180 210 240 175 C300 140 360 100 450 65 L450 280 L60 280Z" fill="url(#chartGrad)" />
    {/* Line */}
    <path d="M60 260 C120 240 180 210 240 175 C300 140 360 100 450 65" stroke="#0057ce" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Data points */}
    {[[60,260],[150,228],[240,175],[330,118],[420,72]].map(([x,y],i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="5" fill="#0057ce" />
        <circle cx={x} cy={y} r="9" fill="#0057ce" opacity="0.15" />
      </g>
    ))}
    {/* Y-axis labels */}
    {["25%","50%","75%","100%"].map((l,i) => (
      <text key={i} x="52" y={265-(i*60)} textAnchor="end" fill="#566166" fontSize="10" fontFamily="Inter">{l}</text>
    ))}
    {/* X-axis labels */}
    {["2022","2024","2026","2028","2030"].map((l,i) => (
      <text key={i} x={60+i*97} y="298" textAnchor="middle" fill="#566166" fontSize="10" fontFamily="Inter">{l}</text>
    ))}
    {/* Title */}
    <text x="240" y="30" textAnchor="middle" fill="#2a3439" fontSize="13" fontFamily="Manrope" fontWeight="700">
      Global Eye Strain Prevalence
    </text>
    {/* Annotation */}
    <rect x="310" y="55" width="130" height="36" rx="8" fill="white" />
    <text x="375" y="70" textAnchor="middle" fill="#0057ce" fontSize="9" fontFamily="Inter" fontWeight="600">BY 2030</text>
    <text x="375" y="83" textAnchor="middle" fill="#2a3439" fontSize="12" fontFamily="Manrope" fontWeight="800">60%+ Adults</text>
  </svg>
);

// ── Gel Mask SVG ───────────────────────────────────────────────────────────
const GelMaskSVG = () => (
  <img src="./eyegelmask.jpeg" alt="Gel Mask" className="w-full h-full object-contain" />
);

const EyeDropsSVG = () => (
  <img src="./eyedrop.jpeg" alt="Eye Drops" className="w-full h-full object-contain" />
);

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Problem", "Solution", "Features", "Pricing"];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav shadow-sm" : "bg-transparent"}`}
      style={{ borderBottom: scrolled ? "1px solid rgba(169,180,185,0.2)" : "none" }}>
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <span className="text-xl font-headline font-extrabold tracking-tighter text-on-background">Ocular</span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center font-body font-medium text-sm text-on-surface-variant">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="hover:text-primary transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-primary hover:bg-primary-dim text-on-primary px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95">
            Pre-order Now
          </button>
          <button className="md:hidden text-on-surface-variant" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "x" : "menu"} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-surface-container px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="font-medium text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <header className="relative pt-32 pb-20 px-6 overflow-hidden bg-surface">
      {/* Subtle bg decoration */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #dae2ff 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative">
        {/* Left copy */}
        <div className="flex-1 text-left">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-container/40 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
              <span className="relative rounded-full h-2 w-2 bg-primary" />
            </span>
            Next-Gen Wellness
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold text-on-background leading-tight mb-6 max-w-lg">
            Stop Eye Strain. <br />
            <span className="text-primary">Ocular</span><br />An Engineered Solution.
          </h1>

          <p className="text-lg text-on-surface-variant max-w-md mb-8 leading-relaxed">
            Controlled cooling (18–22°C) that reduces strain, dryness, and fatigue anytime, anywhere.
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            <button className="bg-primary hover:bg-primary-dim text-on-primary px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-lg active:scale-95"
              style={{ boxShadow: "0 8px 32px -4px rgba(0,87,206,0.22)" }}>
              Pre-order Now
            </button>
            <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-primary border border-surface-container-high hover:bg-surface-container-low transition-all duration-200">
              <Icon name="play_circle" className="w-5 h-5" />
              See How It Works
            </button>
          </div>

          <p className="text-xs text-on-surface-variant font-medium mb-8 ml-1">
            Limited early access • Ships soon
          </p>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#3B82F6","#6366F1","#8B5CF6","#EC4899"].map((c,i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: c }}>
                  {["A","B","C","D"][i]}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-on-surface-variant">
              ⭐ 4.5 rating from 700+ early users
            </span>
          </div>
        </div>

        {/* Right product image */}
        <div className="flex-initial w-full md:w-[52%]">
          <div className="product-rotate w-full aspect-square  rounded-[3rem] overflow-hidden p-8 flex items-center justify-center">
            <img className="rounded-[3rem]" src="./heroImg.jpeg" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Problem Section ────────────────────────────────────────────────────────
function Problem() {
  const symptoms = [
    { icon: "●", label: "Burning sensation" },
    { icon: "●", label: "Dryness" },
    { icon: "●", label: "Redness" },
    { icon: "●", label: "Eye fatigue" },
    { icon: "●", label: "Itching" },
    { icon: "●", label: "Excessive watering" },
  ];
  const causes = [
    "8+ Hours of Blue Light Exposure",
    "Reduced Blinking During Screen Use",
    "Inconsistent Sleep & Environmental Stress",
  ];
  const personas = [
    { icon: "code", title: "IT Professionals", desc: "Intense focus, late-night debugging" },
    { icon: "gamepad", title: "Gamers", desc: "High-intensity visual tracking for hours" },
    { icon: "school", title: "Students", desc: "Long study sessions and screen fatigue" },
  ];

  return (
    <section className="py-24 bg-surface-container-low" id="problem">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-4 text-on-background">
            Long screen hours are silently<br />damaging your eyes
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto text-lg">
            Most people ignore these signs until it starts affecting their daily life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Symptoms */}
          <div className="bg-surface-container-lowest p-10 rounded-2xl" style={{ boxShadow: "0 2px 32px rgba(42,52,57,0.04)" }}>
            <h3 className="text-2xl font-headline font-bold mb-8 text-primary">The Symptoms</h3>
            <ul className="grid grid-cols-2 gap-y-6 gap-x-4">
              {symptoms.map(s => (
                <li key={s.label} className="flex items-center gap-3 pl-2">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-medium text-on-background">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="bg-surface-container-lowest p-10 rounded-2xl" style={{ boxShadow: "0 2px 32px rgba(42,52,57,0.04)" }}>
            <h3 className="text-2xl font-headline font-bold mb-8 text-primary">The Causes</h3>
            <ul className="space-y-6">
              {causes.map(c => (
                <li key={c} className="flex items-start gap-3">
                  <Icon name="warning" className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <span className="font-medium text-on-background">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Personas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map(p => (
            <div key={p.title} className="bg-surface p-6 rounded-xl text-center"
              style={{ border: "1px solid rgba(169,180,185,0.1)" }}>
              <div className="flex justify-center mb-4">
                <Icon name={p.icon} className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-headline font-bold mb-1 text-sm text-on-background">{p.title}</h4>
              <p className="text-xs text-on-surface-variant">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Comparison Section ─────────────────────────────────────────────────────
function Comparison() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-16 text-on-background">
        Existing solutions don't cut it
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {[
          {
            title: "Traditional Gel Masks",
            cons: ["Loses cooling in minutes", "Needs pre-freezing", "No temperature control"],
            Graphic: GelMaskSVG, 
          },
          {
            title: "Standard Eye Drops",
            cons: ["Temporary relief", "Chemical-based", "Doesn't fix root cause"],
            Graphic: EyeDropsSVG,
          },
        ].map(item => (
          <div key={item.title} className="relative p-8 rounded-2xl bg-red-50 border border-red-100 overflow-hidden group">
            <div className="absolute top-4 right-4 text-error opacity-20 group-hover:opacity-100 transition-opacity">
              <Icon name="cancel" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-headline font-bold mb-4 text-on-background">{item.title}</h3>
            <ul className="space-y-2 mb-6 text-on-surface-variant text-sm">
              {item.cons.map(c => <li key={c}>• {c}</li>)}
            </ul>
            <div className="h-40 w-full rounded-lg overflow-hidden">
              <item.Graphic />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-on-background">
          Passive solutions fail. You need an <span className="text-primary font-bold">active</span> one.
        </p>
      </div>
    </section>
  );
}

// ── Solution Section ───────────────────────────────────────────────────────
function Solution() {
  const features = [
    "Precise temperature control (18–22°C)",
    "Instant, on-demand relief",
    "No freezing or preparation needed",
    "App-controlled experience",
    "AI-powered smart modes",
  ];

  return (
    <section className="py-24 bg-primary text-on-primary" id="solution">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-70">
            WHY OCULAR
          </p>
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold mb-6 leading-tight">
            A wearable device that delivers controlled cooling to reduce eye strain.
          </h2>
          <p className="text-primary-container/80 text-lg mb-8 leading-relaxed">
            Designed for use anytime, anywhere with adjustable temperature and smart modes.
          </p>

          <div className="space-y-4 mb-10">
            {features.map(f => (
              <div key={f} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="check_circle" className="w-5 h-5 text-on-primary" />
                </div>
                <span className="text-base font-medium">{f}</span>
              </div>
            ))}
          </div>

          {/* Advantage box */}
          <div className="p-6 bg-on-primary/10 rounded-2xl border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-primary-container/80">
              The Ocular Advantage
            </h4>
            <ul className="text-sm space-y-2 opacity-90">
              <li>• Maintains optimal therapeutic temperature</li>
              <li>• Works even during fever or high fatigue conditions</li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 40px 80px -20px rgba(0,0,0,0.4)" }}>
            <div className="aspect-square w-full">
              <EyeCloseSVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ───────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: 1, title: "Power On", desc: "One-touch activation starts the system instantly." },
    { n: 2, title: "Real-time Adjustment", desc: "Smart sensors continuously monitor temperature and adjust cooling in real-time." },
    { n: 3, title: "Active Cooling", desc: "Clinical-grade thermal modules provide sustained relief." },
  ];

  return (
    <section className="py-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-headline font-bold text-center mb-16 text-on-background">
          How it works <span className="text-primary">(in seconds)</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector */}
          <div className="absolute top-8 left-[15%] right-[15%] h-px border-t-2 border-dashed border-primary/20 hidden md:block z-0" />
          {steps.map(s => (
            <div key={s.n} className="relative bg-surface p-8 z-10 text-center">
              <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-headline font-bold border-4 border-surface">
                {s.n}
              </div>
              <h3 className="text-xl font-headline font-bold mb-2 text-on-background">{s.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features / Engineering ─────────────────────────────────────────────────
function Features() {
  const cards = [
    { icon: "clean", title: "Magnetic removable cushion for easy cleaning" },
    { icon: "ergo", title: "Ergonomic tilt for long usage comfort" },
    { icon: "scale", title: "Lightweight (140–200g) design" },
  ];

  return (
    <section className="py-24 bg-surface-container-low" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-headline font-bold text-center mb-16 text-on-background">
          Engineered for Comfort
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map(c => (
            <div key={c.title} className="bg-surface-container-lowest p-8 rounded-2xl text-center"
              style={{ border: "1px solid rgba(169,180,185,0.1)", boxShadow: "0 2px 32px rgba(42,52,57,0.04)" }}>
              <div className="flex justify-center mb-4">
                <Icon name={c.icon} className="w-10 h-10 text-primary" />
              </div>
              <h4 className="font-headline font-bold text-on-background text-sm">{c.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ────────────────────────────────────────────────────────────────
function Pricing() {
  const base = [
    "Active Thermal Mask",
    "Standard Carrying Case",
    "USB-C Charging Cable",
    "1 Year Warranty",
  ];
  const premium = [
    "All Base Features",
    "Premium Leather Travel Case",
    "Spare Washable Silk Liners (2x)",
    "Lifetime App Pro Features",
  ];

  return (
    <section className="py-24 bg-surface" id="pricing">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-headline font-bold text-center mb-2 text-on-background">
          Choose your path to relief
        </h2>
        <p className="text-primary-dim text-center font-medium mb-2 text-sm">
          Early price (₹3,499 later)
        </p>
        <p className="text-primary text-center font-bold mb-16 uppercase tracking-widest text-xs">
          Limited pre-order pricing
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Base */}
          <div className="bg-surface-container-lowest p-10 rounded-4xl flex flex-col"
            style={{ border: "1px solid rgba(169,180,185,0.2)", boxShadow: "0 4px 40px rgba(42,52,57,0.05)" }}>
            <h3 className="text-2xl font-headline font-bold mb-2 text-on-background">Base Model</h3>
            <p className="text-on-surface-variant text-sm mb-6">Perfect for focused relief.</p>
            <div className="text-4xl font-headline font-black mb-8 text-on-background">
              ₹2,499<span className="text-lg font-medium text-on-surface-variant">/unit</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {base.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-on-background">
                  <Icon name="check" className="w-5 h-5 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl border border-primary text-primary font-bold hover:bg-primary-container/30 transition-all duration-200">
              Pre-order Now
            </button>
          </div>

          {/* Premium */}
          <div className="bg-primary p-10 rounded-4xl text-on-primary flex flex-col relative overflow-hidden">
            <div className="absolute top-6 right-6 bg-on-primary/20 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-headline font-bold mb-2">Premium Model</h3>
            <p className="text-primary-container/70 text-sm mb-6">The complete eye wellness kit.</p>
            <div className="text-4xl font-headline font-black mb-8">
              ₹3,499<span className="text-lg font-medium text-primary-container/70">/unit</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {premium.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Icon name="check" className="w-5 h-5 text-on-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-on-primary text-primary font-bold hover:bg-surface-container-lowest transition-all duration-200"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
              Get Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Safety Section ─────────────────────────────────────────────────────────
function Safety() {
  const items = [
    { icon: "security", title: "Auto shut-off if temperature exceeds safe range" },
    { icon: "bolt", title: "Low-voltage (5V) safe operation" },
    { icon: "medical", title: "Skin-safe medical-grade materials" },
  ];

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        {/* Safety cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {items.map(i => (
            <div key={i.title} className="text-center p-8 bg-surface-container-lowest rounded-2xl"
              style={{ boxShadow: "0 2px 20px rgba(42,52,57,0.04)" }}>
              <div className="w-12 h-12 bg-on-background/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={i.icon} className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-sm text-on-background">{i.title}</h4>
            </div>
          ))}
        </div>

        {/* Market section */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-headline font-bold mb-6 text-on-background">
              Designed for screen-heavy lifestyles
            </h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              By 2030, the majority of the population will experience regular eye fatigue. Ocular is built for the global screen-first generation.
            </p>
            <div>
              <div className="text-4xl font-headline font-black text-primary mb-1">60%+</div>
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Adults experience eye strain
              </div>
            </div>
          </div>
          <div className="flex-1 w-full h-80 bg-surface-container rounded-2xl overflow-hidden"
            style={{ boxShadow: "inset 0 2px 12px rgba(42,52,57,0.06)" }}>
            <MarketChartSVG />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Roadmap ────────────────────────────────────────────────────────────────
function Roadmap() {
  const phases = [
    { n: "01", title: "Online launch via website", desc: "Global pre-orders and direct-to-consumer distribution.", active: true },
    { n: "02", title: "Retail & partnerships", desc: "Partnerships with premium lounges and wellness boutiques.", active: false },
    { n: "03", title: "Medical expansion", desc: "Clinical use cases for chronic eye conditions and recovery.", active: false },
  ];

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-headline font-bold text-center mb-16 text-on-background">
          Roadmap to Better Vision
        </h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-outline-variant/20 -translate-y-1/2 hidden md:block" />
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {phases.map(p => (
              <div key={p.n} className="relative bg-surface p-6 md:w-1/3">
                <div className="text-primary font-bold text-sm mb-4">Phase {p.n}</div>
                <h4 className="text-lg font-headline font-bold mb-2 text-on-background">{p.title}</h4>
                <p className="text-sm text-on-surface-variant">{p.desc}</p>
                <div className={`absolute top-1/2 -left-3 w-6 h-6 rounded-full hidden md:block border-4 border-surface -translate-y-1/2 ${p.active ? "bg-primary" : "bg-primary-container"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────
function CTA() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto bg-primary rounded-5xl p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(circle at center, white 0%, transparent 70%)" }} />
        <h2 className="text-4xl md:text-5xl font-headline font-black text-on-primary mb-6 relative z-10">
          Be the first to experience Ocular
        </h2>
        <p className="text-primary-container/80 text-lg mb-12 relative z-10">
          Limited early access. Shipping soon.
        </p>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 relative z-10">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full md:w-[70%] bg-on-primary/10 border border-on-primary/20 text-on-primary placeholder-on-primary/50 rounded-xl px-6 py-4 outline-none focus:border-on-primary/50"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
          <button className="w-full md:w-[30%] bg-on-primary text-primary font-bold px-4 py-4 rounded-xl hover:bg-surface-container-lowest transition-all duration-200">
            Notify Me
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  const links = ["Privacy Policy", "Terms of Service", "Safety Data", "Contact Us"];
  return (
    <footer className="w-full bg-surface-container-low py-10 px-12 border-t border-surface-container">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-lg font-headline font-black text-on-background">Ocular</span>
        <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-widest text-on-surface-variant">
          {links.map(l => (
            <a key={l} href="/" className="hover:text-on-background transition-colors">{l}</a>
          ))}
        </div>
        <p className="text-xs uppercase tracking-widest text-on-surface-variant text-center md:text-right">
          © 2026 Ocular. All rights reserved. <br /> Designed and developed by Harsh Jagtap(Team Ocular).
        </p>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-surface font-body">
      <Nav />
      <Hero />
      <Problem />
      <Comparison />
      <Solution />
      <HowItWorks />
      <Features />
      <Pricing />
      <Safety />
      <Roadmap />
      <CTA />
      <Footer />
    </div>
  );
}
