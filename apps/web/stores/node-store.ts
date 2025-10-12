import { create } from "zustand";
import { Node, Edge } from "@xyflow/react";
import { FitView } from "@xyflow/react";

// interface for nodeData
export interface NodeData<T = any> {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: T;
  actionData: any;
  credentialId: string;
}

export interface EdgeData<T = any> {
  id: string;
  source: string;
  target: string;
  type: string;
  sourceHandle: string;
  targetHandle: string;
}

// interface for nodeState
interface NodesState {
  iNodes: NodeData[];
  iEdges: Edge[];
  addEdge: (edge: Edge) => void;
  setNode?: (node: Node) => void;
  addNode: (node: NodeData) => void;
  updatesNode?: (id: string, updates: Partial<NodeData>) => void;
  removeNode?: (id: string) => void;
}

export const useNodeStore = create<NodesState>((set) => ({
  iEdges: [],
  iNodes: [
    {
      id: "node-1",
      type: "manualNode",
      position: { x: 0, y: 0 },
      data: { value: 123 },
      actionData: "",
      credentialId: "",
    },
  ],
  setNode: (updater: any) =>
    set((state) => ({
      iNodes: typeof updater === "function" ? updater(state.iNodes) : updater,
    })),
  addNode: (node) =>
    set((state) => ({
      iNodes: [...state.iNodes, node],
    })),

  addEdge: (edge) =>
    set((state) => ({
      iEdges: [...state.iEdges, edge],
    })),
}));
