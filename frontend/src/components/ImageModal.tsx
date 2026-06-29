/**
 * ImageModal — Fullscreen viewer với A/B compare, zoom, pan
 * Port từ ArchViz AI (code_flow_gui) — thay thế ResultViewer
 */
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "../api/client";

interface MediaRef {
  mediaId: string;
  label?: string;
}

interface Props {
  /** null = đóng modal */
  data: {
    current: MediaRef;
    original?: MediaRef;
    nodeTitle?: string;
  } | null;
  onClose(): void;
}

type ViewMode = "A" | "B" | "compare";

export function ImageModal({ data, onClose }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("B");
  const [compareValue, setCompareValue] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  const compareRef = useRef<HTMLDivElement>(null);

  // Reset khi mở ảnh mới
  useEffect(() => {
    if (data) {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setViewMode(data.original ? "compare" : "B");
      setCompareValue(50);
    }
  }, [data?.current.mediaId]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!data) return null;

  const { current, original, nodeTitle } = data;

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const next = Math.min(Math.max(0.5, zoom * delta), 10);
    setZoom(next);
    if (next === 1) setOffset({ x: 0, y: 0 });
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (zoom > 1) {
      setIsDragging(true);
      setLastMouse({ x: e.clientX, y: e.clientY });
    }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setOffset((prev) => ({
        x: prev.x + (e.clientX - lastMouse.x),
        y: prev.y + (e.clientY - lastMouse.y),
      }));
      setLastMouse({ x: e.clientX, y: e.clientY });
    }
    // Compare slider theo chuột
    if (viewMode === "compare" && compareRef.current && !isDragging) {
      const rect = compareRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setCompareValue(Math.min(Math.max(0, (x / rect.width) * 100), 100));
    }
  }

  function renderImg(id: string, cls = "") {
    return (
      <img
        src={mediaUrl(id)}
        className={`w-full h-full object-contain select-none ${cls}`}
        draggable={false}
        alt=""
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(0,0,0,0.97)",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
      onClick={onClose}
      onWheel={handleWheel}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          height: 64,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "var(--text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            ✕
          </button>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#D4AF37", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Phóng đại & Xem lại
            </div>
            {nodeTitle && (
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                {nodeTitle}
              </div>
            )}
          </div>
        </div>

        {/* Zoom info */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
          <span style={{ color: "#D4AF37", fontWeight: 700 }}>{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}
            style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", cursor: "pointer", background: "none", border: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div
        ref={compareRef}
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: zoom > 1 ? "move" : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transition: isDragging ? "none" : "transform 60ms ease",
            width: "82%",
            height: "82%",
            position: "relative",
          }}
        >
          {/* Ảnh B (result) */}
          {viewMode === "B" && renderImg(current.mediaId)}

          {/* Ảnh A (original) */}
          {viewMode === "A" && original && renderImg(original.mediaId)}

          {/* Compare mode */}
          {viewMode === "compare" && original && (
            <>
              {/* Ảnh gốc full */}
              <div style={{ position: "absolute", inset: 0 }}>
                {renderImg(original.mediaId, "opacity-60 grayscale")}
              </div>
              {/* Ảnh result — clip bên phải */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  clipPath: `inset(0 ${100 - compareValue}% 0 0)`,
                }}
              >
                {renderImg(current.mediaId)}
              </div>
              {/* Divider line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "#D4AF37",
                  boxShadow: "0 0 16px rgba(212,175,55,0.7)",
                  left: `${compareValue}%`,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#D4AF37",
                    border: "3px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  ↔
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Mode bar ── */}
      <div
        style={{
          height: 80,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          flexShrink: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 4,
            gap: 4,
          }}
        >
          <ModeBtn label="ẢNH GỐC" active={viewMode === "A"} disabled={!original} onClick={() => original && setViewMode("A")} />
          <ModeBtn label="KẾT QUẢ" active={viewMode === "B"} onClick={() => setViewMode("B")} />
          <ModeBtn label="SO SÁNH" active={viewMode === "compare"} disabled={!original} onClick={() => original && setViewMode("compare")} />
        </div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 6, position: "absolute", bottom: 12, textTransform: "uppercase", letterSpacing: "0.2em" }}>
          Lăn chuột để zoom · Kéo để di chuyển · ESC thoát
        </div>
      </div>
    </div>
  );
}

function ModeBtn({ label, active, disabled, onClick }: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick(): void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 20px",
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        background: active ? "#D4AF37" : "transparent",
        color: active ? "#000" : disabled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
