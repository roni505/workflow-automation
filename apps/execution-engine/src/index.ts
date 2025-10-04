// here will write the execution logic
import express from "express";

export type WorkflowExecuteMode = "manual" | "webhook";

export interface ISourceData {
  previousNode: string;
  previousNodeOutput?: number;
  previousNodeRun?: number;
}

export interface StartNodeData {
  name: string;
  sourceData: ISourceData | null;
}

export const ExecutionStatusList = [
  "canceled",
  "crashed",
  "error",
  "new",
  "running",
  "success",
  "unknown",
  "waiting",
] as const;

export type ExecutionStatus = (typeof ExecutionStatusList)[number];

export type NodeData = { json: Record<string, any> };

export interface ITaskDataConnections {
  // Key for each input type and because there can be multiple inputs of the same type it is an array
  // null is also allowed because if we still need data for a later while executing the workflow set temporary to null
  // the nodes get as input TaskDataConnections which is identical to this one except that no null is allowed.
  [key: string]: Array<NodeData[] | null>;
}

export interface ITaskData {
  executionTime: number;
  executionStatus?: ExecutionStatus;
  data?: ITaskDataConnections;
  // inputOverride?: ITaskDataConnections;
  // error?: ExecutionError;
  // metadata?: ITaskMetadata;
}

export interface IRunData {
  // node-name: result-data
  [key: string]: ITaskData[];
}

export interface IPinData {
  [nodeName: string]: NodeData[];
}

export interface INode {
  id: string;
  name: string;
  position: number[];
  parameters: Record<string, any>;
  type: string;
  webHookId?: string;
}

export interface ITaskDataConnectionsSource {
  // Key for each input type and because there can be multiple inputs of the same type it is an array
  // null is also allowed because if we still need data for a later while executing the workflow set temporary to null
  // the nodes get as input TaskDataConnections which is identical to this one except that no null is allowed.
  [key: string]: Array<ISourceData | null>;
}

export interface IExecuteData {
  data: ITaskDataConnections;
  // metadata?: ITaskMetadata;
  node: INode;
  source: ITaskDataConnectionsSource | null;
  runIndex?: number;
}

// Keeps data while workflow gets executed and allows when provided to restart execution
export interface IWaitingForExecution {
  // Node name
  [key: string]: {
    // Run index
    [key: number]: ITaskDataConnections;
  };
}

export interface IWaitingForExecutionSource {
  // Node name
  [key: string]: {
    // Run index
    [key: number]: ITaskDataConnectionsSource;
  };
}

export interface IRunExecutionData {
  startData?: {
    startNodes?: StartNodeData[];
    destinationNode?: string;
    originalDestinationNode?: string;
    // runNodeFilter?: string[];
  };
  resultData: {
    // error?: ExecutionError;
    runData: IRunData;
    pinData?: IPinData;
    lastNodeExecuted?: string;
    metadata?: Record<string, string>;
  };
  executionData?: {
    // contextData: IExecuteContextData;
    nodeExecutionStack: IExecuteData[];
    // metadata: {
    //   // node-name: metadata by runIndex
    //   [key: string]: ITaskMetadata[];
    // };
    waitingExecution: IWaitingForExecution;
    waitingExecutionSource: IWaitingForExecutionSource | null;
  };
}

export interface IConnection {
  node: string;
  type: string;
  index: number;
}

export interface ConnectionMapping {
  [key: string]: IConnection[][];
}

export interface IConnections {
  [key: string]: ConnectionMapping;
}

export interface IWorkflowBase {
  id: string;
  name: string;
  active: boolean;
  isArchived: boolean;
  createdAt: Date;
  startedAt?: Date;
  updatedAt: Date;
  nodes: INode[];
  connections: IConnections;
  // settings?: IWorkflowSettings;
  // staticData?: IDataObject;
  pinData?: IPinData;
  versionId?: string;
}

export interface IExecuteWorkflowInfo {
  code?: IWorkflowBase;
  id?: string;
}

export type Workflow = {
  id: string;
  name: string;
  tags?: string[];
};

// export interface ExecuteWorkflowOptions {
//   node?: INode;
//   parentWorkflowId: string;
//   inputData?: INodeExecutionData[];
//   loadedWorkflowData?: IWorkflowBase;
//   loadedRunData?: IWorkflowExecutionDataProcess;
//   parentWorkflowSettings?: IWorkflowSettings;
//   parentCallbackManager?: CallbackManager;
//   doNotWaitToFinish?: boolean;
//   parentExecution?: RelatedExecution;
// }

export type Result<T, E = unknown> =
  | { success: true; data: T }
  | { success: false; error: E };

