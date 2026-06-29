import { useEffect, useRef, useState, useCallback } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Board } from "./canvas/Board";
import { AddNodePalette } from "./canvas/AddNodePalette";
import { StatusBar } from "./components/StatusBar";
import { Toolbar } from "./components/Toolbar";
import { ProjectSidebar } from "./components/ProjectSidebar";
import { ReferencesPanel } from "./components/ReferencesPanel";
import { Toaster } from "./components/Toaster";
import { GenerationDialog } from "./components/GenerationDialog";
import { ResultViewer } from "./components/ResultViewer";
import { ForcedSetupGate } from "./components/ForcedSetupGate";
import { ArchVizSidebar } from "./components/ArchVizSidebar";
import { PromptModal } from "./components/PromptModal";
import { useBoardStore } from "./store/board";
import { useReferencesStore } from "./store/references";
import { useGenerationStore } from "./store/generation";

export function App() {
  const loadInitialBoard = useBoardStore((s) => s.loadInitialBoard);
  const loadReferences = useReferencesStore((s) => s.load);
  const loading = useBoardStore((s) => s.loading);
  const boardId = useBoardStore((s) => s.boardId);
  const ran = useRef(false);

  // ── PromptModal state ──
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const addNodeOfType = useBoardStore((s) => s.addNodeOfType);
  const openGenerationDialog = useGenerationStore((s) => s.openGenerationDialog);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    loadInitialBoard();
    void loadReferences();
  }, [loadInitialBoard, loadReferences]);

  // Tạo render node mới từ prompt paste
  const handlePromptAccept = useCallback(
    (text: string) => {
      const position = { x: 300 + Math.random() * 200, y: 200 + Math.random() * 100 };
      addNodeOfType("render", position);
      // Sau khi node tạo xong, tìm node mới nhất và mở dialog
      setTimeout(() => {
        const nodes = useBoardStore.getState().nodes;
        const newest = nodes[nodes.length - 1];
        if (newest) {
          openGenerationDialog(newest.id, text);
        }
      }, 50);
      setPromptModalOpen(false);
    },
    [addNodeOfType, openGenerationDialog],
  );

  return (
    <div className="app" style={{ gridTemplateColumns: "auto 1fr auto" }}>
      {/* ── Trái: Project list ── */}
      <ProjectSidebar />

      {/* ── Giữa: Canvas ── */}
      <ReactFlowProvider>
        <div className="canvas-wrap">
          <Toolbar onOpenPromptModal={() => setPromptModalOpen(true)} />
          {loading && boardId === null ? (
            <div className="canvas-loading">Đang tải board…</div>
          ) : (
            <>
              <Board />
              <AddNodePalette />
            </>
          )}
          <StatusBar />
          <ReferencesPanel />
        </div>
      </ReactFlowProvider>

      {/* ── Phải: ArchViz Tools ── */}
      <ArchVizSidebar />

      {/* ── Overlays ── */}
      <Toaster />
      <GenerationDialog />
      <ResultViewer />
      <ForcedSetupGate />
      <PromptModal
        isOpen={promptModalOpen}
        onAccept={handlePromptAccept}
        onCancel={() => setPromptModalOpen(false)}
      />
    </div>
  );
}
