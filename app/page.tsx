"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const ACCENT = "oklch(0.78 0.13 200)";
const ACCENT_BRIGHT = "oklch(0.82 0.12 200)";

type Cap = { n: string; title: string; blurb: string };
type Person = { name: string; role: string; email: string; bio: string };

const caps: Cap[] = [
  {
    n: "01",
    title: "Equation learning from data",
    blurb:
      "Discover the governing equations of a system directly from measurements — no assumed model form required.",
  },
  {
    n: "02",
    title: "Ultra-fast parameter estimation",
    blurb:
      "Calibrate complex models orders of magnitude faster, turning overnight fits into seconds.",
  },
  {
    n: "03",
    title: "Forecasting",
    blurb:
      "Predictive models with calibrated uncertainty for decisions in health, energy, finance, and beyond.",
  },
  {
    n: "04",
    title: "Reduced-order modeling",
    blurb:
      "Compress high-dimensional simulations into fast surrogates without sacrificing fidelity.",
  },
  {
    n: "05",
    title: "Industrial-scale model selection",
    blurb:
      "Search across more than 10⁹ candidate models simultaneously — in seconds, not weeks.",
  },
];

const team: Person[] = [
  {
    name: "Vanja Dukic",
    role: "Co-founder · Statistics & Applied Math",
    email: "vanja.dukic@gmail.com",
    bio: "Bayesian modeling, statistical inference, and computational methods for complex real-world systems.",
  },
  {
    name: "David Bortz",
    role: "Co-founder · Applied Mathematics",
    email: "david.bortz@colorado.edu",
    bio: "Data-driven modeling, equation learning, and mathematical biology at industrial scale.",
  },
  {
    name: "Dan Messenger",
    role: "Co-founder · Scientific Machine Learning",
    email: "daniel.messenger@colorado.edu",
    bio: "Data-driven modeling and the analysis and simulation of multiscale phenomena at the intersection of physical applied math and scientific ML.",
  },
];

const industries: string[] = [
  "Enterprise & industrial R&D",
  "Life sciences & biomedicine",
  "Energy & climate",
  "Advanced manufacturing",
  "Finance & risk",
  "Research labs & academia",
];

