<template>
  <div class="app-shell">
    <header class="brand-header">
      <img
        class="brand-logo"
        src="https://heysalad.app/HeySalad%20Logo%20Black.png"
        alt="HeySalad® logo"
      />
    </header>

    <main class="content">
      <section v-if="isCheckingSession" class="dashboard-card">
        <p class="loading-text">Preparing your HeySalad® Cloud Print dashboard…</p>
      </section>

      <section v-else-if="!user" class="dashboard-card auth-card">
        <h2 class="dashboard-heading">
          {{ isSignUpMode ? "Create your HeySalad® account" : "Sign in to continue" }}
        </h2>
        <p>
          {{
            isSignUpMode
              ? "Set up access to monitor your printers in one place."
              : "Use your HeySalad® credentials to access printer insights."
          }}
        </p>

        <form class="auth-form" @submit.prevent="submitAuth">
          <label v-if="isSignUpMode" class="input-group">
            <span>Full name</span>
            <input
              v-model="fullName"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Your name"
            />
          </label>

          <label class="input-group">
            <span>Email</span>
            <input
              v-model="email"
              type="email"
              name="email"
              autocomplete="email"
              required
              placeholder="you@heysalad.com"
            />
          </label>

          <label class="input-group">
            <span>Password</span>
            <input
              v-model="password"
              :type="showPasswords ? 'text' : 'password'"
              name="password"
              :autocomplete="isSignUpMode ? 'new-password' : 'current-password'"
              required
              placeholder="••••••••"
              minlength="8"
            />
          </label>

          <label v-if="isSignUpMode" class="input-group">
            <span>Confirm password</span>
            <input
              v-model="confirmPassword"
              :type="showPasswords ? 'text' : 'password'"
              name="confirm-password"
              autocomplete="new-password"
              required
              placeholder="Re-enter password"
              minlength="8"
            />
          </label>

          <label class="input-inline">
            <input v-model="showPasswords" type="checkbox" />
            <span>Show passwords</span>
          </label>

          <p v-if="authError" class="auth-error" role="alert">{{ authError }}</p>

          <button class="primary-action" type="submit" :disabled="isSubmitting">
            {{
              isSubmitting
                ? isSignUpMode
                  ? "Creating account…"
                  : "Signing in…"
                : isSignUpMode
                  ? "Create account"
                  : "Sign in"
            }}
          </button>
        </form>

        <p class="form-toggle">
          <span>{{ isSignUpMode ? "Already have an account?" : "Need an account?" }}</span>
          <button class="link-button" type="button" @click="toggleAuthMode">
            {{ isSignUpMode ? "Sign in" : "Create one" }}
          </button>
        </p>
      </section>

      <section v-else class="dashboard-card">
        <header class="card-header">
          <div class="welcome-copy">
            <h2 class="dashboard-heading">Welcome back 👋</h2>
            <p v-if="user?.displayName" class="subheading">
              Signed in as {{ user.displayName }}
            </p>
            <p v-else-if="user?.email" class="subheading">
              Signed in as {{ user.email }}
            </p>
          </div>
          <div class="card-actions">
            <button
              v-if="isAdmin"
              class="secondary-action"
              type="button"
              :aria-pressed="showAdminPanel"
              @click="toggleAdminPanel"
            >
              {{ showAdminPanel ? "Close admin panel" : "Manage users" }}
            </button>
            <button class="secondary-action" type="button" @click="signOutUser">
              Sign out
            </button>
          </div>
        </header>

        <template v-if="showAdminPanel && isAdmin">
          <div class="admin-panel">
            <h3 class="section-heading">Invite a team member</h3>
            <p class="section-subheading">
              Create a HeySalad® Cloud Print account for a colleague. They will be able to
              sign in immediately.
            </p>

            <form class="admin-form" @submit.prevent="createTeamMember">
              <label class="input-group">
                <span>Full name</span>
                <input
                  v-model="newUserName"
                  type="text"
                  name="new-user-name"
                  autocomplete="name"
                  placeholder="Team member name"
                  required
                />
              </label>

              <label class="input-group">
                <span>Email</span>
                <input
                  v-model="newUserEmail"
                  type="email"
                  name="new-user-email"
                  autocomplete="email"
                  placeholder="team@heysalad.com"
                  required
                />
              </label>

              <label class="input-group">
                <span>Temporary password</span>
                <input
                  v-model="newUserPassword"
                  :type="showAdminPassword ? 'text' : 'password'"
                  name="new-user-password"
                  autocomplete="new-password"
                  placeholder="Choose at least 8 characters"
                  minlength="8"
                  required
                />
              </label>

              <label class="input-group">
                <span>Confirm password</span>
                <input
                  v-model="newUserConfirm"
                  :type="showAdminPassword ? 'text' : 'password'"
                  name="new-user-confirm"
                  autocomplete="new-password"
                  placeholder="Re-enter password"
                  minlength="8"
                  required
                />
              </label>

              <label class="input-inline">
                <input v-model="showAdminPassword" type="checkbox" />
                <span>Show password</span>
              </label>

              <p
                v-if="adminMessage"
                class="admin-feedback"
                :class="{ 'is-error': adminMessageType === 'error' }"
                role="status"
              >
                {{ adminMessage }}
              </p>

              <button class="primary-action" type="submit" :disabled="isCreatingUser">
                {{ isCreatingUser ? "Creating user…" : "Create user" }}
              </button>
            </form>
          </div>
        </template>
        <template v-else>
          <p>Manage your printers and monitor real-time status.</p>

          <div class="socket-panel">
            <div class="socket-status">
              <span class="status-indicator" :class="socketStatus"></span>
              <div>
                <p class="status-label">{{ socketStatusLabel }}</p>
                <p class="status-meta" v-if="socketUrl">
                  {{ socketUrl }}
                </p>
                <p class="status-meta warning" v-else>
                  Set <code>VITE_SOCKET_URL</code> to connect to your printer hub.
                </p>
              </div>
            </div>
            <button
              class="secondary-action"
              type="button"
              :disabled="socketStatus !== 'connected'"
              @click="sendPrinterPing"
            >
              Send test ping
            </button>
          </div>

          <section class="print-job">
            <h3 class="section-heading">Send a print job</h3>
            <p class="section-subheading">
              Upload a PDF or image and stream it directly to the HeySalad® printer bridge.
            </p>

            <form class="print-form" @submit.prevent="submitPrintJob">
              <label class="file-drop" :class="{ 'is-disabled': isSendingJob }">
                <input
                  ref="fileInput"
                  class="file-input"
                  type="file"
                  accept=".pdf,image/*"
                  :disabled="isSendingJob"
                  @change="handleFileChange"
                />
                <div class="file-cta">
                  <span class="file-icon" aria-hidden="true">📄</span>
                  <div>
                    <p class="file-title">
                      {{ selectedFile ? selectedFile.name : "Choose a file or drop it here" }}
                    </p>
                    <p class="file-subtitle">
                      {{
                        selectedFile
                          ? readableFileSize
                          : "Supports PDF and common image formats up to 10 MB."
                      }}
                    </p>
                  </div>
                </div>
              </label>

              <p v-if="fileError" class="auth-error" role="alert">{{ fileError }}</p>
              <p v-if="printStatus" class="status-banner">{{ printStatus }}</p>

              <div class="print-actions">
                <button
                  class="secondary-action"
                  type="button"
                  :disabled="!selectedFile || isSendingJob"
                  @click="clearSelectedFile(true)"
                >
                  Clear
                </button>
                <button
                  class="primary-action"
                  type="submit"
                  :disabled="!selectedFile || isSendingJob || socketStatus !== 'connected'"
                >
                  {{ isSendingJob ? "Sending…" : "Print file" }}
                </button>
              </div>
            </form>
          </section>

          <ul v-if="socketMessages.length" class="socket-log">
            <li v-for="(message, index) in socketMessages" :key="index">
              {{ message }}
            </li>
          </ul>

          <button class="primary-action" @click="checkHealth">
            Check Printer Health
          </button>

          <div v-if="response" class="response" role="status">
            {{ response }}
          </div>
        </template>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type Unsubscribe,
  type User,
} from "firebase/auth";
import { io, type Socket } from "socket.io-client";

