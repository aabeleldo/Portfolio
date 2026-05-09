"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const scramble = (target: string, progress: number) =>
  target.split("").map((char, i) => {
    if (char === " ") return " ";
    if (i / target.length < progress) return char;
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }).join("");

const IconGitHub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const IconEmail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/aabeleldo",        Icon: IconGitHub    },
  { label: "Instagram", href: "https://www.instagram.com/aabel.js", Icon: IconInstagram },
  { label: "Gmail",     href: "mailto:eldoaabel@gmail.com",           Icon: IconEmail     },
];

export default function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -9999, y: -9999 });

  const [name, setName] = useState("XXXXXXXXXX");
  const [role, setRole] = useState("XXXXXXXXXXXXXXXXXXX");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) document.body.style.cursor = "none";
    return () => { document.body.style.cursor = ""; };
  }, []);

  useEffect(() => {
    const NAME_TARGET = "AABEL ELDO";
    const ROLE_TARGET = "FULL STACK ENGINEER";
    let frame = 0;
    const TOTAL = 55;
    const id = setInterval(() => {
      frame++;
      const p = frame / TOTAL;
      setName(scramble(NAME_TARGET, p));
      setRole(scramble(ROLE_TARGET, p));
      if (frame >= TOTAL) {
        clearInterval(id);
        setName(NAME_TARGET);
        setRole(ROLE_TARGET);
        setReady(true);
      }
    }, 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let W = 0, H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    class Particle {
      x = 0; y = 0; vx = 0; vy = 0;
      r = 0; alpha = 0; life = 0; maxLife = 0;
      constructor() { this.reset(true); }
      reset(random = false) {
        this.x = Math.random() * W;
        this.y = random ? Math.random() * H : H + 10;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.4 + 0.1);
        this.r = Math.random() * 1.8 + 0.4;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 400 + 200;
      }
      update() {
        const dx = this.x - mousePos.current.x;
        const dy = this.y - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const REPEL_RADIUS = 100;
        const REPEL_STRENGTH = 1.5;
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
        this.vx *= 0.94;
        this.vy *= 0.94;
        this.vy -= 0.02;
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.y < -10) this.reset(false);
        if (this.life > this.maxLife) this.reset(true);
      }
      draw() {
        const fade =
          Math.min(this.life / 60, 1) *
          Math.min((this.maxLife - this.life) / 60, 1);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,255,${this.alpha * fade})`;
        ctx.fill();
      }
    }

    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 140 }, () => new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#05080f";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(5,8,18,0.4)";
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(120,170,255,${(1 - dist / 100) * 0.25})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        const cdx = particles[i].x - mousePos.current.x;
        const cdy = particles[i].y - mousePos.current.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mousePos.current.x, mousePos.current.y);
          ctx.strokeStyle = `rgba(140,190,255,${(1 - cdist / 160) * 0.35})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      mousePos.current = { x: t.clientX, y: t.clientY };
      targetRef.current = { x: t.clientX, y: t.clientY };
    };

    const handleTouchEnd = () => {
      mousePos.current = { x: -9999, y: -9999 };
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);

    let rafId: number;
    if (!isTouch) {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const tick = () => {
        posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.1);
        posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.1);
        if (cursorRing.current) {
          cursorRing.current.style.left = `${posRef.current.x - 20}px`;
          cursorRing.current.style.top  = `${posRef.current.y - 20}px`;
        }
        if (cursorDot.current) {
          cursorDot.current.style.left = `${targetRef.current.x - 3}px`;
          cursorDot.current.style.top  = `${targetRef.current.y - 3}px`;
        }
        rafId = requestAnimationFrame(tick);
      };
      tick();
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRing} style={{
        position: "fixed",
        top: -100, left: -100,
        zIndex: 99999,
        pointerEvents: "none",
        width: 40, height: 40,
        borderRadius: "50%",
        border: "1px solid rgba(120,180,255,0.6)",
        willChange: "top, left",
      }} />
      <div ref={cursorDot} style={{
        position: "fixed",
        top: -100, left: -100,
        zIndex: 99999,
        pointerEvents: "none",
        width: 6, height: 6,
        borderRadius: "50%",
        background: "rgba(140,200,255,0.9)",
        willChange: "top, left",
      }} />

      <section style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#05080f",
        fontFamily: "'Share Tech Mono', monospace",
        display: "flex",
        alignItems: "center",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');

          .scanlines::before {
            content: '';
            position: absolute; inset: 0; z-index: 10;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.07) 2px,
              rgba(0,0,0,0.07) 4px
            );
            pointer-events: none;
          }
          .scanlines::after {
            content: '';
            position: absolute; inset: 0; z-index: 9;
            background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%);
            pointer-events: none;
          }

          @keyframes glitchShift {
            0%,89%,100% { clip-path: inset(0 0 100% 0); transform: none; opacity: 0; }
            90% { clip-path: inset(15% 0 70% 0); transform: translateX(-5px); opacity: 1; }
            93% { clip-path: inset(55% 0 20% 0); transform: translateX(4px);  opacity: 1; }
            96% { clip-path: inset(80% 0 5%  0); transform: translateX(-3px); opacity: 1; }
          }
          .glitch-r {
            position: absolute; inset: 0;
            color: rgba(255,80,80,0.7);
            animation: glitchShift 5s infinite;
            font-family: 'VT323', monospace;
            font-size: clamp(4rem, 10vw, 9rem);
            line-height: 1; letter-spacing: .04em;
            white-space: nowrap;
          }
          .glitch-b {
            position: absolute; inset: 0;
            color: rgba(80,200,255,0.7);
            animation: glitchShift 5s infinite .12s;
            font-family: 'VT323', monospace;
            font-size: clamp(4rem, 10vw, 9rem);
            line-height: 1; letter-spacing: .04em;
            white-space: nowrap;
          }

          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
          .cursor-blink { animation: blink 1s step-end infinite; }

          @keyframes fadeUp {
            from { opacity:0; transform: translateY(14px); }
            to   { opacity:1; transform: none; }
          }
          .sub1 { animation: fadeUp .5s ease both .05s; }
          .sub2 { animation: fadeUp .5s ease both .2s;  }
          .sub3 { animation: fadeUp .5s ease both .35s; }
          .sub4 { animation: fadeUp .5s ease both .45s; }

          .crt-btn {
            border: 1px solid rgba(100,180,255,0.45);
            padding: 11px 30px;
            color: rgba(140,200,255,0.9);
            font-family: 'Share Tech Mono', monospace;
            font-size: 12px; letter-spacing: .16em;
            text-transform: uppercase; background: transparent;
            cursor: pointer; transition: all .2s;
          }
          .crt-btn:hover {
            background: rgba(100,180,255,0.1);
            box-shadow: 0 0 18px rgba(100,180,255,0.2);
            color: #fff;
          }

          .hero-social-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: rgba(100,150,255,0.45);
            text-decoration: none;
            font-family: 'Share Tech Mono', monospace;
            font-size: 11px;
            letter-spacing: .12em;
            text-transform: uppercase;
            transition: color .2s;
            white-space: nowrap;
          }
          .hero-social-link:hover {
            color: rgba(160,210,255,0.8);
          }
          .hero-social-link svg {
            flex-shrink: 0;
            transition: transform .2s;
            width: 16px;
            height: 16px;
          }
          .hero-social-link:hover svg {
            transform: translateY(-1px);
          }

          /* Desktop status bar — hidden on mobile */
          @media (max-width: 768px) {
            .hero-status-bar { display: none !important; }
          }

          /* Mobile social row — shown only on mobile, inline below the CTA */
          .mobile-socials {
            display: none;
          }
          @media (max-width: 768px) {
            .mobile-socials {
              display: flex;
              align-items: center;
              gap: 20px;
              margin-top: 28px;
            }
          }

          .mobile-social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(100,150,255,0.45);
            text-decoration: none;
            transition: color .2s;
          }
          .mobile-social-icon svg {
            width: 20px;
            height: 20px;
          }
          .mobile-social-icon:active {
            color: rgba(160,210,255,0.9);
          }
        `}</style>

        <canvas ref={canvasRef} style={{
          position: "absolute",
          top: 0, left: 0,
          zIndex: 0,
          display: "block",
        }} />

        <div className="scanlines" style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute", top: "35%", left: "12%",
          width: 600, height: 400,
          background: "radial-gradient(ellipse, rgba(60,120,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)", zIndex: 1, pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 6, padding: "0 8vw" }}>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
            color: "rgba(100,160,255,0.45)", letterSpacing: ".2em",
            margin: "0 0 24px", textTransform: "uppercase",
          }}>
            &gt; PORTFOLIO_v2.0 — SYSTEM READY
          </p>

          <div style={{ position: "relative", lineHeight: 1, marginBottom: 16 }}>
            <h1 style={{
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(4rem, 10vw, 9rem)",
              color: "rgba(180,215,255,0.95)", margin: 0,
              letterSpacing: ".04em", lineHeight: 1,
              textShadow: "0 0 24px rgba(100,160,255,0.35)",
              whiteSpace: "nowrap",
            }}>
              {name}<span className="cursor-blink" style={{ color: "rgba(140,200,255,0.8)" }}>_</span>
            </h1>
            <div className="glitch-r" aria-hidden="true">{name}_</div>
            <div className="glitch-b" aria-hidden="true">{name}_</div>
          </div>

          <div style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: ready ? "auto" : "none",
          }}>
            <p className="sub1" style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(.85rem, 1.8vw, 1.15rem)",
              color: "rgba(120,175,255,0.6)", margin: "0 0 10px",
              letterSpacing: ".18em",
            }}>
              &gt; {role}
            </p>
            <p className="sub2" style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 12, color: "rgba(100,150,255,0.35)",
              letterSpacing: ".1em", margin: "0 0 40px", lineHeight: 1.7,
            }}>
              &gt; CLEAN FRONTEND & BACKEND DEVELOPMENT — END TO END.
            </p>
            <div className="sub3">
              <button
                className="crt-btn"
                onClick={() => {
                  posthog.capture("cta_clicked", { label: "view_work" });
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                &gt; ./view_work.sh
              </button>
            </div>

            {/* Mobile social icons — inline below CTA */}
            <div className="mobile-socials sub4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="mobile-social-icon"
                  aria-label={label}
                  onClick={() => posthog.capture("social_link_clicked", { platform: label, location: "hero_mobile" })}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop status bar */}
        <div className="hero-status-bar" style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          borderTop: "1px solid rgba(100,160,255,0.1)",
          padding: "14px 8vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11, color: "rgba(100,150,255,0.35)",
          letterSpacing: ".12em", zIndex: 6,
        }}>
          <span>STATUS: ONLINE</span>
          <span>AABEL ELDO — FULL STACK ENGINEER</span>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {SOCIALS.map(({ label, href, Icon }) => (
              
                <a key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="hero-social-link"
                onClick={() => posthog.capture("social_link_clicked", { platform: label, location: "hero" })}
              >
                <Icon />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}