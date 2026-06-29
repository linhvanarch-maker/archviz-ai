/**
 * ArchVizSidebar — Panel bên phải chứa:
 *   1. Node settings (prompt, engine, aspect ratio)
 *   2. TRANSFORM_TOOLS — 7 categories, 40+ presets
 *   3. CHIPS — Vật liệu kiến trúc Việt Nam
 *   4. Quick actions (Branch, Rearrange)
 */
import { useState } from "react";
import { useBoardStore } from "../store/board";
import { useGenerationStore } from "../store/generation";
import { TRANSFORM_TOOLS, CHIPS } from "../constants/archviz";

type Tab = "tools" | "materials";

const S = {
  sidebar: {
    width: 280,
    background: "var(--panel)",
    borderLeft: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column" as const,
    height: "100vh",
    overflow: "hidden",
    flexShrink: 0,
  },
  header: {
    padding: "14px 16px 10px",
    borderBottom: "1px solid var(--border)",
    flexShrink: 0,
  },
  wordmark: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "var(--text)",
  },
  wordmarkAccent: { color: "var(--accent)" },
  scroll: {
    flex: 1,
    overflowY: "auto" as const,
    scrollbarWidth: "thin" as const,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#D4AF37",
    opacity: 0.7,
    padding: "14px 14px 6px",
  },
  tabBar: {
    display: "flex",
    borderBottom: "1px solid var(--border)",
    flexShrink: 0,
  },
  tab: (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "9px 0",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textAlign: "center",
    cursor: "pointer",
    border: "none",
    background: "none",
    color: active ? "var(--text)" : "var(--muted)",
    borderBottom: active ? "2px solid #D4AF37" : "2px solid transparent",
    transition: "all 0.15s",
  }),
};