import { adminAuth, auth } from "./firebase";

type SocketStatus = "disconnected" | "connecting" | "connected";

const user = ref<User | null>(null);
const response = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const fullName = ref("");
const authError = ref("");
const isSubmitting = ref(false);
const authMode = ref<"signin" | "signup">("signin");
const showPasswords = ref(false);
const isCheckingSession = ref(true);

const showAdminPanel = ref(false);
const newUserName = ref("");
const newUserEmail = ref("");
const newUserPassword = ref("");
const newUserConfirm = ref("");
const showAdminPassword = ref(false);
const isCreatingUser = ref(false);
const adminMessage = ref("");
const adminMessageType = ref<"success" | "error">("success");

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const fileError = ref("");
const printStatus = ref("");
const isSendingJob = ref(false);

const socket = ref<Socket | null>(null);
const socketStatus = ref<SocketStatus>("disconnected");
const socketMessages = ref<string[]>([]);
const socketUrl = (import.meta.env.VITE_SOCKET_URL || "") as string;
let hasWarnedMissingSocket = false;

let unsubscribe: Unsubscribe | undefined;

const isSignUpMode = computed(() => authMode.value === "signup");
const isAdmin = computed(() => {
  const emailAddress = user.value?.email ?? "";
  return emailAddress.toLowerCase().endsWith("@heysalad.com");
});
const socketStatusLabel = computed(() => {
  switch (socketStatus.value) {
    case "connected":
      return "Printer bridge connected";
    case "connecting":
      return "Connecting to printer bridge…";
    default:
      return "Printer bridge disconnected";
  }
});

