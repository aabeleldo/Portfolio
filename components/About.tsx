"use client";

export default function About() {
  const STATS = [
    { value: "3+",  label: "Years Experience" },
    { value: "15+", label: "Projects Delivered" },
    { value: "10+", label: "Happy Clients" },
    { value: "∞",   label: "Energy Drinks" },
  ];

  const STACK = [
    "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "HTML", "CSS",
    "Tailwind", "Python", "C++", "Git", "PROS Framework", "CAD",
  ];

  return (
    <section id="about" style={{
      background: "#05080f",
      padding: "120px 8vw",
      minHeight: "100vh",
      position: "relative",
    }}>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          width: 100%;
          align-items: start;
        }

        .stack-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(120,160,205,0.55);
          border: 1px solid rgba(110,150,200,0.2);
          padding: 5px 12px;
          transition: color .15s, border-color .15s;
        }
        .stack-tag:hover {
          color: rgba(190,220,255,0.9);
          border-color: rgba(140,180,230,0.5);
        }

        .stat-val {
          font-family: 'VT323', monospace;
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: rgba(190,220,255,0.9);
          line-height: 1;
        }
        .stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(110,150,200,0.45);
          margin-top: 4px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding-top: 40px;
          border-top: 1px solid rgba(110,150,200,0.1);
        }

        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="about-grid">
          <div>
            <div style={{ marginBottom: 40 }}>
              <p style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 11, letterSpacing: ".2em",
                color: "rgba(110,150,200,0.45)",
                textTransform: "uppercase", margin: "0 0 12px",
              }}>
                &gt; who_i_am
              </p>
              <h2 style={{
                fontFamily: "'VT323', monospace",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "rgba(200,220,255,0.92)",
                margin: 0, lineHeight: 1,
              }}>
                About_
              </h2>
            </div>

            <p style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 13, color: "rgba(150,185,220,0.55)",
              lineHeight: 1.85, margin: "0 0 16px",
            }}>
              I'm a web developer based in St. Thomas, ON. I've been writing code since I was 8, starting on Scratch and Roblox, moving through Java, app development with React Native and Expo, and eventually landing on modern web development with Next.js and Tailwind. What started as a hobby became a real freelance business building sites for local clients across Southern Ontario.
            </p>
            <p style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 13, color: "rgba(150,185,220,0.45)",
              lineHeight: 1.85, margin: "0 0 48px",
            }}>
              Outside of web dev, I compete in VEX robotics where I write C++ using the PROS framework and work in CAD, so I'm just as comfortable in a technical environment as I am designing something that looks good. I build websites for small businesses that are clean, fast, and actually bring in customers.
            </p>

            <div className="stats-grid">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="stat-val">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              border: "1px solid rgba(110,150,200,0.15)",
              overflow: "hidden",
              marginBottom: 32,
            }}>
              <div style={{
                background: "rgba(110,150,200,0.06)",
                borderBottom: "1px solid rgba(110,150,200,0.12)",
                padding: "10px 16px",
                display: "flex", gap: 8, alignItems: "center",
              }}>
                {["rgba(255,90,90,0.6)", "rgba(255,190,50,0.6)", "rgba(50,210,100,0.6)"].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10, color: "rgba(110,150,200,0.35)",
                  marginLeft: 8, letterSpacing: ".1em",
                }}>
                  abel@portfolio:~$
                </span>
              </div>
              <div style={{ padding: "20px" }}>
                {[
                  { k: "name",      v: '"Abel Eldo"' },
                  { k: "role",      v: '"Web Developer"' },
                  { k: "location",  v: '"St. Thomas, ON"' },
                  { k: "email",     v: '"eldoaabel@gmail.com"' },
                  { k: "phone",     v: '"(437) 324-4038"' },
                  { k: "available", v: "true" },
                ].map(({ k, v }) => (
                  <div key={k} style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 12, lineHeight: 2,
                    color: "rgba(150,185,220,0.55)",
                    wordBreak: "break-all",
                  }}>
                    <span style={{ color: "rgba(110,150,200,0.45)" }}>{k}</span>
                    <span style={{ color: "rgba(110,150,200,0.3)" }}>: </span>
                    <span style={{ color: "rgba(190,220,255,0.75)" }}>{v}</span>
                    <span style={{ color: "rgba(110,150,200,0.3)" }}>,</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10, letterSpacing: ".18em",
                color: "rgba(110,150,200,0.4)",
                textTransform: "uppercase", margin: "0 0 16px",
              }}>
                &gt; tech_stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {STACK.map(t => <span key={t} className="stack-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}