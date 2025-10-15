import type {
  AdminModule,
  CameraFeed,
  CallQueue,
  ComplianceReport,
  CustomerProfile,
  KitchenAgent,
  KitchenOrder,
  RouteSimulation,
  StaffMember,
  ThermalPrinter,
} from "../types/kitchen";

export const agents: KitchenAgent[] = [
  {
    id: "agent-001",
    name: "Prep Station A",
    location: "Kitchen HQ · Station 1",
    status: { label: "Online", tone: "positive" },
    camera: { label: "Streaming", tone: "positive" },
    printer: { label: "Ready", tone: "informational" },
    ordersSynced: 42,
    lastHeartbeat: "2 min ago",
    notes: "Monitoring salad assembly and outbound tickets.",
  },
  {
    id: "agent-002",
    name: "Packaging Bay",
    location: "Kitchen HQ · Station 3",
    status: { label: "Degraded", tone: "warning" },
    camera: { label: "Intermittent", tone: "warning" },
    printer: { label: "Ready", tone: "informational" },
    ordersSynced: 37,
    lastHeartbeat: "5 min ago",
    notes: "Camera feed experiencing packet loss. Investigating network switch.",
  },
  {
    id: "agent-003",
    name: "Delivery Exit",
    location: "Kitchen HQ · Dispatch",
    status: { label: "Offline", tone: "negative" },
    camera: { label: "Offline", tone: "negative" },
    printer: { label: "Standby", tone: "warning" },
    ordersSynced: 0,
    lastHeartbeat: "18 min ago",
    notes: "Agent unreachable. Check Raspberry Pi power cycle.",
  },
];

export const cameraFeeds: CameraFeed[] = [
  {
    id: "cam:prep-line",
    name: "Prep Line",
    location: "Station 1",
    health: "online",
    resolution: "1080p @ 30fps",
    latency: "120ms",
    notes: "Hailo AI detection overlay enabled.",
  },
  {
    id: "cam:packaging",
    name: "Packaging Bay",
    location: "Station 3",
    health: "buffering",
    resolution: "720p @ 24fps",
    latency: "220ms",
    notes: "Packet jitter detected. Investigate local Wi-Fi.",
  },
  {
    id: "cam:dispatch",
    name: "Dispatch Exit",
    location: "Loading dock",
    health: "offline",
    resolution: "1080p @ 30fps",
    latency: "—",
    notes: "Pi agent offline. Last contact 18 minutes ago.",
  },
];

export const printers: ThermalPrinter[] = [
  {
    id: "printer-thermal-1",
    name: "Kitchen Ticket #1",
    model: "Star Micronics TSP650II",
    paper: "80mm thermal",
    state: "printing",
    queue: 3,
    agent: "Prep Station A",
    notes: "Printing order #1245",
  },
  {
    id: "printer-thermal-2",
    name: "Packaging Labeler",
    model: "Brother QL-820NWB",
    paper: "62mm continuous",
    state: "ready",
    queue: 0,
    agent: "Packaging Bay",
  },
  {
    id: "printer-thermal-3",
    name: "Dispatch Ticket",
    model: "Zebra ZD410",
    paper: "Receipt 58mm",
    state: "error",
    queue: 5,
    agent: "Delivery Exit",
    notes: "Paper jam detected. Clear before resuming.",
  },
];

export const callQueues: CallQueue[] = [
  {
    id: "queue-support",
    name: "Support",
    twilioNumber: "+1 415 555 0138",
    waiting: 1,
    avgHandle: "3m 20s",
    agentsOnline: 3,
  },
  {
    id: "queue-ordering",
    name: "Ordering Hotline",
    twilioNumber: "+1 415 555 0111",
    waiting: 0,
    avgHandle: "1m 42s",
    agentsOnline: 2,
  },
  {
    id: "queue-drivers",
    name: "Driver Ops",
    twilioNumber: "+1 415 555 0199",
    waiting: 2,
    avgHandle: "2m 58s",
    agentsOnline: 1,
  },
];

export const orders: KitchenOrder[] = [
  {
    id: "ord_1245",
    customerId: "cust_89",
    total: 28.5,
    status: "processing",
    items: ["Rainbow poke bowl", "Matcha iced tea"],
    createdAt: "2024-05-27T09:12:00Z",
  },
  {
    id: "ord_1244",
    customerId: "cust_23",
    total: 16,
    status: "completed",
    items: ["Classic Caesar wrap"],
    createdAt: "2024-05-27T09:01:00Z",
  },
  {
    id: "ord_1243",
    customerId: "cust_34",
    total: 35.75,
    status: "pending",
    items: ["Warm grain bowl", "Ginger kombucha"],
    createdAt: "2024-05-27T08:58:00Z",
  },
];

export const routes: RouteSimulation[] = [
  {
    id: "route-45b",
    driver: "Avery",
    eta: "12 min",
    status: "en-route",
    stopsRemaining: 2,
  },
  {
    id: "route-56c",
    driver: "Robin",
    eta: "Arrived",
    status: "arrived",
    stopsRemaining: 0,
  },
  {
    id: "route-59d",
    driver: "Kai",
    eta: "Delayed · 22 min",
    status: "delayed",
    stopsRemaining: 3,
  },
];

export const staffMembers: StaffMember[] = [
  { id: "staff-01", name: "Jordan Lee", role: "Kitchen Lead", active: true },
  { id: "staff-02", name: "Morgan Patel", role: "Prep Chef", active: true },
  { id: "staff-03", name: "Taylor Brooks", role: "Packaging", active: false },
];

export const customers: CustomerProfile[] = [
  { id: "cust_89", name: "Skylar Kim", email: "skylar@heysalad.app", rewardPoints: 420 },
  { id: "cust_23", name: "Noah Fernandez", email: "noah@heysalad.app", rewardPoints: 315 },
  { id: "cust_34", name: "Amelia Chen", email: "amelia@heysalad.app", rewardPoints: 580 },
];

export const complianceReports: ComplianceReport[] = [
  {
    id: "compliance-001",
    reportType: "Food Safety Checklist",
    fileUrl: "https://storage.googleapis.com/.../food-safety.pdf",
    createdAt: "2024-05-26T16:42:00Z",
  },
  {
    id: "compliance-002",
    reportType: "Health Inspection Form",
    fileUrl: "https://storage.googleapis.com/.../health-inspection.pdf",
    createdAt: "2024-05-23T12:30:00Z",
  },
];

export const adminModules: AdminModule[] = [
  { name: "Agents", description: "Manage Raspberry Pi credentials and Socket.IO secrets." },
  { name: "Branding", description: "Configure HeySalad® theme assets and layout toggles." },
  { name: "Integrations", description: "Stripe, Twilio, and third-party delivery providers." },
  { name: "Security", description: "Firestore rules, auth providers, and audit logging." },
];
