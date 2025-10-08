// workflow.ts

import { IConnection, INode, INodes } from "./execute-workflow";

// 🧩 Interfaces
export interface WorkflowParameters {
  id?: string;
  name?: string;
  nodes: INode[];
  connections: IConnection[]; // ✅ array of { source, target }
  active: boolean;
  nodeTypes: any;
}

interface IConnections {
  [nodeName: string]: string[]; // source node -> connected destination nodes
}

// 🧠 Workflow class
export class Workflow {
  id: string;
  name: string | undefined;
  nodes: INodes = {};
  connections: IConnections = {};
  connectionsByDestinationNode: IConnections = {};
  nodeTypes: any = {};
  active: boolean;

  constructor(parameters: WorkflowParameters) {
    this.id = parameters.id || "workflow-" + Date.now();
    this.name = parameters.name;
    this.nodeTypes = parameters.nodeTypes;
    this.active = parameters.active;

    this.setNodes(parameters.nodes);
    this.setConnections(parameters.connections);
  }

  // 🧱 Store nodes by name
  setNodes(nodes: INode[]): void {
    this.nodes = {};
    for (const node of nodes) {
      this.nodes[node.name] = node;
    }
  }

  // 🔗 Convert array-style connections into dictionary
  setConnections(connections: IConnection[]): void {
    const sourceMap: IConnections = {};
    const destinationMap: IConnections = {};

    for (const conn of connections) {
      // Build source → destination map
      if (!sourceMap[conn.source]) sourceMap[conn.source] = [];
      sourceMap[conn.source].push(conn.target);

      // Build destination → source map (optional, useful for traversal)
      if (!destinationMap[conn.target]) destinationMap[conn.target] = [];
      destinationMap[conn.target].push(conn.source);
    }

    this.connections = sourceMap;
    this.connectionsByDestinationNode = destinationMap;
  }

  // 🧩 Accessors
  getNode(name: string): INode | undefined {
    return this.nodes[name];
  }

  getStartNode(): INode | undefined {
    // Return the first node with no incoming edges
    const allDestinations = Object.keys(this.connectionsByDestinationNode);
    return Object.values(this.nodes).find(
      (node) => !allDestinations.includes(node.name),
    );
  }

  getConnectedNodes(nodeName: string): INode[] {
    const connectedNames = this.connections[nodeName] || [];
    return connectedNames.map((name) => this.nodes[name]);
  }

  // 🧩 Validation and Utilities
  checkForNodeErrors(): string[] {
    const errors: string[] = [];
    for (const node of Object.values(this.nodes)) {
      if (!node.name || !node.type) {
        errors.push(`Node ${node.id} is missing name or type`);
      }
    }
    return errors;
  }

  getParentNodes(nodeName: string): string[] {
    return this.connectionsByDestinationNode[nodeName] || [];
  }

  getChildNodes(nodeName: string): string[] {
    return this.connections[nodeName] || [];
  }

  isWorkflowActive(): boolean {
    return this.active;
  }
}
