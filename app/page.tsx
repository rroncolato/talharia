import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talharia — Arte Sacra em 3D",
  description: "Arte sacra cristã contemporânea, impressa em 3D com cuidado artesanal. Em breve em talharia.com.br",
};

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #0D0C0A;
          min-height: 100vh;
          font-family: 'Jost', sans-serif;
        }
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          gap: 32px;
        }
        .logo {
          width: 200px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 100px;
          border: 1px solid rgba(201,130,68,0.35);
          background: rgba(201,130,68,0.08);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #C98244;
          text-transform: uppercase;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C98244;
          animation: pulse 2s ease-in-out infinite;
        }
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
          transition: all 0.2s ease;
        }
        .instagram:hover {
          border-color: rgba(201,130,68,0.6);
          background: rgba(201,130,68,0.12);
          color: #F2EAD8;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <main className="page">
        <img src="/logo-light-vertical.svg" alt="Talharia" className="logo" />

        <div className="badge">
          <span className="badge-dot" />
          Site em breve
        </div>

        <a
          href="https://instagram.com/talhariaoficial"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C98244" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="#C98244" stroke="none"/>
          </svg>
          @talhariaoficial
        </a>
      </main>
    </>
  );
}
