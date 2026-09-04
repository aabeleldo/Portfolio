"use client";

import { useState } from "react";
import posthog from "posthog-js";

const SERVICES = [
  {
    title: "Landing Pages & Business Sites",
    description: "Most local businesses are invisible online or stuck with a generic template that doesn't convert. I build clean, fast, custom sites that actually represent what you do, and get people to call.",
    details: ["Custom UI/UX Design", "Wireframing & Prototyping", "Design Systems", "Brand Identity"],
  },
  {
    title: "Full Stack Development",
    description: "Got an idea that needs more than a landing page? I build full web apps with Next.js and React, from database to deployment. No hand-holding required on your end.",
    details: ["React / Next.js", "Node.js / Express", "Database Design", "API Integration"],
  },
  {
    title: "Online Ordering & Payments",
    description: "I've set up Stripe payment systems and Toast POS integrations for local businesses that need to take orders and payments online, not just a contact form. Restaurants, retail, whatever you're selling.",
    details: ["Stripe Integration", "Toast POS Setup", "Online Ordering", "Payment Flows"],
  },
  {
    title: "Maintenance & Updates",
    description: "Sites break, go stale, and slow down. I offer monthly retainers to keep yours fast, updated, and working so you're not scrambling when something breaks.",
    details: ["Performance Monitoring", "Content Updates", "Security Patches", "Monthly Reporting"],
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" style={{
      background: "#060a12",
      padding: "120px 8vw",
      minHeight: "100vh",
      position: "relative",
    }}>
      <style>{`
        .svc-row {
          border-top: 1px solid rgba(110,150,200,0.12);
          padding: 28px 0;
          cursor: pointer;
        }
        .svc-row:last-child { border-bottom: 1px solid rgba(110,150,200,0.12); }

        .svc-detail-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px;
          margin-top: 16px;
          overflow: hidden;
          transition: max-height .3s ease, opacity .25s ease;
        }
        .svc-detail-item {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: .08em;
          color: rgba(120,160,205,0.55);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .svc-detail-item::before { content: '>'; color: rgba(110,150,200,0.35); }

        .svc-toggle {
          font-family: 'Share Tech Mono', monospace;
          font-size: 16px;
          color: rgba(110,150,200,0.45);
          transition: transform .2s;
          line-height: 1;
        }
        .svc-row.open .svc-toggle { transform: rotate(45deg); }

        @media (max-width: 768px) {
          .svc-detail-list { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 60 }}>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 11, letterSpacing: ".2em",
            color: "rgba(110,150,200,0.45)",
            textTransform: "uppercase", margin: "0 0 12px",
          }}>
            &gt; what_i_do
          </p>
          <h2 style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "rgba(200,220,255,0.92)",
            margin: 0, lineHeight: 1,
          }}>
            Services_
          </h2>
        </div>

        <div style={{ maxWidth: 820 }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`svc-row ${open === i ? "open" : ""}`}
              onClick={() => {
                const isOpening = open !== i;
                setOpen(isOpening ? i : null);
                if (isOpening) posthog.capture("service_card_expanded", { service: s.title });
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <h3 style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "rgba(190,215,250,0.88)",
                  margin: 0, lineHeight: 1,
                }}>
                  {s.title}
                </h3>
                <span className="svc-toggle">+</span>
              </div>

              {open === i && (
                <>
                  <p style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 12, color: "rgba(130,170,210,0.55)",
                    margin: "14px 0 0", lineHeight: 1.75, maxWidth: 620,
                  }}>
                    {s.description}
                  </p>
                  <div className="svc-detail-list" style={{ maxHeight: 200, opacity: 1 }}>
                    {s.details.map(d => (
                      <div key={d} className="svc-detail-item">{d}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}