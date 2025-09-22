"use client";

import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback } from "react";
import { Btn } from "@repo/ui/button";
import { Plus } from "lucide-react";
import SideBar from "@repo/ui/sidebar";
import TriggerBtn from "@repo/ui/TriggerBtn";
import Navbar from "@repo/ui/navbar";
import AddTrigger from "@repo/ui/add-trigger";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  return (
    // <div style={{ width: "100vw", height: "100vh" }}>
    //   <ReactFlow
    //     nodes={nodes}
    //     edges={edges}
    //     onNodesChange={onNodesChange}
    //     onEdgesChange={onEdgesChange}
    //     onConnect={onConnect}
    //     fitView
    <div className="flex h-screen w-screen bg-[#ffffff]">
      {/* <SideBar /> */}
      <div className="m-3 flex w-screen flex-col items-center justify-between rounded-xl border border-[#e9e9e9]">
        <Navbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-b-xl bg-[#ffffff]">
          <TriggerBtn isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen ? <AddTrigger /> : ""}
        </div>
      </div>
    </div>
    // />
    // </div>
  );
}
