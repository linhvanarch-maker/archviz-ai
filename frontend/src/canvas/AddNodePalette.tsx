import { useReactFlow } from "@xyflow/react";
import { useBoardStore } from "../store/board";
import type { NodeType } from "../store/board";

interface Chip {
  type: NodeType;
  icon: string;
  label: string;
  group: "archviz" | "flow";
}

// ── ArchViz AI node palette ──────────────────────────────────────────────────
// Nhóm ArchViz: các node đặc thù cho kiến trúc Việt Nam
// Nhóm Flow: các node kế thừa từ Flowboard
const CHIPS: Chip[] = [
  // ArchViz AI nodes
  { type: "source",   icon: "◈", label: "Source",   group: "archviz" },
  { type: "render",   icon: "⬡", label: "Render",   group: "archviz" },
  { type: "material", icon: "◉", label: "Material",  group: "archviz" },
  { type: "camera",   icon: "⊡", label: "Camera",   group: "archviz" },
  { type: "panorama", icon: "◯", label: "Panorama",  group: "archviz" },
  // Flow nodes (kế thừa)
  { type: "character",    icon: "◎", label: "Character",    group: "flow" },
  { type: "image",        icon: "▣", label: "Image",        group: "flow" },
  { type: "Storyboard",  icon: "▦", label: "Storyboard",   group: "flow" },
  { type: "video",        icon: "▶", label: "Video",        group: "flow" },
  { type: "visual_asset", icon: "◇", label: "Visual Asset", group: "flow" },
  { type: "prompt",       icon: "✦", label: "Prompt",       group: "flow" },
  { type: "note",         icon: "✎", label: "Note",         group: "flow" },
];

export function AddNodePalette() {
  const { screenToFlowPosition } = useReactFlow();
  const addNodeOfType = useBoardStore((s) => s.addNodeOfType);

  function handleAdd(type: NodeType) {
    const position = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    addNodeOfType(type, position);
  }

  const archvizChips = CHIPS.filter((c) => c.group === "archviz");
  const flowChips = CHIPS.filter((c) => c.group === "flow");

  return (
    <div className="add-node-palette" aria-label="Add node">
      <span className="add-node-plus" aria-hidden="true">+</span>

      {/* ArchViz AI nodes — nhóm chính */}
      <span className="add-node-group-label">ArchViz</span>
      {archvizChips.map((chip) => (
        <button
          key={chip.type}
          className="add-node-chip add-node-chip--archviz"
          aria-label={`Add ${chip.label} node`}
          onClick={() => handleAdd(chip.type)}
        >
          <span aria-hidden="true">{chip.icon}</span>
          {chip.label}
        </button>
      ))}

      <span className="add-node-divider" aria-hidden="true" />

      {/* Flow nodes — kế thừa */}
      <span className="add-node-group-label add-node-group-label--muted">Flow</span>
      {flowChips.map((chip) => (
        <button
          key={chip.type}
          className="add-node-chip"
          aria-label={`Add ${chip.label} node`}
          onClick={() => handleAdd(chip.type)}
        >
          <span aria-hidden="true">{chip.icon}</span>
          {chip.label}
        </button>
      ))}
    </div>
  );
}
