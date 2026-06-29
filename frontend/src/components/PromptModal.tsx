/**
 * PromptModal — Paste prompt thủ công, tạo node Render mới
 */
import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onAccept(text: string): void;
  onCancel(): void;
}

export function PromptModal({ isOpen, onAccept, onCancel }: Props) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setValue("");
      setTimeout(() => ref.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Backdrop */}
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16 }}>✦</span>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text)" }}>
              Dán Prompt Thủ Công
            </span>
          </div>
          <button
            onClick={onCancel}
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 18 }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
            Nhập hoặc dán đoạn prompt kiến trúc vào đây. Một node Render mới sẽ được tạo tự động.
          </p>
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Dán prompt tại đây..."
            rows={6}
            style={{
              width: "100%",
              background: "var(--panel-high)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 13,
              color: "var(--text)",
              outline: "none",
              resize: "none",
              fontFamily: "inherit",
              lineHeight: 1.6,
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--panel-high)",
                color: "var(--muted)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
              }}
            >
              Hủy bỏ
            </button>
            <button
              onClick={() => value.trim() && onAccept(value.trim())}
              disabled={!value.trim()}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                border: "none",
                background: value.trim() ? "#D4AF37" : "rgba(212,175,55,0.2)",
                color: value.trim() ? "#000" : "rgba(255,255,255,0.2)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: value.trim() ? "pointer" : "not-allowed",
                transition: "all 0.15s",
              }}
            >
              Tạo Node Render
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
