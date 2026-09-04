"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import posthog from "posthog-js";

const IconEmail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconGitHub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [viewed, setViewed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !viewed) {
        setViewed(true);
        posthog.capture("contact_section_viewed");
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [viewed]);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError(false);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSent(true);
      setForm({ name: "", email: "", budget: "", message: "" });
      posthog.capture("contact_form_submitted", { budget: form.budget });
    } catch (err) {
      setError(true);
      posthog.captureException(err);
      posthog.capture("contact_form_failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} style={{
      background: "#060a12",
      padding: "120px 8vw 80px",
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box",
    }}>
      <style>{`
        .ctc-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 60px;
          align-items: start;
        }

        .ctc-input {
          width: 100%;
          background: rgba(110,150,200,0.03);
          border: 1px solid rgba(110,150,200,0.16);
          padding: 14px 16px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          letter-spacing: .06em;
          color: rgba(190,220,255,0.8);
          outline: none;
          transition: border-color .2s, background .2s;
          box-sizing: border-box;
        }
        .ctc-input::placeholder { color: rgba(110,150,200,0.3); }
        .ctc-input:focus {
          border-color: rgba(140,180,230,0.4);
          background: rgba(110,150,200,0.06);
        }
        textarea.ctc-input { resize: vertical; min-height: 140px; }

        .ctc-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .ctc-submit {
          border: 1px solid rgba(140,180,230,0.5);
          padding: 14px 40px;
          color: rgba(160,200,255,0.9);
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; letter-spacing: .14em;
          text-transform: uppercase; background: transparent;
          cursor: pointer;
          transition: background .12s steps(2), color .12s steps(2);
        }
        .ctc-submit:hover:not(:disabled) { background: rgba(160,200,255,0.9); color: #05080f; }
        .ctc-submit:disabled { opacity: .5; }

        .social-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(110,150,200,0.45);
          text-decoration: none;
          transition: color .15s;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .social-link:hover { color: rgba(190,220,255,0.85); }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: 1px solid rgba(110,150,200,0.18);
          flex-shrink: 0;
        }

        .social-arrow {
          font-size: 12px;
          margin-left: auto;
          color: rgba(110,150,200,0.35);
        }

        @media (max-width: 768px) {
          .ctc-layout { grid-template-columns: 1fr; gap: 48px; }
          .ctc-form-grid { grid-template-columns: 1fr; }
          .ctc-submit { width: 100%; text-align: center; }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>

        <div style={{ marginBottom: 64 }}>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 11, letterSpacing: ".2em",
            color: "rgba(110,150,200,0.45)",
            textTransform: "uppercase", margin: "0 0 12px",
          }}>
            &gt; get_in_touch
          </p>
          <h2 style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "rgba(200,220,255,0.92)",
            margin: "0 0 16px", lineHeight: 1,
          }}>
            Let's Work Together_
          </h2>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 13, color: "rgba(120,160,205,0.45)",
            maxWidth: 480, lineHeight: 1.8, margin: 0,
          }}>
            Have a project in mind? Fill out the form and I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="ctc-layout">
          {sent ? (
            <div style={{
              border: "1px solid rgba(100,200,120,0.3)",
              padding: "48px 40px",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'VT323', monospace",
                fontSize: "3rem",
                color: "rgba(100,220,140,0.85)",
                margin: "0 0 12px",
              }}>Message Sent_</p>
              <p style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 12, color: "rgba(100,200,120,0.55)",
                letterSpacing: ".08em",
              }}>
                I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={e => { e.preventDefault(); handleSubmit(); }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div className="ctc-form-grid">
                <div>
                  <label style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 10, letterSpacing: ".12em",
                    color: "rgba(110,150,200,0.4)",
                    textTransform: "uppercase",
                    display: "block", marginBottom: 8,
                  }}>Name</label>
                  <input
                    className="ctc-input"
                    name="from_name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 10, letterSpacing: ".12em",
                    color: "rgba(110,150,200,0.4)",
                    textTransform: "uppercase",
                    display: "block", marginBottom: 8,
                  }}>Email</label>
                  <input
                    className="ctc-input"
                    type="email"
                    name="from_email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10, letterSpacing: ".12em",
                  color: "rgba(110,150,200,0.4)",
                  textTransform: "uppercase",
                  display: "block", marginBottom: 8,
                }}>Budget Range</label>
                <select
                  className="ctc-input"
                  name="budget"
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  style={{ appearance: "none" }}
                >
                  <option value="" style={{ background: "#05080f" }}>Select a range</option>
                  <option value="<500"      style={{ background: "#05080f" }}>Under $500</option>
                  <option value="500-1000"  style={{ background: "#05080f" }}>$500 – $1,000</option>
                  <option value="1000-5000" style={{ background: "#05080f" }}>$1,000 – $5,000</option>
                  <option value="5000+"     style={{ background: "#05080f" }}>$5,000+</option>
                </select>
              </div>

              <div>
                <label style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10, letterSpacing: ".12em",
                  color: "rgba(110,150,200,0.4)",
                  textTransform: "uppercase",
                  display: "block", marginBottom: 8,
                }}>Message</label>
                <textarea
                  className="ctc-input"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button className="ctc-submit" type="submit" disabled={sending}>
                  {sending ? "Sending..." : "./send_message.sh"}
                </button>
                {error && (
                  <span style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 11, color: "rgba(255,90,90,0.75)",
                    letterSpacing: ".08em",
                  }}>
                    ✗ Something went wrong
                  </span>
                )}
              </div>
            </form>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <p style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10, letterSpacing: ".16em",
                color: "rgba(110,150,200,0.35)",
                textTransform: "uppercase", margin: "0 0 16px",
              }}>
                &gt; direct
              </p>
              <a href="mailto:eldoaabel@gmail.com"
                className="social-link"
                style={{ fontSize: 12 }}
                onClick={() => posthog.capture("social_link_clicked", { platform: "email" })}
              >
                <span className="social-icon"><IconEmail /></span>
                eldoaabel@gmail.com
                <span className="social-arrow">↗</span>
              </a>
            </div>

            <div>
              <p style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10, letterSpacing: ".16em",
                color: "rgba(110,150,200,0.35)",
                textTransform: "uppercase", margin: "0 0 16px",
              }}>
                &gt; elsewhere
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "GitHub",    href: "https://github.com/aabeleldo",                           Icon: IconGitHub    },
                  { label: "LinkedIn",  href: "https://www.linkedin.com/in/aabel-eldo-0335b6384/",      Icon: IconLinkedIn  },
                  { label: "Instagram", href: "https://www.instagram.com/aabel.js",                  Icon: IconInstagram },
                ].map(s => (
                  <a key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                    onClick={() => posthog.capture("social_link_clicked", { platform: s.label })}
                  >
                    <span className="social-icon"><s.Icon /></span>
                    {s.label}
                    <span className="social-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{
              border: "1px solid rgba(100,200,120,0.25)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "rgba(100,220,140,0.85)",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 11, letterSpacing: ".08em",
                color: "rgba(100,200,120,0.65)",
              }}>
                Available for new projects
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(110,150,200,0.1)",
        paddingTop: 32,
        marginTop: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, letterSpacing: ".12em",
          color: "rgba(110,150,200,0.3)",
          textTransform: "uppercase",
        }}>
          © 2026 Abel Eldo
        </span>
      </div>
    </section>
  );
}