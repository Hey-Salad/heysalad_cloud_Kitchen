export type AgentStatusTone = "positive" | "informational" | "warning" | "negative";

export interface AgentMetric {
  label: string;
  tone: AgentStatusTone;
}

export interface KitchenAgent {
  id: string;
  name: string;
  location: string;
  status: AgentMetric;
  camera: AgentMetric;
  printer: AgentMetric;
  ordersSynced: number;
  lastHeartbeat: string;
  notes?: string;
}

export type CameraHealth = "online" | "buffering" | "offline";

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  health: CameraHealth;
  resolution: string;
  latency: string;
  notes?: string;
}

export type PrinterState = "ready" | "printing" | "error" | "offline";

export interface ThermalPrinter {
  id: string;
  name: string;
  model: string;
  paper: string;
  state: PrinterState;
  queue: number;
  agent: string;
  notes?: string;
}

export interface CallQueue {
  id: string;
  name: string;
  twilioNumber: string;
  waiting: number;
  avgHandle: string;
  agentsOnline: number;
}

export type OrderStatus = "pending" | "processing" | "completed";

export interface KitchenOrder {
  id: string;
  customerId: string;
  total: number;
  status: OrderStatus;
  items: string[];
  createdAt: string;
}

export interface RouteSimulation {
  id: string;
  driver: string;
  eta: string;
  status: "en-route" | "arrived" | "delayed";
  stopsRemaining: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  active: boolean;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  rewardPoints: number;
}

export interface ComplianceReport {
  id: string;
  reportType: string;
  fileUrl: string;
  createdAt: string;
}

export interface AdminModule {
  name: string;
  description: string;
}
