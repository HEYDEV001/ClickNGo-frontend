import { useSearchParams, useNavigate } from "react-router-dom";
import ProviderRow from "../components/common/ProviderRow";
import { CATEGORIES, PROVIDERS } from "../data/appData";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const q = query.toLowerCase();
  const results = [];
  for (const [catId, list] of Object.entries(PROVIDERS)) {
    list.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        (p.sub || "").toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({ ...p, catId });
      }
    });
  }

  return (
    <div className="page" style={{ background: "var(--black)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,48px)" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "var(--gray-text)" }}>Search results for</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          "{query}"
        </div>
        <div style={{ fontSize: 13, color: "var(--gray-mid)", marginBottom: 32 }}>
          {results.length} result{results.length !== 1 ? "s" : ""} found
        </div>

        {results.length === 0 ? (
          <div className="glass-card" style={{ padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>NA</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>No results found</div>
            <div style={{ fontSize: 13, color: "var(--gray-text)", marginBottom: 20 }}>
              Try searching for "Salon", "Dental", "Gaming" etc.
            </div>
            <button
              className="btn btn-yellow"
              style={{ fontSize: 13, padding: "10px 24px" }}
              onClick={() => navigate("/")}
            >
              Go Home
            </button>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              overflow: "hidden",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {results.map((p, i) => {
              const cat = CATEGORIES.find((c) => c.id === p.catId);
              return (
                <div key={p.id}>
                  <ProviderRow p={p} onClick={() => navigate(`/detail/${p.id}`)} accentColor={cat?.color} />
                  {i < results.length - 1 && (
                    <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 20px" }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