const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const grotesk: CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  // Scroll-reveal: reveal .reveal elements as they enter the viewport.
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els || els.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Dialog: lock body scroll + close on Escape.
  useEffect(() => {
    if (!dialogOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDialogOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [dialogOpen]);

  const openDialog = () => setDialogOpen(true);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      window.setTimeout(() => setCopied((c) => (c === email ? null : c)), 1600);
    } catch {
      // Clipboard unavailable — the mailto link is still available.
    }
  };

  return (
    <main
      ref={rootRef}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        background: "#0a0d11",
        color: "#e7ecf2",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        fontFamily: "'Public Sans', sans-serif",
      }}
    >
      {/* nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 44px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            className="brand-mark"
            style={{
              width: 26,
              height: 26,
              border: `1.5px solid ${ACCENT}`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 5,
                background: ACCENT,
                clipPath:
                  "polygon(0 100%, 40% 30%, 62% 62%, 100% 0, 100% 100%)",
              }}
            />
          </div>
          <span style={{ ...grotesk, fontWeight: 700, letterSpacing: "-0.01em" }}>
            Boulder Computational Solutions
          </span>
        </div>
        <div style={{ display: "flex", gap: 30, fontSize: 14 }}>
          <button className="nav-link" onClick={() => scrollToId("capabilities")}>
            Capabilities
          </button>
          <button className="nav-link" onClick={() => scrollToId("results")}>
            Results
          </button>
          <button className="nav-link" onClick={() => scrollToId("team")}>
            Team
          </button>
          <button className="nav-link" onClick={() => scrollToId("industries")}>
            Industries
          </button>
        </div>
        <button
          className="btn btn-secondary"
          onClick={openDialog}
          style={{
            ...mono,
            fontSize: 13,
            color: ACCENT_BRIGHT,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.14)",
            padding: "8px 14px",
            borderRadius: 4,
          }}
        >
          Get in touch
        </button>
      </div>

      {/* hero */}
      <div style={{ padding: "80px 44px 72px", position: "relative" }}>
        <div
          className="reveal"
          style={{
            ...mono,
            fontSize: 13,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: 26,
          }}
        >
          Applied math · statistics · scientific computing
        </div>
        <h1
          className="reveal"
          style={{
            ...grotesk,
            fontWeight: 700,
            fontSize: 60,
            lineHeight: 1.03,
            letterSpacing: "-0.025em",
            margin: 0,
            maxWidth: 920,
            transitionDelay: "0.08s",
          }}
        >
          We Change the Equation
        </h1>
        <p
          className="reveal"
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "#aab3bf",
            maxWidth: 640,
            margin: "28px 0 0",
            transitionDelay: "0.16s",
          }}
        >
          Integrated computational, statistical, and mathematical solutions to
          the hardest data-analysis and modeling problems of our day — from
          equation learning to industrial-scale model selection.
        </p>
        <div
          className="reveal"
          style={{
            display: "flex",
            gap: 14,
            marginTop: 40,
            transitionDelay: "0.24s",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => scrollToId("capabilities")}
            style={{
              background: ACCENT,
              color: "#04262d",
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 24px",
              borderRadius: 5,
            }}
          >
            Explore capabilities
          </button>
          <button
            className="btn btn-secondary"
            onClick={openDialog}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: 15,
              padding: "14px 24px",
              borderRadius: 5,
              color: "#e7ecf2",
            }}
          >
            Talk to the founders
          </button>
        </div>
        {/* ridgeline motif */}
        <svg
          viewBox="0 0 1120 120"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: 120,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        >
          <polyline
            className="ridgeline"
            points="0,120 120,64 230,92 360,30 480,78 600,44 730,96 860,40 980,86 1120,58 1120,120"
            fill="none"
            stroke="oklch(0.78 0.13 200 / 0.4)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* metric strip */}
      <div
        id="results"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {[
          ["10⁹", "simultaneous models evaluated in seconds"],
          ["seconds", "parameter estimation, not hours"],
          ["PhD", "research-grade methods, production-ready"],
        ].map(([big, small], i) => (
          <div
            key={i}
            className="metric reveal"
            style={{
              padding: "30px 44px",
              borderRight:
                i < 2 ? "1px solid rgba(255,255,255,0.08)" : undefined,
              transitionDelay: `${i * 0.08}s`,
            }}
          >
            <div
              className="metric-big"
              style={{
                ...mono,
                fontSize: 34,
                fontWeight: 600,
                color: ACCENT_BRIGHT,
              }}
            >
              {big}
            </div>
            <div style={{ fontSize: 14, color: "#9aa5b1", marginTop: 6 }}>
              {small}
            </div>
          </div>
        ))}
      </div>

      {/* capabilities */}
      <div id="capabilities" style={{ padding: "72px 44px" }}>
        <div
          className="reveal"
          style={{
            ...mono,
            fontSize: 13,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6d7885",
            marginBottom: 10,
          }}
        >
          / capabilities
        </div>
        <h2
          className="reveal"
          style={{
            ...grotesk,
            fontWeight: 700,
            fontSize: 34,
            letterSpacing: "-0.02em",
            margin: "0 0 40px",
            transitionDelay: "0.06s",
          }}
        >
          What we build
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {caps.map((c, i) => (
            <div
              key={c.n}
              className="cap-card reveal"
              style={{
                background: "#0d1116",
                padding: "30px 30px 34px",
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              <div
                className="cap-num"
                style={{ ...mono, fontSize: 13, color: ACCENT, marginBottom: 14 }}
              >
                {c.n}
              </div>
              <div
                style={{
                  ...grotesk,
                  fontWeight: 600,
                  fontSize: 21,
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                {c.title}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "#9aa5b1" }}>
                {c.blurb}
              </div>
            </div>
          ))}
          <div
            className="cap-card reveal"
            style={{
              background: "#0d1116",
              padding: 30,
              display: "flex",
              alignItems: "center",
              transitionDelay: `${caps.length * 0.06}s`,
            }}
          >
            <div style={{ fontSize: 15, lineHeight: 1.6, color: "#6d7885" }}>
              Every engagement is a bespoke mathematical model — not an
              off-the-shelf tool.
            </div>
          </div>
        </div>
      </div>

      {/* team */}
      <div id="team" style={{ padding: "0 44px 72px" }}>
        <div
          className="reveal"
          style={{
            ...mono,
            fontSize: 13,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6d7885",
            marginBottom: 10,
          }}
        >
          / team
        </div>
        <h2
          className="reveal"
          style={{
            ...grotesk,
            fontWeight: 700,
            fontSize: 34,
            letterSpacing: "-0.02em",
            margin: "0 0 40px",
            transitionDelay: "0.06s",
          }}
        >
          Founded by applied mathematicians
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
          }}
        >
          {team.map((p, i) => (
            <div
              key={p.name}
              className="team-card reveal"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 6,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <div
                className="headshot"
                style={{
                  width: 64,
                  height: 64,
                  flexShrink: 0,
                  borderRadius: 5,
                  background:
                    "repeating-linear-gradient(135deg,#1a2028,#1a2028 6px,#141a20 6px,#141a20 12px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...mono,
                  fontSize: 10,
                  color: "#5a6572",
                }}
              >
                headshot
              </div>
              <div>
                <div style={{ ...grotesk, fontWeight: 600, fontSize: 19 }}>
                  {p.name}
                </div>
                <div
                  style={{ fontSize: 13, color: ACCENT, margin: "3px 0 10px" }}
                >
                  {p.role}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#8b95a1",
                    lineHeight: 1.55,
                  }}
                >
                  {p.bio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* industries */}
      <div
        id="industries"
        style={{
          padding: "56px 44px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "#0c1015",
        }}
      >
        <div
          className="reveal"
          style={{
            ...mono,
            fontSize: 13,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6d7885",
            marginBottom: 22,
          }}
        >
          / industries served
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {industries.map((ind, i) => (
            <div
              key={ind}
              className="pill reveal"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 100,
                padding: "9px 18px",
                fontSize: 14,
                color: "#cdd5de",
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              {ind}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        id="contact"
        style={{ padding: "80px 44px", textAlign: "center", position: "relative" }}
      >
        <h2
          className="reveal"
          style={{
            ...grotesk,
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: "-0.025em",
            margin: "0 auto",
            maxWidth: 640,
            lineHeight: 1.08,
          }}
        >
          Have a problem worth modeling?
        </h2>
        <p
          className="reveal"
          style={{
            fontSize: 17,
            color: "#aab3bf",
            margin: "20px auto 34px",
            maxWidth: 520,
            transitionDelay: "0.08s",
          }}
        >
          Tell us what you&apos;re trying to predict, estimate, or discover.
          We&apos;ll tell you how we&apos;d approach it.
        </p>
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            transitionDelay: "0.16s",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={openDialog}
            style={{
              ...mono,
              background: ACCENT,
              color: "#04262d",
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 26px",
              borderRadius: 5,
            }}
          >
            Get in touch
          </button>
        </div>
      </div>

      {/* footer */}
      <div
        style={{
          padding: "24px 44px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          ...mono,
          fontSize: 12,
          color: "#5a6572",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>© 2026 Boulder Computational Solutions</span>
        <span>Boulder, Colorado</span>
      </div>

      {/* contact dialog */}
      {dialogOpen && (
        <div
          className="dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          onClick={() => setDialogOpen(false)}
        >
          <div className="dialog-card" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 8,
              }}
            >
              <div>
                <div
                  style={{
                    ...mono,
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    marginBottom: 8,
                  }}
                >
                  / get in touch
                </div>
                <h3
                  id="dialog-title"
                  style={{
                    ...grotesk,
                    fontWeight: 700,
                    fontSize: 24,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  Talk to the founders
                </h3>
              </div>
              <button
                className="dialog-close"
                onClick={() => setDialogOpen(false)}
                aria-label="Close dialog"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "#9aa5b1",
                margin: "6px 0 22px",
              }}
            >
              Reach out to any of us directly. Tell us what you&apos;re trying to
              predict, estimate, or discover — we&apos;ll tell you how we&apos;d
              approach it.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {team.map((p) => (
                <div key={p.email} className="contact-row">
                  <a
                    href={`mailto:${p.email}`}
                    style={{ display: "block", minWidth: 0 }}
                  >
                    <div
                      style={{
                        ...grotesk,
                        fontWeight: 600,
                        fontSize: 15,
                        color: "#e7ecf2",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        ...mono,
                        fontSize: 12,
                        color: "#9aa5b1",
                        marginTop: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.email}
                    </div>
                  </a>
                  <button
                    className={`copy-btn${copied === p.email ? " copied" : ""}`}
                    onClick={() => copyEmail(p.email)}
                  >
                    {copied === p.email ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
