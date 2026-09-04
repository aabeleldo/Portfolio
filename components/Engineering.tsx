"use client";

import { useState } from "react";
import posthog from "posthog-js";

const ARCH_COMPONENTS = [
  { label: "State Representation", detail: "Each particle encodes (x, y, θ, weight) as a full pose hypothesis." },
  { label: "Motion Model", detail: "Tracking wheels + IMU provide odometry deltas with injected noise to model slip and drift." },
  { label: "Sensor Model", detail: "Distance sensors compare expected vs observed readings; weights updated via Gaussian likelihood." },
  { label: "Resampling", detail: "Weighted sampling preserves high-probability particles and removes low-confidence states." },
  { label: "Pose Estimation", detail: "Final pose computed as weighted mean of all particles." },
];

const OUTCOMES = [
  "Improved autonomous consistency across runs",
  "Reduced odometry drift accumulation",
  "Robust navigation under sensor noise",
  "Stable convergence during wheel slip events",
];

const SNIPPETS = [
  { label: "Particle struct", code: `struct Particle {\n  double x;\n  double y;\n  double theta;\n  double weight;\n};` },
  { label: "Motion update", code: `particle.x += deltaX + randomNoise();\nparticle.y += deltaY + randomNoise();\nparticle.theta += deltaTheta + randomNoise();` },
  { label: "Weight update", code: `double error = abs(realDistance - expectedDistance);\nparticle.weight = exp(-(error * error) / sigma);` },
  { label: "Resampling", code: `for i in 1..N:\n  select particle proportional to weight\n  copy into new set` },
];