export interface INodeExecutionData {
  json: Record<string, any>; // The main data payload
  // binary?: Record<string, any>;     // Optional binary data (like files)
  // error?: Error;                    // Optional error info
}

export interface IWorkflowExecutionDataProcess {
  destinationNode?: string;
  restartExecutionId?: string;
  executionMode: WorkflowExecuteMode;
  /**
   * The data that is sent in the body of the webhook that started this
   * execution.
   */
  executionData?: IRunExecutionData;
  runData?: IRunData;
  pinData?: IPinData;
  retryOf?: string | null;
  pushRef?: string;
  startNodes?: StartNodeData[];
  workflowData: IWorkflowBase;
  userId?: string;
  projectId?: string;
  dirtyNodeNames?: string[];
  triggerToStartFrom?: {
    name: string;
    data?: ITaskData;
  };
  // agentRequest?: AiAgentRequest;
  httpResponse?: express.Response; // Used for streaming responses
  streamingEnabled?: boolean;
  startedAt?: Date;
}

export interface RelatedExecution {
  executionId: string;
  workflowId: string;
}

export interface ExecuteWorkflowOptions {
  node?: INode;
  parentWorkflowId: string;
  inputData?: INodeExecutionData[];
  loadedWorkflowData?: IWorkflowBase;
  loadedRunData?: IWorkflowExecutionDataProcess;
  // parentWorkflowSettings?: IWorkflowSettings;
  // parentCallbackManager?: CallbackManager;
  doNotWaitToFinish?: boolean;
  parentExecution?: RelatedExecution;
}

export interface ExecuteWorkflowData {
  executionId: string;
  data: Array<INodeExecutionData[] | null>;
  waitTill?: Date | null;
}

export type GenericValue =
  | string
  | object
  | number
  | boolean
  | undefined
  | null;

export interface IDataObject {
  [key: string]: GenericValue | IDataObject | GenericValue[] | IDataObject[];
}

export interface IWorkflowExecuteAdditionalData {
  // credentialsHelper: ICredentialsHelper;
  executeWorkflow: (
    workflowInfo: IExecuteWorkflowInfo,
    additionalData: IWorkflowExecuteAdditionalData,
    options: ExecuteWorkflowOptions,
  ) => Promise<ExecuteWorkflowData>;
  getRunExecutionData: (
    executionId: string,
  ) => Promise<IRunExecutionData | undefined>;
  executionId?: string;
  restartExecutionId?: string;
  currentNodeExecutionIndex: number;
  httpResponse?: express.Response;
  httpRequest?: express.Request;
  streamingEnabled?: boolean;
  restApiUrl: string;
  instanceBaseUrl: string;
  setExecutionStatus?: (status: ExecutionStatus) => void;
  sendDataToUI?: (type: string, data: IDataObject | IDataObject[]) => void;
  formWaitingBaseUrl: string;
  webhookBaseUrl: string;
  webhookWaitingBaseUrl: string;
  webhookTestBaseUrl: string;
  // currentNodeParameters?: INodeParameters;
  executionTimeoutTimestamp?: number;
  userId?: string;
  // variables: IDataObject;
  // logAiEvent: (eventName: AiEvent, payload: AiEventPayload) => void;
  // parentCallbackManager?: CallbackManager;
  startRunnerTask<T, E = unknown>(
    additionalData: IWorkflowExecuteAdditionalData,
    jobType: string,
    settings: unknown,
    // executeFunctions: IExecuteFunctions,
    inputData: ITaskDataConnections,
    node: INode,
    workflow: Workflow,
    runExecutionData: IRunExecutionData,
    runIndex: number,
    itemIndex: number,
    activeNodeName: string,
    connectionInputData: INodeExecutionData[],
    // siblingParameters: INodeParameters,
    mode: WorkflowExecuteMode,
    // envProviderState: EnvProviderState,
    executeData?: IExecuteData,
  ): Promise<Result<T, E>>;
}
export class ExecuteWorkflow {
  private status: ExecutionStatus = "new";
  private readonly abortController = new AbortController();
  timedOut: boolean = false;

  private readonly additionlData: IWorkflowExecuteAdditionalData;
  private readonly mode: WorkflowExecuteMode;
  private runExecutionData: IRunExecutionData;

  constructor(
    additionalData: IWorkflowExecuteAdditionalData,
    mode: WorkflowExecuteMode,
    runExecutionData: IRunExecutionData = {
      startData: {},
      resultData: {
        runData: {},
        pinData: {},
      },
      executionData: {
        // contextData: {},
        nodeExecutionStack: [],
        // metadata: {},
        waitingExecution: {},
        waitingExecutionSource: {},
      },
    },
  ) {
    this.additionlData = additionalData;
    this.mode = mode;
    this.runExecutionData = runExecutionData;
  }
  run() {}
}
