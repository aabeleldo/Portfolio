"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

const LINKS = [
  { label: "Home",        href: "#home" },
  { label: "Work",        href: "#work" },
  { label: "Engineering", href: "#engineering" },
  { label: "Services",    href: "#services" },
  { label: "About",       href: "#about" },
  { label: "Contact",     href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [underlineReady, setUnderlineReady] = useState(false);
  const underlineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move underline to active item — no transition on first paint
  useEffect(() => {
    const el = itemRefs.current[active];
    const nav = navRef.current;
    const underline = underlineRef.current;
    if (!el || !nav || !underline) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    if (!underlineReady) {
      underline.style.transition = "none";
      underline.style.width = `${elRect.width}px`;
      underline.style.left  = `${elRect.left - navRect.left}px`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          underline.style.transition = "";
          setUnderlineReady(true);
        });
      });
    } else {
      underline.style.width = `${elRect.width}px`;
      underline.style.left  = `${elRect.left - navRect.left}px`;
    }
  }, [active, visible, underlineReady]);

  useEffect(() => {
    const onScroll = () => {
      for (const link of [...LINKS].reverse()) {
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(link.label);
          return;
        }
      }
      setActive("Home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string, label: string, source: "desktop" | "mobile" = "desktop") => {
    posthog.capture("nav_link_clicked", { label, source });
    setActive(label);
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        .navbar-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 99990;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 32px;
          background: rgba(5, 8, 18, 0);
          border-bottom: 1px solid rgba(110,150,200,0);
          transition: background .25s ease, border-color .25s ease;
        }
        .navbar-bar.show {
          background: rgba(5, 8, 18, 0.92);
          border-bottom: 1px solid rgba(110,150,200,0.14);
        }

        .nav-logo {
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(140,180,230,0.7);
        }

        .navbar-links {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-underline {
          position: absolute;
          bottom: -2px;
          height: 1px;
          background: rgba(160,200,255,0.85);
          transition: left .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1);
          pointer-events: none;
        }

        .nav-btn {
          position: relative;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px 16px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(120,160,205,0.5);
          transition: color .2s;
          white-space: nowrap;
        }
        .nav-btn:hover { color: rgba(180,215,255,0.85); }
        .nav-btn.active { color: rgba(210,230,255,0.95); }

        .nav-cta {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(160,200,255,0.85);
          border: 1px solid rgba(120,170,255,0.4);
          background: transparent;
          padding: 8px 18px;
          cursor: pointer;
          transition: background .12s steps(2), color .12s steps(2);
        }
        .nav-cta:hover { background: rgba(160,200,255,0.9); color: #05080f; }

        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 99991;
          background: rgba(5, 8, 18, 0.9);
          border: 1px solid rgba(110,150,200,0.2);
          padding: 10px 12px;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
        }
        .mobile-menu-btn span {
          display: block;
          width: 20px;
          height: 1px;
          background: rgba(150,190,240,0.7);
          transition: transform .3s, opacity .3s;
        }
        .mobile-menu-btn.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .mobile-menu-btn.open span:nth-child(2) { opacity: 0; width: 0; }
        .mobile-menu-btn.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 99989;
          background: rgba(5, 8, 18, 0.98);
          border-bottom: 1px solid rgba(110,150,200,0.14);
          padding: 80px 24px 32px;
          flex-direction: column;
          gap: 8px;
          transform: translateY(-100%);
          transition: transform .3s cubic-bezier(.4,0,.2,1);
        }
        .mobile-menu.open { transform: translateY(0); }

        .mobile-nav-btn {
          background: transparent;
          border: none;
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(120,160,205,0.55);
          padding: 14px 0;
          text-align: left;
          cursor: pointer;
          border-bottom: 1px solid rgba(110,150,200,0.08);
          transition: color .2s;
        }
        .mobile-nav-btn:last-child { border-bottom: none; }
        .mobile-nav-btn.active { color: rgba(210,230,255,0.95); }

        .mobile-hire-btn {
          margin-top: 16px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(160,200,255,0.9);
          border: 1px solid rgba(120,170,255,0.4);
          background: transparent;
          padding: 14px;
          cursor: pointer;
          text-align: center;
        }

        @media (max-width: 768px) {
          .navbar-bar { display: none !important; }
          .mobile-menu-btn { display: flex; }
          .mobile-menu { display: flex; }
        }
      `}</style>

      <div className={`navbar-bar ${visible ? "show" : ""}`}>
        <span className="nav-logo">AE</span>

        <div className="navbar-links" ref={navRef}>
          <div className="nav-underline" ref={underlineRef} />
          {LINKS.map(({ label, href }) => (
            <button
              key={label}
              ref={el => { itemRefs.current[label] = el; }}
              className={`nav-btn ${active === label ? "active" : ""}`}
              onClick={() => scrollTo(href, label, "desktop")}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="nav-cta"
          onClick={() => { posthog.capture("hire_me_clicked", { source: "desktop" }); scrollTo("#contact", "Contact"); }}
        >
          Hire Me
        </button>
      </div>

      <button
        className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {LINKS.map(({ label, href }) => (
          <button
            key={label}
            className={`mobile-nav-btn ${active === label ? "active" : ""}`}
            onClick={() => scrollTo(href, label, "mobile")}
          >
            &gt; {label}
          </button>
        ))}
        <button
          className="mobile-hire-btn"
          onClick={() => { posthog.capture("hire_me_clicked", { source: "mobile" }); scrollTo("#contact", "Contact", "mobile"); }}
        >
          &gt; Hire Me
        </button>
      </div>
    </>
  );
}