export default function Engineering() {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="engineering"
      style={{
        background: "#05080f",
        padding: "120px 24px 160px",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');

        .wrap { max-width: 1050px; margin: 0 auto; }

        .label {
          font-family: 'Share Tech Mono';
          font-size: 10px;
          letter-spacing: .2em;
          color: rgba(110,150,200,0.4);
          text-transform: uppercase;
        }

        .h1 {
          font-family: 'VT323';
          font-size: clamp(2.8rem, 6vw, 5rem);
          color: rgba(210,225,250,0.92);
          margin: 10px 0;
        }

        .h2 {
          font-family: 'VT323';
          font-size: 2.2rem;
          color: rgba(210,225,250,0.88);
        }

        .text {
          font-family: 'Share Tech Mono';
          font-size: 12px;
          color: rgba(130,165,205,0.55);
          line-height: 1.8;
          max-width: 750px;
        }

        .chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }

        .chip {
          font-family:'Share Tech Mono';
          font-size:10px;
          padding:5px 12px;
          border:1px solid rgba(110,150,200,0.22);
          color:rgba(130,170,220,0.55);
        }

        .grid2 {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:12px;
          margin-top:28px;
        }

        .box {
          border:1px solid rgba(110,150,200,0.16);
          background:rgba(10,14,25,0.6);
          padding:10px;
        }

        .box img { width:100%; display:block; }

        .row {
          border-bottom:1px solid rgba(110,150,200,0.08);
          padding:14px 0;
          cursor:pointer;
        }

        pre {
          font-family:'Share Tech Mono';
          font-size:12px;
          color:rgba(170,205,240,0.7);
          white-space: pre-wrap;
        }

        .outcome {
          font-family:'Share Tech Mono';
          font-size:11px;
          color:rgba(120,220,160,0.6);
          margin:6px 0;
        }

        .snippet-chip {
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color .15s, border-color .15s;
        }
        .snippet-chip.active {
          color: rgba(190,220,255,0.9);
          border-bottom-color: rgba(160,200,255,0.7);
        }

        .photo-caption {
          margin-top: 8px;
          font-family: 'Share Tech Mono';
          font-size: 10px;
          color: rgba(110,150,200,0.4);
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .grid2 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="wrap">

        <div>
          <div className="label">&gt; engineering_work</div>
          <div className="h1">Engineering_</div>
          <div className="text">
            Robotics, embedded systems, CAD, and probabilistic localization built for
            competitive autonomous systems.
          </div>
          <div className="chips">
            {["C++", "Robotics", "VEX", "Monte Carlo Localization", "VEX Worlds"].map(t => (
              <div key={t} className="chip">{t}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 60 }}>
          <div className="label">&gt; featured_project</div>
          <div className="h2">Monte Carlo Localization</div>
          <div className="text">
            Particle filter localization combining odometry (tracking wheels + IMU)
            with distance sensor corrections to reduce cumulative drift in autonomous navigation.
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <img
            src="/formula.png"
            alt="Particle filter Bayesian update equation"
            style={{
              width: "100%",
              maxWidth: 520,
              display: "block",
              opacity: 0.9,
              borderLeft: "2px solid rgba(110,150,200,0.35)",
              paddingLeft: 12,
              background: "rgba(10,14,25,0.4)",
            }}
          />
        </div>

        <div className="grid2" style={{ alignItems: "stretch" }}>
          <div className="box" style={{ padding: 0, overflow: "hidden", height: 280, display: "flex", flexDirection: "column" }}>
            <video
              src="/robot.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ flex: 1, width: "100%", objectFit: "contain", display: "block", minHeight: 0 }}
            />
            <div style={{ padding: "8px 12px", fontFamily: "Share Tech Mono", fontSize: 10, color: "rgba(110,150,200,0.4)", letterSpacing: ".1em", textTransform: "uppercase" }}>
              Robot execution
            </div>
          </div>

          <div className="box" style={{ padding: 0, overflow: "hidden", height: 280, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
              <img
                src="/diagram.png"
                alt="system diagram"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
            <div style={{ padding: "8px 12px", fontFamily: "Share Tech Mono", fontSize: 10, color: "rgba(110,150,200,0.4)", letterSpacing: ".1em", textTransform: "uppercase" }}>
              Particle filter diagram
            </div>
          </div>
        </div>

        <div style={{ marginTop: 60 }}>
          <div className="label">&gt; system_architecture</div>
          <div className="h2">Architecture</div>
          {ARCH_COMPONENTS.map((a, i) => (
            <div key={a.label} className="row" onClick={() => {
              const isOpening = expanded !== i;
              setExpanded(isOpening ? i : null);
              if (isOpening) posthog.capture("architecture_row_expanded", { component: a.label });
            }}>
              <div style={{ fontFamily: "Share Tech Mono", color: "rgba(170,205,240,0.7)" }}>
                {a.label}
              </div>
              {expanded === i && (
                <div className="text" style={{ marginTop: 6 }}>
                  {a.detail}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60 }}>
          <div className="label">&gt; core_implementation</div>
          <div className="h2">Code</div>
          <div className="box">
            <pre>{SNIPPETS[activeSnippet].code}</pre>
          </div>
          <div className="chips" style={{ marginTop: 10 }}>
            {SNIPPETS.map((s, i) => (
              <div
                key={s.label}
                className={`chip snippet-chip ${activeSnippet === i ? "active" : ""}`}
                onClick={() => { setActiveSnippet(i); posthog.capture("engineering_snippet_selected", { snippet: s.label }); }}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 60 }}>
          <div className="label">&gt; results</div>
          <div className="h2">Outcomes</div>
          {OUTCOMES.map(o => (
            <div key={o} className="outcome">✓ {o}</div>
          ))}
        </div>

        <div style={{ marginTop: 80 }}>
          <div className="label">&gt; community</div>
          <div className="h2">VEX Worlds</div>
          <div className="text" style={{ marginBottom: 24 }}>
            Part of a school robotics program whose team qualified for and attended the
            VEX World Championship, the largest robotics competition in the world.
            Attended Worlds alongside the team, taking in the scale of international
            competition firsthand.
          </div>

          <img
            src="/team.jpg"
            alt="Robotics team at the University of Waterloo Engineering building"
            style={{
              width: "100%",
              maxHeight: 380,
              objectFit: "cover",
              display: "block",
              border: "1px solid rgba(110,150,200,0.16)",
            }}
          />
          <div className="photo-caption">University of Waterloo — Regional Tournament</div>

          <div className="grid2" style={{ marginTop: 12 }}>
            <div>
              <img
                src="/canada.jpg"
                alt="Canadian teams on stage at VEX Worlds parade of nations"
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  display: "block",
                  border: "1px solid rgba(110,150,200,0.16)",
                }}
              />
              <div className="photo-caption">Parade of Nations — Team Canada, VEX Worlds</div>
            </div>

            <div>
              <img
                src="/worldteam.jpg"
                alt="Full school robotics team at VEX Worlds"
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  display: "block",
                  border: "1px solid rgba(110,150,200,0.16)",
                }}
              />
              <div className="photo-caption">Full team — VEX World Championship</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}