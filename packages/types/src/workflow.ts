export interface WorkFlow {
  id: number;
  createAt: string;
  updated: string;
  active: boolean;
  name: string;
  isArchived: boolean;
  nodes: Node[];
  connection: Connection[];
}

export interface Node {
  id: string;
  name: string;
  position: number[];
  parameters: Record<string, any>;
  type: string;
  webHookId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface WebHook {
  id: string;
  name: string;
  method: string;
  path: string;
  header: string;
  secret: number;
  user_id: string;
  user: User;
}

export interface Credentials {
  id: string;
  name: string;
  platform: string;
  data: Record<string, any>;
  user_Id: string;
}

export interface Connection {
  node: string;
  type: string;
  index: number;
}

export interface ConnectionMapping {
  [key: string]: Connection[][];
}

export interface Connections {
  [key: string]: ConnectionMapping;
}
