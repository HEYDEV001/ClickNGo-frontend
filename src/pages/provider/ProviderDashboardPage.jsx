import { useNavigate } from "react-router-dom";

export default function ProviderDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ background: "var(--black)" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "clamp(24px,4vw,40px) clamp(16px,4vw,48px)",
        }}
      >
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Provider Dashboard
        </div>
        <p style={{ color: "var(--gray-mid)", fontSize: 14, marginBottom: 32 }}>
          Welcome to your business dashboard. More features coming soon.
        </p>

        <div
          className="glass-card animate-fade-up"
          style={{
            padding: 48,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>DB</div>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Your listing is under review</div>
          <div style={{ fontSize: 14, color: "var(--gray-text)", marginBottom: 24 }}>
            We'll notify you once your business is approved. In the meantime, you can update your profile.
          </div>
          <button className="btn btn-yellow" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