const readableFileSize = computed(() => {
  if (!selectedFile.value) return "";
  return formatFileSize(selectedFile.value.size);
});

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const HEALTH_ENDPOINT = (import.meta.env.VITE_HEALTH_ENDPOINT || "/api/health") as string;

onMounted(() => {
  unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    isCheckingSession.value = false;

    if (currentUser) {
      connectSocket();
    } else {
      teardownSocket();
      showAdminPanel.value = false;
      response.value = "";
      socketMessages.value = [];
      socketStatus.value = "disconnected";
    }
  });
});

onBeforeUnmount(() => {
  unsubscribe?.();
  teardownSocket();
});

watch(isAdmin, (value) => {
  if (!value) {
    showAdminPanel.value = false;
  }
});

function resetForm() {
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  fullName.value = "";
  showPasswords.value = false;
}

function resetAdminForm() {
  newUserName.value = "";
  newUserEmail.value = "";
  newUserPassword.value = "";
  newUserConfirm.value = "";
  showAdminPassword.value = false;
  adminMessageType.value = "success";
}

function resetPrintWorkflow() {
  clearSelectedFile(true);
  isSendingJob.value = false;
}

function toggleAuthMode() {
  authMode.value = isSignUpMode.value ? "signin" : "signup";
  authError.value = "";
  resetForm();
}

function toggleAdminPanel() {
  if (!isAdmin.value) return;
  adminMessage.value = "";
  showAdminPanel.value = !showAdminPanel.value;
  if (!showAdminPanel.value) {
    resetAdminForm();
  }
}

function handleFileChange(event: Event) {
  fileError.value = "";
  printStatus.value = "";

  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  selectedFile.value = null;

  if (!file) {
    return;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    fileError.value = "File is too large. Please stay under 10 MB.";
    input.value = "";
    return;
  }

  selectedFile.value = file;
}

function clearSelectedFile(resetStatus = false) {
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  if (resetStatus) {
    fileError.value = "";
    printStatus.value = "";
  }
}

