# HeySalad® Cloud Print Frontend

A branded Vue 3 + Vite + TypeScript interface for monitoring HeySalad printers, managing user access, and bridging real-time updates from a Raspberry Pi via Socket.IO.

## Highlights
- HeySalad-branded UI with responsive layout and Google Fonts.
- Firebase Authentication with sign-up/login flow and session guard.
- Admin panel (restricted to `@heysalad.com` accounts) for inviting new team members.
- Socket.IO bridge to communicate with the Raspberry Pi printer controller.
- Upload interface for sending print-ready files (PDF or images) to the bridge.
- Deployment-ready configuration for Firebase Hosting.

## Prerequisites
- Node.js 18+ and npm.
- Firebase project with Authentication enabled.
- Socket.IO server running on the Raspberry Pi (or reachable endpoint).
- Firebase CLI (`npm install -g firebase-tools`) for deployment.

## Getting Started

```bash
git clone <repo-url>
cd heysalad-cloud-printer-frontend
npm install
```

### Environment Variables
Create a `.env` file in the project root using the values from your Firebase project:

```ini
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Socket.IO bridge (Raspberry Pi or printer gateway)
VITE_SOCKET_URL=http://<rpi-ip-or-host>:4000

# Optional API endpoints
VITE_HEALTH_ENDPOINT=https://<bridge-or-api>/api/health
```

> **Note:** Double-check `VITE_FIREBASE_PROJECT_ID` is spelled correctly; a typo will cause initialization errors.

### Development Server

```bash
npm run dev
```

Visit http://localhost:5173 to use the app.

## Firebase Authentication Setup
1. In the Firebase console, open **Build → Authentication → Get started**.
2. Enable the **Email/Password** provider.
3. Optionally add seed accounts via the **Users** tab or the built-in sign-up form.
4. Add `http://localhost:5173` (and your production domain) to **Authentication → Settings → Authorized domains**.

### Admin Access
The admin panel is available to users with an email ending in `@heysalad.com`. Once signed in:

1. Click **Manage users** in the dashboard header.
2. Enter the teammate’s details. The form uses a secondary Firebase app instance, so your session stays active.
3. Share the generated credentials with your teammate; they can sign in immediately and change their password.

## Socket.IO Bridge
Set up a Socket.IO server on the Raspberry Pi that listens for the following events:

- `printer:ping` – sent from the UI to check connectivity.
- `printer:status` – emit status updates back to the client (`{ status: "online" }`, etc.).
- `printer:message` – general informational messages.
- `printer:error` – error details to surface in the dashboard.

Example (Node.js on the Pi):

```ts
import { Server } from "socket.io";

const io = new Server(4000, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected", socket.handshake.auth);

  socket.emit("printer:status", { status: "Ready" });

  socket.on("printer:ping", (payload) => {
    console.log("Ping received", payload);
    socket.emit("printer:message", { message: "Printer acknowledged ping." });
  });
});
```

Update `VITE_SOCKET_URL` to the correct host/port and restart `npm run dev` to reconnect.

### Sending Print Jobs
1. Ensure the socket bridge shows “Printer bridge connected” in the dashboard.
2. Use **Send a print job** to upload a PDF or image (max 10 MB). The file is encoded client-side and streamed over Socket.IO to the Raspberry Pi.
3. Watch the print log for confirmation events (`Print job accepted`, `Print job completed`, or any error messages emitted by the bridge).

## Deployment (Firebase Hosting)
1. Authenticate: `firebase login`
2. Ensure `firebase.json` and `.firebaserc` target the correct project.
3. Build and deploy:

```bash
npm run build
firebase deploy --only hosting
```

This runs the production build (`dist/`) and uploads it to Firebase Hosting.

## Additional Commands
- `npm run build` – Type-check and bundle for production.
- `npm run preview` – Preview the production build locally.

## Troubleshooting
- **Auth errors:** confirm all `VITE_FIREBASE_*` values and authorized domains.
- **Admin panel hidden:** make sure the signed-in email ends with `@heysalad.com`.
- **Socket disconnected:** verify `VITE_SOCKET_URL`, network access, and that the Pi server is running.
- **Deployment issues:** run `firebase target:list` to confirm hosting target, and ensure you ran `npm run build` before deploying.

Enjoy printing with HeySalad® Cloud Print!
