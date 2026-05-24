import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talharia — Arte Sacra em 3D",
  description: "Arte sacra cristã contemporânea, impressa em 3D com cuidado artesanal. Em breve em talharia.com.br",
  openGraph: {
    title: "Talharia — A fé que toma forma",
    description: "Arte sacra cristã contemporânea, impressa em 3D com cuidado artesanal.",
    siteName: "Talharia",
  },
};

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0D0C0A;
          min-height: 100vh;
          font-family: 'Jost', sans-serif;
          overflow-x: hidden;
        }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          position: relative;
          overflow: hidden;
        }

        /* noise grain overlay */
        .page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }

        /* ambient radial glow */
        .glow-bg {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,130,68,0.12) 0%, rgba(181,107,58,0.06) 40%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          max-width: 480px;
          width: 100%;
        }

        /* illustration */
        .illustration {
          width: 260px;
          height: 320px;
          margin-bottom: -8px;
        }

        /* logo */
        .logo {
          width: 180px;
          margin-bottom: 32px;
        }

        /* badge */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(201,130,68,0.35);
          background: rgba(201,130,68,0.08);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #C98244;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C98244;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        /* tagline */
        .tagline {
          font-size: 32px;
          font-weight: 300;
          color: #F2EAD8;
          letter-spacing: -0.01em;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 8px;
          font-style: italic;
        }

        .tagline strong {
          font-weight: 600;
          font-style: normal;
          color: #C98244;
        }

        .subtitle {
          font-size: 14px;
          color: #6B6460;
          text-align: center;
          margin-bottom: 40px;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        /* divider */
        .divider {
          width: 48px;
          height: 1px;
          background: rgba(201,130,68,0.3);
          margin-bottom: 40px;
        }

        /* instagram */
        .instagram {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 100px;
          border: 1px solid rgba(201,130,68,0.3);
          background: rgba(201,130,68,0.06);
          color: #B8B0A8;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .instagram:hover {
          border-color: rgba(201,130,68,0.6);
          background: rgba(201,130,68,0.12);
          color: #F2EAD8;
          transform: translateY(-1px);
        }

        .instagram svg {
          flex-shrink: 0;
        }

        /* footer */
        .footer {
          position: relative;
          z-index: 1;
          margin-top: 64px;
          font-size: 11px;
          color: #3A3632;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* animations */
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        @keyframes layer-glow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(232,168,85,0.8)); }
          50% { filter: drop-shadow(0 0 14px rgba(232,168,85,1)); }
        }

        @keyframes nozzle-move {
          0%   { transform: translateX(0); }
          25%  { transform: translateX(4px); }
          75%  { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }

        @keyframes filament-draw {
          0%   { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .illus-group {
          animation: float-slow 6s ease-in-out infinite;
        }

        .active-layer {
          animation: layer-glow 1.8s ease-in-out infinite;
        }

        .nozzle-group {
          animation: nozzle-move 1.8s ease-in-out infinite;
        }

        @media (max-width: 480px) {
          .illustration { width: 200px; height: 240px; }
          .logo { width: 150px; }
          .tagline { font-size: 26px; }
        }
      `}</style>

      <main className="page">
        <div className="glow-bg" />

        <div className="content">

          {/* ── ILUSTRAÇÃO 3D PRINTING ──────────────────────── */}
          <svg
            className="illustration"
            viewBox="0 0 260 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* glow filter para camada ativa */}
              <filter id="layerGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* glow suave para outras camadas */}
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* gradiente de camada */}
              <linearGradient id="layerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4915A"/>
                <stop offset="100%" stopColor="#A05228"/>
              </linearGradient>
              {/* gradiente camada ativa */}
              <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0B870"/>
                <stop offset="100%" stopColor="#C98244"/>
              </linearGradient>
              {/* glow radial de base */}
              <radialGradient id="baseGlow" cx="50%" cy="100%" r="50%">
                <stop offset="0%" stopColor="#C98244" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#C98244" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* ── glow de base ── */}
            <ellipse cx="130" cy="290" rx="100" ry="30" fill="url(#baseGlow)"/>

            {/* ── grid da mesa de impressão ── */}
            {Array.from({length: 9}, (_, col) =>
              Array.from({length: 5}, (_, row) => (
                <circle
                  key={`${col}-${row}`}
                  cx={65 + col * 17}
                  cy={274 + row * 8}
                  r="1"
                  fill="#C98244"
                  opacity={0.12 + (4 - row) * 0.04}
                />
              ))
            )}

            {/* ── mesa / plataforma ── */}
            <rect x="60" y="272" width="140" height="3" rx="1.5" fill="#3A3632"/>
            <rect x="55" y="275" width="150" height="2" rx="1" fill="#2A2522"/>

            <g className="illus-group">

              {/* ═══ CAMADAS DA CRUZ (de baixo para cima) ═══ */}
              {/* A cruz: haste vertical + braço horizontal */}
              {/* Haste inferior: 6 camadas */}

              {/* Layer 1 – base da haste */}
              <rect x="111" y="254" width="38" height="9" rx="2" fill="url(#layerGrad)" opacity="0.95" filter="url(#softGlow)"/>
              <rect x="111" y="254" width="38" height="2" rx="1" fill="#E0A060" opacity="0.6"/>

              {/* Layer 2 */}
              <rect x="111" y="242" width="38" height="9" rx="2" fill="url(#layerGrad)" opacity="0.92" filter="url(#softGlow)"/>
              <rect x="111" y="242" width="38" height="2" rx="1" fill="#E0A060" opacity="0.55"/>

              {/* Layer 3 */}
              <rect x="111" y="230" width="38" height="9" rx="2" fill="url(#layerGrad)" opacity="0.88"/>
              <rect x="111" y="230" width="38" height="2" rx="1" fill="#E0A060" opacity="0.5"/>

              {/* Layer 4 – braço horizontal (mais largo) */}
              <rect x="85" y="218" width="90" height="9" rx="2" fill="url(#layerGrad)" opacity="0.90" filter="url(#softGlow)"/>
              <rect x="85" y="218" width="90" height="2" rx="1" fill="#E0A060" opacity="0.6"/>
              {/* detalhe lateral braço */}
              <rect x="85" y="218" width="4" height="9" rx="1" fill="#A05228" opacity="0.5"/>
              <rect x="171" y="218" width="4" height="9" rx="1" fill="#A05228" opacity="0.5"/>

              {/* Layer 5 – braço horizontal */}
              <rect x="85" y="206" width="90" height="9" rx="2" fill="url(#layerGrad)" opacity="0.87" filter="url(#softGlow)"/>
              <rect x="85" y="206" width="90" height="2" rx="1" fill="#E0A060" opacity="0.55"/>
              <rect x="85" y="206" width="4" height="9" rx="1" fill="#A05228" opacity="0.45"/>
              <rect x="171" y="206" width="4" height="9" rx="1" fill="#A05228" opacity="0.45"/>

              {/* Layer 6 – volta para haste */}
              <rect x="111" y="194" width="38" height="9" rx="2" fill="url(#layerGrad)" opacity="0.84"/>
              <rect x="111" y="194" width="38" height="2" rx="1" fill="#E0A060" opacity="0.5"/>

              {/* Layer 7 */}
              <rect x="111" y="182" width="38" height="9" rx="2" fill="url(#layerGrad)" opacity="0.80"/>
              <rect x="111" y="182" width="38" height="2" rx="1" fill="#E0A060" opacity="0.45"/>

              {/* Layer 8 */}
              <rect x="111" y="170" width="38" height="9" rx="2" fill="url(#layerGrad)" opacity="0.76"/>
              <rect x="111" y="170" width="38" height="2" rx="1" fill="#E0A060" opacity="0.4"/>

              {/* Layer 9 – quase no topo */}
              <rect x="111" y="158" width="38" height="9" rx="2" fill="url(#layerGrad)" opacity="0.72"/>
              <rect x="111" y="158" width="38" height="2" rx="1" fill="#E0A060" opacity="0.35"/>

              {/* Layer 10 – CAMADA ATIVA (sendo impressa agora) */}
              <g className="active-layer">
                <rect x="111" y="146" width="38" height="9" rx="2" fill="url(#activeGrad)" filter="url(#layerGlow)"/>
                <rect x="111" y="146" width="38" height="2.5" rx="1" fill="#F5C88A" opacity="0.9"/>
              </g>

              {/* ── BICO EXTRUSOR ── */}
              <g className="nozzle-group">
                {/* filamento descendo */}
                <line x1="130" y1="108" x2="130" y2="146" stroke="#E8A855" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7"
                  style={{ animation: 'filament-draw 1.8s linear infinite' }}
                />
                {/* ponto de deposição */}
                <circle cx="130" cy="146" r="2.5" fill="#F0B870" opacity="0.9"/>

                {/* cabeça do bico — forma trapezoidal */}
                <polygon points="115,108 145,108 140,118 120,118" fill="#2A2522" stroke="#4A4440" strokeWidth="1"/>
                {/* detalhe metálico */}
                <rect x="123" y="108" width="14" height="3" rx="1" fill="#3A3632"/>
                {/* ponta do bico */}
                <polygon points="124,118 136,118 133,126 127,126" fill="#1A1818" stroke="#4A4440" strokeWidth="0.8"/>
                <polygon points="127,126 133,126 131,130 129,130" fill="#C98244" opacity="0.8"/>

                {/* trilho / haste de movimento */}
                <line x1="130" y1="68" x2="130" y2="108" stroke="#2A2522" strokeWidth="3" strokeLinecap="round"/>
                {/* detalhe trilho */}
                <line x1="130" y1="68" x2="130" y2="108" stroke="#4A4440" strokeWidth="1" strokeLinecap="round"/>

                {/* barra horizontal do trilho */}
                <rect x="72" y="64" width="116" height="6" rx="3" fill="#2A2522"/>
                <rect x="72" y="65" width="116" height="2" rx="1" fill="#4A4440" opacity="0.6"/>
                {/* rodas/guias */}
                <circle cx="80" cy="67" r="5" fill="#1A1818" stroke="#4A4440" strokeWidth="1"/>
                <circle cx="80" cy="67" r="2" fill="#3A3632"/>
                <circle cx="180" cy="67" r="5" fill="#1A1818" stroke="#4A4440" strokeWidth="1"/>
                <circle cx="180" cy="67" r="2" fill="#3A3632"/>

                {/* carro do extrusor (sliding carriage) */}
                <rect x="118" y="63" width="24" height="8" rx="2" fill="#252220" stroke="#3A3632" strokeWidth="1"/>
              </g>

              {/* ── HALO SAGRADO (círculo tracejado) ── */}
              <circle cx="130" cy="204" r="78" stroke="#C98244" strokeWidth="0.8"
                strokeDasharray="3 6" opacity="0.18" fill="none"/>
              <circle cx="130" cy="204" r="68" stroke="#C98244" strokeWidth="0.5"
                strokeDasharray="1 8" opacity="0.12" fill="none"/>

            </g>{/* /illus-group */}
          </svg>

          {/* ── LOGO VERTICAL ──────────────────────────────── */}
          <img
            src="/logo-light-vertical.svg"
            alt="Talharia"
            className="logo"
          />

          {/* ── BADGE ──────────────────────────────────────── */}
          <div className="badge">
            <span className="badge-dot"/>
            Site em breve
          </div>

          {/* ── TAGLINE ────────────────────────────────────── */}
          <h1 className="tagline">
            A fé que<br/><strong>toma forma</strong>
          </h1>
          <p className="subtitle">
            Arte sacra cristã contemporânea · impressa em 3D
          </p>

          <div className="divider"/>

          {/* ── INSTAGRAM ──────────────────────────────────── */}
          <a
            href="https://instagram.com/talhariaoficial"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram"
          >
            {/* Instagram icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C98244" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="#C98244" stroke="none"/>
            </svg>
            @talhariaoficial
          </a>

        </div>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <p className="footer">Goiânia · Goiás · Brasil</p>
      </main>
    </>
  );
}