async function submitAuth() {
  if (isSubmitting.value) return;
  authError.value = "";

  try {
    isSubmitting.value = true;

    if (isSignUpMode.value) {
      if (password.value !== confirmPassword.value) {
        throw new Error("Passwords do not match.");
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value
      );

      const name = fullName.value.trim();
      if (name) {
        await updateProfile(credential.user, { displayName: name });
      }
    } else {
      await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
    }

    resetForm();
  } catch (error) {
    const fallback = isSignUpMode.value
      ? "Unable to create account right now."
      : "Unable to sign in right now.";
    const message = error instanceof Error ? error.message : fallback;
    authError.value = message;
  } finally {
    isSubmitting.value = false;
  }
}

async function createTeamMember() {
  if (isCreatingUser.value) return;
  if (!isAdmin.value) {
    adminMessageType.value = "error";
    adminMessage.value = "Admin access required.";
    return;
  }

  adminMessage.value = "";

  if (newUserPassword.value !== newUserConfirm.value) {
    adminMessageType.value = "error";
    adminMessage.value = "Passwords do not match.";
    return;
  }

  try {
    isCreatingUser.value = true;
    const credential = await createUserWithEmailAndPassword(
      adminAuth,
      newUserEmail.value.trim(),
      newUserPassword.value
    );

    const name = newUserName.value.trim();
    if (name) {
      await updateProfile(credential.user, { displayName: name });
    }

    adminMessageType.value = "success";
    adminMessage.value = `Successfully created ${newUserEmail.value.trim()}.`;
    await signOut(adminAuth);
    resetAdminForm();
  } catch (error) {
    adminMessageType.value = "error";
    const message =
      error instanceof Error ? error.message : "Unable to create user right now.";
    adminMessage.value = message;
  } finally {
    isCreatingUser.value = false;
  }
}

async function signOutUser() {
  try {
    await signOut(auth);
    authMode.value = "signin";
    authError.value = "";
    resetForm();
    resetAdminForm();
    adminMessage.value = "";
    resetPrintWorkflow();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to sign out right now.";
    authError.value = message;
  }
}

async function checkHealth() {
  try {
    const res = await fetch(HEALTH_ENDPOINT);
    const contentType = res.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const data = await res.json();
      response.value = JSON.stringify(data, null, 2);
    } else {
      const text = await res.text();
      response.value = text;
    }
  } catch (err) {
    response.value = "Error: " + err;
  }
}

async function submitPrintJob() {
  if (!selectedFile.value) {
    fileError.value = "Please pick a file to print.";
    return;
  }

  if (socketStatus.value !== "connected") {
    fileError.value = "Connect to the printer bridge before sending a file.";
    return;
  }

  fileError.value = "";
  printStatus.value = "Preparing file…";
  isSendingJob.value = true;

  try {
    const base64 = await encodeFileToBase64(selectedFile.value);
    const payload = {
      fileName: selectedFile.value.name,
      mimeType: selectedFile.value.type || "application/octet-stream",
      size: selectedFile.value.size,
      content: base64,
      requestedBy: user.value?.email ?? user.value?.uid ?? "unknown",
      uploadedAt: new Date().toISOString(),
    };

    socket.value?.emit("printer:job:create", payload);
    pushSocketMessage(
      `Print job sent: ${selectedFile.value.name} (${formatFileSize(
        selectedFile.value.size
      )}).`
    );
    printStatus.value = "Print job sent to the bridge.";
    clearSelectedFile();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send file right now.";
    fileError.value = message;
    printStatus.value = "";
  } finally {
    isSendingJob.value = false;
  }
}

function pushSocketMessage(message: string) {
  const timestamp = new Date().toLocaleTimeString();
  socketMessages.value = [
    `[${timestamp}] ${message}`,
    ...socketMessages.value.slice(0, 14),
  ];
}

