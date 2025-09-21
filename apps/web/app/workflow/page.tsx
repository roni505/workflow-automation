"use client";

import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
  MiniMap,
  Background,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback, useEffect } from "react";
import { ManualNode } from "../../components/manual-node";
import { GmailNode } from "../../components/gmail-node";
import { useNodeStore } from "../../stores/node-store";

const initialNodes = [
  {
    id: "node-1",
    type: "manualNode",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];

const nodeTypes = {
  manualNode: ManualNode,
  gmailNode: GmailNode,
};

export enum BackgroundVariant {
  Lines = "lines",
  Dots = "dots",
  Cross = "cross",
}

// const initialNodes = [
//   { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
//   { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
// ];
// const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

function WorkFlow() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [nodes, setNodes] = useState(initialNodes);
  const { iNodes, addNode } = useNodeStore();
  // const [edges, setEdges] = useState(initialEdges);

  // useEffect(() => {
  //   setNodes(iNodes);
  // }, [iNodes]);

  const onNodesChange = useCallback(
    (changes: any) =>
      // @ts-ignore
      addNode((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  // const onEdgesChange = useCallback(
  //   (changes: any) =>
  //     setEdges((edgesSnapshot: any) => applyEdgeChanges(changes, edgesSnapshot)),
  //   [],
  // );
  // const onConnect = useCallback(
  //   (params: any) =>
  //     setEdges((edgesSnapshot: any) => addEdge(params, edgesSnapshot)),
  //   [],
  // );
  return (
    <div className="h-full w-full">
      <ReactFlowProvider>
        <ReactFlow
          nodes={iNodes}
          // edges={edges}
          nodeTypes={nodeTypes}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          fitView
          // defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          fitViewOptions={{
            padding: 0.3, // extra space around nodes
            minZoom: 1, // don’t zoom in too close
            maxZoom: 1, // lock zoom level if you want fixed scale
          }}
        />
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          color="#d1d5db"
        />
      </ReactFlowProvider>
    </div>
  );
}

export default WorkFlow;
