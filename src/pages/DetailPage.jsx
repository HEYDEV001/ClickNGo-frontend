import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/common/StarRating";
import ReviewCard from "../components/common/ReviewCard";
import { CATEGORIES, PROVIDERS, REVIEWS, MONTHS, DAYS_SHORT, getSlots } from "../data/appData";
import { useAppContext } from "../context/AppContext";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { location } = useAppContext();
  const providerId = parseInt(id, 10);

  let provider = null;
  let catId = null;
  for (const [cid, list] of Object.entries(PROVIDERS)) {
    const found = list.find((p) => p.id === providerId);
    if (found) {
      provider = found;
      catId = cid;
      break;
    }
  }
  if (!provider) return null;
  const cat = CATEGORIES.find((c) => c.id === catId);

  const [selService, setSelService] = useState(provider.tags[0]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState(null);

  const slots = getSlots(selDate);
  const hasAny = slots.some((s) => s.a);

  function changeMonth(d) {
    let m = calMonth + d,
      y = calYear;
    if (m > 11) {
      m = 0;
      y++;
    }
    if (m < 0) {
      m = 11;
      y--;
    }
    setCalMonth(m);
    setCalYear(y);
    setSelDate(null);
    setSelTime(null);
  }

  function confirmBooking() {
    if (!selDate || !selTime) return;
    const params = new URLSearchParams({
      providerId: provider.id,
      time: selTime,
      service: selService,
    });
    navigate(`/confirm?${params.toString()}`);
  }

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const isCurrentMonth = calYear === today.getFullYear() && calMonth === today.getMonth();

  return (
    <div className="page" style={{ background: "var(--black)" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(20px,4vw,32px) clamp(16px,4vw,48px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              fontSize: 13,
              color: "var(--gray-text)",
              marginBottom: 24,
            }}
          >
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Home
            </span>
            <span>›</span>
            <span style={{ cursor: "pointer" }} onClick={() => navigate(`/category/${catId}`)}>
              {cat?.label}
            </span>
            <span>›</span>
            <span style={{ color: "var(--white)" }}>{provider.name}</span>
          </div>

          <div className="glass-card animate-fade-up" style={{ marginBottom: 20 }}>
            <div
              style={{
                padding: "28px 28px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: cat?.bg,
                  border: `1px solid ${cat?.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  flexShrink: 0,
                }}
              >
                {provider.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 26,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {provider.name}
                </div>
                <StarRating rating={provider.rating} count={provider.reviews} />
                <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 13,
                      color: "var(--gray-mid)",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    {location} · {provider.dist}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 13,
                      color: "var(--gray-mid)",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {provider.time}
                  </div>
                </div>
              </div>
              {provider.price > 0 && (
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--gray-mid)" }}>starting from</div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 28,
                      fontWeight: 700,
                      color: "var(--yellow)",
                    }}
                  >
                    ₹{provider.price}
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: 14, color: "var(--gray-mid)", lineHeight: 1.75 }}>
                We are a full-service {cat?.label} studio bringing premium quality to your doorstep. Our experienced team
                uses top-grade equipment and follows the highest standards to ensure you walk out completely satisfied.
                Instant booking, secure payment, and real-time availability — all in one place.
              </p>
            </div>
            <div style={{ padding: "20px 28px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Select a Service</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {provider.tags.map((tag) => (
                  <div
                    key={tag}
                    className={`chip${selService === tag ? " active" : ""}`}
                    onClick={() => setSelService(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="glass-card animate-fade-up"
            style={{ animationDelay: ".15s", padding: 24 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div style={{ fontWeight: 700 }}>Recent Reviews</div>
              <button
                className="btn btn-glass"
                style={{ fontSize: 12, padding: "6px 14px" }}
                onClick={() => navigate("/reviews")}
              >
                View All
              </button>
            </div>
            {REVIEWS.slice(0, 2).map((r, i) => (
              <ReviewCard key={i} r={r} i={i} compact />
            ))}
          </div>
        </div>

        <div
          className="glass-card animate-fade-up"
          style={{ animationDelay: ".1s", position: "sticky", top: 80, overflow: "hidden" }}
        >
          <div
            style={{
              padding: "18px 20px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700 }}>Pick a Date & Time</div>
            <div style={{ fontSize: 12, color: "var(--gray-text)", marginTop: 2 }}>
              Real-time availability · Instant confirmation
            </div>
          </div>

          <div style={{ padding: "16px 16px 8px" }}>
            <div className="cal-nav">
              <button
                className="cal-arrow"
                disabled={isCurrentMonth}
                onClick={() => changeMonth(-1)}
              >
                ‹
              </button>
              <div className="cal-month-label">
                {MONTHS[calMonth]} {calYear}
              </div>
              <button className="cal-arrow" onClick={() => changeMonth(1)}>
                ›
              </button>
            </div>

            <div className="cal-grid">
              {DAYS_SHORT.map((d) => (
                <div key={d} className="cal-hdr">
                  {d}
                </div>
              ))}
              {Array(firstDay)
                .fill(null)
                .map((_, i) => (
                  <div key={"e" + i} className="cal-day cal-empty" />
                ))}
              {Array(daysInMonth)
                .fill(null)
                .map((_, i) => {
                  const d = i + 1;
                  const date = new Date(calYear, calMonth, d);
                  const isPast = date < today;
                  const isToday = date.getTime() === today.getTime();
                  const isSel = selDate && date.getTime() === selDate.getTime();
                  const hasSl = !isPast && getSlots(date).some((s) => s.a);
                  let cls = "cal-day";
                  if (isPast) cls += " cal-past";
                  if (isToday) cls += " cal-today";
                  if (isSel) cls += " cal-selected";
                  if (hasSl) cls += " cal-has-slots";
                  return (
                    <div
                      key={d}
                      className={cls}
                      onClick={() => !isPast && (setSelDate(date), setSelTime(null))}
                    >
                      {d}
                    </div>
                  );
                })}
            </div>

            <div
              style={{
                display: "flex",
                gap: 14,
                padding: "6px 4px 12px",
                justifyContent: "center",
              }}
            >
              {[
                ["var(--green)", "Available"],
                ["var(--yellow)", "Selected"],
                ["rgba(255,255,255,0.2)", "Past"],
              ].map(([c, l]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11,
                    color: "var(--gray-text)",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                  {l}
                </div>
              ))}
            </div>
          </div>

          {selDate && (
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--gray-mid)",
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Available slots</span>
                <span
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    padding: "2px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                  }}
                >
                  {selDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              {slots.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px 0",
                    fontSize: 13,
                    color: "var(--gray-text)",
                  }}
                >
                  Closed on Sundays
                </div>
              ) : !hasAny ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px 0",
                    fontSize: 13,
                    color: "var(--gray-text)",
                  }}
                >
                  Fully booked for this day
                </div>
              ) : (
                <div className="time-grid">
                  {slots.map((s, i) => (
                    <div
                      key={i}
                      className={`time-slot${s.a ? (selTime === s.t ? " selected" : "") : " unavail"}`}
                      onClick={() => s.a && setSelTime(s.t)}
                    >
                      {s.t}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div
            style={{
              padding: "16px 20px 20px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {selDate && selTime && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                  fontSize: 13,
                  color: "var(--gray-mid)",
                }}
              >
                <span>
                  {selService} · {selDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {selTime}
                </span>
                {provider.price > 0 && (
                  <span style={{ fontWeight: 700, color: "var(--yellow)", fontSize: 15 }}>
                    ₹{provider.price}
                  </span>
                )}
              </div>
            )}
            <button
              className="btn btn-yellow"
              style={{
                width: "100%",
                borderRadius: 12,
                padding: 14,
                fontSize: 14,
                opacity: selDate && selTime ? 1 : 0.4,
                cursor: selDate && selTime ? "pointer" : "not-allowed",
              }}
              disabled={!selDate || !selTime}
              onClick={confirmBooking}
            >
              {selDate && selTime ? "Confirm Booking" : "Select date & time"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