export function ArchVizSidebar() {
  const [tab, setTab] = useState<Tab>("tools");
  const [openCategory, setOpenCategory] = useState<string | null>(TRANSFORM_TOOLS[0].category);
  const [openChipGroup, setOpenChipGroup] = useState<string | null>("exterior");

  const selectedRfId = useBoardStore((s) => s.nodes.find((n) => n.selected)?.id ?? null);
  const selectedNode = useBoardStore((s) => s.nodes.find((n) => n.selected));
  const openGenerationDialog = useGenerationStore((s) => s.openGenerationDialog);

  function applyTool(intent: string) {
    if (!selectedRfId || !selectedNode) return;
    const basePrompt = (selectedNode.data.prompt as string) || "";
    const combined = basePrompt ? `${basePrompt}, ${intent}` : intent;
    openGenerationDialog(selectedRfId, combined);
  }

  function applyChip(prompt: string) {
    if (!selectedRfId || !selectedNode) return;
    const base = (selectedNode.data.prompt as string) || "";
    const combined = base ? `${base}, ${prompt}` : prompt;
    openGenerationDialog(selectedRfId, combined);
  }

  return (
    <div style={S.sidebar}>
      {/* ── Header ── */}
      <div style={S.header}>
        <div style={S.wordmark}>
          ArchViz <span style={S.wordmarkAccent}>AI</span>
        </div>
        {selectedNode ? (
          <div style={{ marginTop: 6, fontSize: 11, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#D4AF37" }}>◈</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {(selectedNode.data.title as string) || "Untitled node"}
            </span>
          </div>
        ) : (
          <div style={{ marginTop: 6, fontSize: 11, color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>
            Chọn một node để áp dụng
          </div>
        )}
      </div>

      {/* ── Tab bar ── */}
      <div style={S.tabBar}>
        <button style={S.tab(tab === "tools")} onClick={() => setTab("tools")}>
          ⚡ Tools
        </button>
        <button style={S.tab(tab === "materials")} onClick={() => setTab("materials")}>
          🏛 Vật liệu
        </button>
      </div>

      {/* ── Content ── */}
      <div style={S.scroll}>
        {tab === "tools" ? (
          <ToolsPanel
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
            onApply={applyTool}
            disabled={!selectedRfId}
          />
        ) : (
          <MaterialsPanel
            openGroup={openChipGroup}
            setOpenGroup={setOpenChipGroup}
            onApply={applyChip}
            disabled={!selectedRfId}
          />
        )}
      </div>
    </div>
  );
}

// ── Transform Tools panel ──────────────────────────────────────────────────
function ToolsPanel({ openCategory, setOpenCategory, onApply, disabled }: {
  openCategory: string | null;
  setOpenCategory(c: string | null): void;
  onApply(intent: string): void;
  disabled: boolean;
}) {
  return (
    <div style={{ paddingBottom: 20 }}>
      {disabled && (
        <div style={{
          margin: "10px 14px",
          padding: "8px 12px",
          borderRadius: 8,
          background: "rgba(212,175,55,0.08)",
          border: "1px solid rgba(212,175,55,0.2)",
          fontSize: 11,
          color: "rgba(212,175,55,0.7)",
        }}>
          Chọn node trên canvas để áp dụng tool
        </div>
      )}
      {TRANSFORM_TOOLS.map((cat) => {
        const isOpen = openCategory === cat.category;
        return (
          <div key={cat.category}>
            {/* Category header */}
            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 14px",
                background: isOpen ? "rgba(212,175,55,0.06)" : "none",
                border: "none",
                borderTop: "1px solid var(--border)",
                cursor: "pointer",
                color: isOpen ? "#D4AF37" : "var(--muted)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textAlign: "left",
              }}
              onClick={() => setOpenCategory(isOpen ? null : cat.category)}
            >
              <span>{cat.category}</span>
              <span style={{ opacity: 0.5 }}>{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* Items */}
            {isOpen && (
              <div style={{ padding: "6px 10px 10px", display: "flex", flexWrap: "wrap", gap: 5 }}>
                {cat.items.map((item) => (
                  <button
                    key={item.label}
                    disabled={disabled}
                    title={item.intent.slice(0, 120) + "…"}
                    onClick={() => onApply(item.intent)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 10px",
                      borderRadius: 20,
                      border: "1px solid var(--border)",
                      background: "var(--panel-high)",
                      color: disabled ? "var(--muted)" : "var(--text)",
                      fontSize: 11,
                      cursor: disabled ? "not-allowed" : "pointer",
                      transition: "all 0.12s",
                      opacity: disabled ? 0.5 : 1,
                      whiteSpace: "nowrap",
                    }}
                    onMouseOver={(e) => {
                      if (!disabled) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#D4AF37";
                        (e.currentTarget as HTMLButtonElement).style.color = "#D4AF37";
                      }
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Materials panel ────────────────────────────────────────────────────────
function MaterialsPanel({ openGroup, setOpenGroup, onApply, disabled }: {
  openGroup: string | null;
  setOpenGroup(g: string | null): void;
  onApply(prompt: string): void;
  disabled: boolean;
}) {
  return (
    <div style={{ paddingBottom: 20 }}>
      {disabled && (
        <div style={{
          margin: "10px 14px",
          padding: "8px 12px",
          borderRadius: 8,
          background: "rgba(212,175,55,0.08)",
          border: "1px solid rgba(212,175,55,0.2)",
          fontSize: 11,
          color: "rgba(212,175,55,0.7)",
        }}>
          Chọn node để áp dụng vật liệu vào prompt
        </div>
      )}
      {Object.entries(CHIPS).map(([key, group]) => {
        const isOpen = openGroup === key;
        return (
          <div key={key}>
            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 14px",
                background: isOpen ? "rgba(212,175,55,0.06)" : "none",
                border: "none",
                borderTop: "1px solid var(--border)",
                cursor: "pointer",
                color: isOpen ? "#D4AF37" : "var(--muted)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textAlign: "left",
              }}
              onClick={() => setOpenGroup(isOpen ? null : key)}
            >
              <span>{group.label}</span>
              <span style={{ opacity: 0.5 }}>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
              <div style={{ padding: "6px 10px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                {group.items.map((chip) => (
                  <button
                    key={chip.label}
                    disabled={disabled}
                    onClick={() => onApply(chip.prompt)}
                    title={chip.prompt.slice(0, 120) + "…"}
                    style={{
                      padding: "7px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "var(--panel-high)",
                      color: disabled ? "var(--muted)" : "var(--text)",
                      fontSize: 11,
                      cursor: disabled ? "not-allowed" : "pointer",
                      textAlign: "left",
                      transition: "all 0.12s",
                      opacity: disabled ? 0.5 : 1,
                    }}
                    onMouseOver={(e) => {
                      if (!disabled) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#D4AF37";
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.08)";
                      }
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--panel-high)";
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Footer hint */}
      <div style={{ padding: "16px 14px 0", fontSize: 9, color: "rgba(255,255,255,0.2)", lineHeight: 1.6 }}>
        Nhấn vào vật liệu để thêm vào prompt của node đang chọn
      </div>
    </div>
  );
}
