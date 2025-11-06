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
import { DynamicNode } from "../../components/dynamic-node";
import { useNodeStore } from "../../stores/node-store";
import { useCredentialsStore } from "../../stores/credentials-store";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

const nodeTypes = {
  manualNode: ManualNode,
  dynamicNode: DynamicNode,
};

// const initialNodes = [
//   { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
//   { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
// ];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

function WorkFlow() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [nodes, setNodes] = useState(initialNodes);
  const { iNodes, iEdges, addNode, addEdge, setNode } = useNodeStore();
  const [edges, setEdges] = useState(iEdges);
  const { fetchCredentails, credentialData, addCredentails } =
    useCredentialsStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setIsAuthenticated(true);
      } else {
        router.replace("/login");
      }
    }
  }, []);

  // useEffect(() => {
  //   console.log("nodesstate");

  //   console.log(iNodes);
  // });
  // useEffect(() => {
  //   setNodes(iNodes);
  // }, [iNodes]);

  // const onNodesChange = useCallback(
  //   (changes: any) => {
  //     // @ts-ignore
  //     setNode((nds: any) => applyNodeChanges(changes, nds));
  //   },
  //   [setNode],
  // );
  // const onEdgesChange = useCallback(
  //   (changes: any) =>
  //     setEdges((edgesSnapshot: any) =>
  //       applyEdgeChanges(changes, edgesSnapshot),
  //     ),
  //   [addEdge],
  // );
  // const onConnect = useCallback(
  //   (params: any) =>
  //     // @ts-ignore
  //     setEdges((edgesSnapshot: any) => addEdge(params, edgesSnapshot)),
  //   [],
  // );

  // fetch data the database
  useEffect(() => {
    fetchCredentails();
    // console.log("This are the credentials: ", credentialData);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-full w-full bg-[#000000]">
      <ReactFlowProvider>
        <ReactFlow
          nodes={iNodes}
          edges={iEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.3, // extra space around nodes
            minZoom: 1, // don’t zoom in too close
            maxZoom: 1, // lock zoom level if you want fixed scale
          }}
        />
        <Controls />
      </ReactFlowProvider>
    </div>
  );
}

export default WorkFlow;
