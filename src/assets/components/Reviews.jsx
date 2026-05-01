import { useState, useEffect, useRef } from "react";

const reviews = [
  {
    id: 1,
    name: "Amara O.",
    rating: 5,
    text: "Absolutely exceptional service. The attention to detail was unmatched and delivery was faster than expected.",
    date: "March 2025",
  },
  {
    id: 2,
    name: "James K.",
    rating: 4,
    text: "Great experience overall. The team was professional and the quality of work exceeded my expectations.",
    date: "February 2025",
  },
  {
    id: 3,
    name: "Sofia R.",
    rating: 5,
    text: "Phenomenal. I've used many services but this one stands out completely. Will definitely be returning.",
    date: "January 2025",
  },
  {
    id: 4,
    name: "David M.",
    rating: 4,
    text: "Very smooth process from start to finish. Communication was clear and the results speak for themselves.",
    date: "December 2024",
  },
  {
    id: 5,
    name: "Chidinma E.",
    rating: 5,
    text: "Top-tier quality. You can feel the care that went into every step. Highly recommend to anyone looking for the best.",
    date: "November 2024",
  },
];

const StarRating = ({ rating, max = 5 }) => {
  return (
    <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? "#ec4899" : "none"}
          stroke={i < rating ? "#ec4899" : "#555"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
};

export default function Reviews({ darkMode }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const intervalRef = useRef(null);

  const total = reviews.length;

  const goTo = (index, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo((current + 1) % total, "next");
  const prev = () => goTo((current - 1 + total) % total, "prev");

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const bg = darkMode ? "#000" : "#f5f5f5";
  const cardBg = darkMode ? "#111" : "#fff";
  const border = darkMode ? "#222" : "#e5e5e5";
  const textPrimary = darkMode ? "#fff" : "#111";
  const textSecondary = darkMode ? "#888" : "#666";

  const review = reviews[current];

  return (
    <section
      style={{
        background: bg,
        padding: "5rem 1.5rem",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p
          style={{
            color: "#ec4899",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            fontFamily: "monospace",
          }}
        >
          What people say
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "bold",
            color: textPrimary,
            margin: 0,
          }}
        >
          Client Reviews
        </h2>
      </div>

      {/* Review number indicator */}
      <p
        style={{
          textAlign: "center",
          color: textSecondary,
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          fontFamily: "monospace",
          marginBottom: "2rem",
        }}
      >
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      {/* Card */}
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: "4px",
            padding: "2.5rem",
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "next" ? "-30px" : "30px"})`
              : "translateX(0)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* Large quote mark */}
          <div
            style={{
              fontSize: "5rem",
              lineHeight: 1,
              color: "#ec4899",
              opacity: 0.2,
              marginBottom: "-1.5rem",
              fontFamily: "Georgia, serif",
            }}
          >
            "
          </div>

          <StarRating rating={review.rating} />

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: textPrimary,
              margin: "0 0 2rem 0",
              fontStyle: "italic",
            }}
          >
            {review.text}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${border}`,
              paddingTop: "1.25rem",
            }}
          >
            <div>
              <p
                style={{
                  color: textPrimary,
                  fontWeight: "bold",
                  margin: 0,
                  fontSize: "0.95rem",
                  fontFamily: "sans-serif",
                }}
              >
                {review.name}
              </p>
              <p
                style={{
                  color: textSecondary,
                  fontSize: "0.75rem",
                  margin: "2px 0 0",
                  fontFamily: "monospace",
                }}
              >
                {review.date}
              </p>
            </div>

            {/* Rating number badge */}
            <div
              style={{
                background: "#ec4899",
                color: "#fff",
                borderRadius: "4px",
                padding: "4px 10px",
                fontSize: "0.85rem",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              {review.rating}.0 / 5
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <button
            onClick={prev}
            style={{
              background: "transparent",
              border: `1px solid ${border}`,
              color: textPrimary,
              width: "44px",
              height: "44px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ec4899";
              e.currentTarget.style.color = "#ec4899";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = border;
              e.currentTarget.style.color = textPrimary;
            }}
          >
            ←
          </button>

          {/* Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: i === current ? "#ec4899" : border,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{
              background: "transparent",
              border: `1px solid ${border}`,
              color: textPrimary,
              width: "44px",
              height: "44px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ec4899";
              e.currentTarget.style.color = "#ec4899";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = border;
              e.currentTarget.style.color = textPrimary;
            }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