function connectSocket() {
  if (!user.value) return;

  if (!socketUrl) {
    if (!hasWarnedMissingSocket) {
      pushSocketMessage(
        "Missing VITE_SOCKET_URL. Update your .env file to connect to the Raspberry Pi."
      );
      hasWarnedMissingSocket = true;
    }
    return;
  }

  if (socket.value) return;

  socketStatus.value = "connecting";
  const instance = io(socketUrl, {
    transports: ["websocket"],
    auth: {
      email: user.value.email ?? "",
      uid: user.value.uid,
    },
  });

  instance.on("connect", () => {
    socketStatus.value = "connected";
    pushSocketMessage("Connected to printer bridge.");
  });

  instance.on("connect_error", (error) => {
    socketStatus.value = "disconnected";
    pushSocketMessage(`Connection error: ${error.message}`);
  });

  instance.on("disconnect", (reason) => {
    socketStatus.value = "disconnected";
    pushSocketMessage(`Disconnected from printer bridge (${reason}).`);
  });

  instance.on("printer:status", (payload: { status: string }) => {
    pushSocketMessage(`Printer status: ${payload.status}`);
  });

  instance.on("printer:message", (payload: { message: string }) => {
    pushSocketMessage(payload.message);
  });

  instance.on("printer:error", (payload: { message: string }) => {
    pushSocketMessage(`Printer error: ${payload.message}`);
  });

  instance.on(
    "printer:job:accepted",
    (payload: { jobId?: string; fileName?: string } = {}) => {
      const label = payload.fileName ?? payload.jobId ?? "job";
      pushSocketMessage(`Print job accepted: ${label}.`);
      printStatus.value = "Printer received the file. Preparing to print.";
    }
  );

  instance.on(
    "printer:job:completed",
    (payload: { jobId?: string; fileName?: string } = {}) => {
      const label = payload.fileName ?? payload.jobId ?? "job";
      pushSocketMessage(`Print job completed: ${label}.`);
      printStatus.value = "Print job completed.";
    }
  );

  instance.on(
    "printer:job:error",
    (payload: { message?: string; jobId?: string } = {}) => {
      const detail = payload.message ?? "Printer reported an error.";
      pushSocketMessage(`Print job error: ${detail}`);
      fileError.value = detail;
      printStatus.value = "";
    }
  );

  socket.value = instance;
}

function teardownSocket() {
  if (!socket.value) return;

  socket.value.removeAllListeners();
  socket.value.disconnect();
  socket.value = null;
  socketStatus.value = "disconnected";
  isSendingJob.value = false;
}

function sendPrinterPing() {
  if (!socket.value || socketStatus.value !== "connected") return;

  socket.value.emit("printer:ping", {
    requestedBy: user.value?.email ?? user.value?.uid ?? "unknown",
    at: new Date().toISOString(),
  });
  pushSocketMessage("Sent ping command to printer.");
}

async function encodeFileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.brand-header {
  background: var(--color-light-peach);
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: center;
}

.brand-logo {
  height: 42px;
  width: auto;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
}

.dashboard-card {
  background: var(--color-white);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(237, 76, 76, 0.12);
  padding: 2.5rem;
  width: 100%;
  max-width: 560px;
  text-align: center;
  position: relative;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.welcome-copy {
  text-align: left;
}

.subheading {
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  color: rgba(42, 42, 42, 0.7);
  font-family: var(--font-body);
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.dashboard-heading {
  color: var(--color-cherry-red);
  font-size: clamp(1.75rem, 1.1vw + 1.5rem, 2.25rem);
}

.dashboard-card p {
  margin: 1rem 0 1.5rem;
  font-size: 1.05rem;
  line-height: 1.6;
}

.admin-panel {
  text-align: left;
}

.section-heading {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-cherry-red);
  margin: 0;
}

.section-subheading {
  margin: 0.5rem 0 1.75rem;
  font-size: 1rem;
  color: rgba(42, 42, 42, 0.8);
}

.print-job {
  text-align: left;
  margin-top: 2.25rem;
}

.print-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-drop {
  border: 2px dashed rgba(237, 76, 76, 0.35);
  border-radius: 16px;
  padding: 1.5rem;
  display: block;
  background: rgba(255, 208, 205, 0.25);
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.file-drop:hover {
  border-color: rgba(237, 76, 76, 0.6);
  background: rgba(255, 208, 205, 0.4);
}

.file-drop.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.file-input {
  display: none;
}

.file-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.file-icon {
  font-size: 2rem;
}

.file-title {
  margin: 0;
  font-weight: 600;
  color: var(--color-text);
}

.file-subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: rgba(42, 42, 42, 0.7);
}

.status-banner {
  margin: 0;
  background: rgba(48, 181, 102, 0.15);
  color: #237347;
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 600;
}

.print-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.primary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-cherry-red);
  color: var(--color-white);
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.9rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 12px 24px rgba(237, 76, 76, 0.22);
}

