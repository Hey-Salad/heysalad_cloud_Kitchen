# HeySalad® Cloud Kitchen Frontend

Vue 3 + Vite + TypeScript control panel for the HeySalad Cloud Kitchen network. Monitor Raspberry Pi “agents”, watch camera feeds, manage thermal printers, and sync orders, staff, and compliance data stored in Firebase.

## What’s Inside
- Brand-aligned layout using Cherry Red `#ed4c4c`, Peach `#faa09a`, Light Peach `#ffd0cd`, and Grandstander / Figtree typefaces.
- Modular routes for **Dashboard, Cameras, Printers, Calls, Orders, Logistics, Staff, Customers, Compliance,** and **Admin**.
- Shared status banner with live readiness indicators.
- Firebase Auth, Firestore, and Storage bootstrap in `src/firebase.ts`.
- Socket.IO placeholder hooks for Raspberry Pi agent telemetry (`VITE_SOCKET_URL`).

## Quick Start
```bash
npm install
npm run dev
```

Visit `http://localhost:5173` once the Vite dev server boots. Use Node.js `20.19.0+` or `22.12.0+` to satisfy Vite’s native bindings.

## Environment Variables
Create `.env` in the project root:

```ini
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=heysalad-cloud.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=heysalad-cloud
VITE_FIREBASE_STORAGE_BUCKET=heysalad-cloud.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Socket.IO endpoint exposed by the Raspberry Pi agent
VITE_SOCKET_URL=https://your-agent.ngrok-free.app
```

Restart `npm run dev` after editing environment values.

## Project Structure
```
src/
 ├── App.vue                # Layout with NavBar + StatusBanner
 ├── main.ts                # Vue bootstrap + router
 ├── router/index.ts        # Route definitions for each module
 ├── firebase.ts            # Firebase Auth / Firestore / Storage init
 ├── types/                 # Shared kitchen domain models
 ├── data/                  # Mock data scaffolding for UI development
 ├── components/            # Shared UI components
 │    ├── AgentCard.vue
 │    ├── NavBar.vue
 │    └── StatusBanner.vue
 └── views/                 # Feature pages
      ├── Admin.vue
      ├── Cameras.vue
      ├── Calls.vue
      ├── Compliance.vue
      ├── Customers.vue
      ├── Dashboard.vue
      ├── Logistics.vue
      ├── Orders.vue
      ├── Printers.vue
      └── Staff.vue

### Domain Models
- `KitchenAgent`, `KitchenOrder`, `CustomerProfile`, and more are defined in `src/types/kitchen.ts`.
- Temporary UI data lives in `src/data/mockData.ts` and mirrors the Firestore collections (`orders`, `staff`, `customers`, `compliance`). Swap these with live queries when wiring Firebase.
```

## Firestore Collections (scaffold)
| Collection | Fields |
| ---------- | ------ |
| `orders` | `id` (string), `customerId` (string), `status` (`pending` \| `processing` \| `completed`), `items` (array), `total` (number), `createdAt` (timestamp) |
| `staff` | `id` (string), `name` (string), `role` (string), `active` (boolean) |
| `customers` | `id` (string), `name` (string), `email` (string), `rewardPoints` (number) |
| `compliance` | `id` (string), `reportType` (string), `fileUrl` (string), `createdAt` (timestamp) |

Extend `src/firebase.ts` with Firestore queries or composables as integrations go live.

## Connecting Raspberry Pi Agents
1. Deploy the agent backend with Socket.IO support (existing bridge).
2. Expose the agent with HTTPS (e.g. `ngrok` or reverse proxy).
3. Set `VITE_SOCKET_URL` to the agent URL.
4. In the frontend, subscribe to socket events (e.g. `agent:status`, `camera:update`, `printer:job`) and update the shared status banner or module views.

## Deployment (Firebase Hosting)
```bash
firebase login
npm run build
firebase deploy --only hosting
```

`firebase.json` targets the static build in `dist/` and rewrites all routes to `index.html` for SPA behaviour.

## Developing Further
- Replace placeholder data in each view with Firestore queries or REST calls.
- Use Vue composables to share Socket.IO state (`/composables/useAgentSocket.ts` is a good future location).
- Harden authentication by enforcing Firestore security rules aligned to staff roles.

## Troubleshooting
- **Native binding error:** remove `node_modules` & `package-lock.json`, install with a supported Node.js version, then retry.
- **Auth issues:** confirm Firebase project IDs and add local origin to Firebase Auth authorised domains.
- **Socket connection fails:** verify the agent URL is reachable over HTTPS and CORS allows the frontend origin.