.primary-action:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.primary-action:hover {
  background: var(--color-peach);
  transform: translateY(-1px);
}

.primary-action:focus-visible {
  outline: 3px solid rgba(237, 76, 76, 0.35);
  outline-offset: 2px;
}

.secondary-action {
  background: transparent;
  color: var(--color-cherry-red);
  border: 1px solid rgba(237, 76, 76, 0.3);
  border-radius: 999px;
  padding: 0.45rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.secondary-action:hover {
  background: rgba(237, 76, 76, 0.08);
  border-color: rgba(237, 76, 76, 0.45);
}

.loading-text {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-cherry-red);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-inline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(42, 42, 42, 0.8);
}

.input-inline input {
  width: auto;
  accent-color: var(--color-cherry-red);
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--color-text);
}

.input-group span {
  font-weight: 600;
}

.input-group input {
  width: 100%;
  padding: 0.75rem 0.95rem;
  border-radius: 12px;
  border: 1px solid rgba(237, 76, 76, 0.25);
  background: rgba(255, 255, 255, 0.92);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--color-cherry-red);
  box-shadow: 0 0 0 3px rgba(237, 76, 76, 0.2);
}

.auth-error {
  margin: 0;
  background: rgba(237, 76, 76, 0.12);
  color: var(--color-cherry-red);
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 600;
}

.admin-feedback {
  margin: 0;
  background: rgba(237, 76, 76, 0.12);
  color: var(--color-cherry-red);
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 600;
}

.admin-feedback.is-error {
  background: rgba(237, 76, 76, 0.16);
}

.form-toggle {
  margin-top: 1.5rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.link-button {
  background: none;
  border: none;
  color: var(--color-cherry-red);
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  font-family: var(--font-body);
}

.link-button:hover {
  color: var(--color-peach);
}

.socket-panel {
  margin: 2rem 0 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 208, 205, 0.4);
  border-radius: 16px;
}

.socket-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(42, 42, 42, 0.2);
  position: relative;
}

.status-indicator::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: inherit;
  border: 2px solid transparent;
}

.status-indicator.connected {
  background: #30b566;
}

.status-indicator.connected::after {
  border-color: rgba(48, 181, 102, 0.3);
}

.status-indicator.connecting {
  background: #f0b429;
}

.status-indicator.connecting::after {
  border-color: rgba(240, 180, 41, 0.28);
}

.status-indicator.disconnected {
  background: #d14343;
}

.status-indicator.disconnected::after {
  border-color: rgba(209, 67, 67, 0.25);
}

.status-label {
  margin: 0;
  font-weight: 600;
  color: var(--color-text);
}

.status-meta {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(42, 42, 42, 0.6);
}

.status-meta.warning {
  color: #d14343;
}

.socket-log {
  list-style: none;
  text-align: left;
  padding: 0;
  margin: 0 0 1.75rem;
  display: grid;
  gap: 0.5rem;
  max-height: 180px;
  overflow-y: auto;
}

.socket-log li {
  padding: 0.65rem 0.9rem;
  border-radius: 12px;
  background: rgba(255, 208, 205, 0.6);
  font-size: 0.9rem;
  color: var(--color-text);
}

.response {
  margin-top: 1.75rem;
  background: var(--color-light-peach);
  border-radius: 12px;
  padding: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
  word-break: break-word;
  text-align: left;
  color: var(--color-text);
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .content {
    padding: 2rem 1rem;
  }

  .dashboard-card {
    padding: 2rem 1.5rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .card-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .socket-panel {
    flex-direction: column;
    align-items: flex-start;
  }

  .print-actions {
    flex-direction: column-reverse;
    width: 100%;
    align-items: stretch;
  }
}
</style>
