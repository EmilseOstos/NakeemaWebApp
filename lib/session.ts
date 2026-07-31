const SESSION_SECRET = process.env.SESSION_SECRET || 'nakeema-dev-secret-key-2026';

export type SessionUser = {
  id: string;
  email: string;
  rol: string;
};

function stringToBuffer(str: string): ArrayBuffer {
  return new TextEncoder().encode(str).buffer;
}

async function createSignature(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    stringToBuffer(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, stringToBuffer(payload));
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  const payload = JSON.stringify(user);
  const signature = await createSignature(payload);
  const token = payload + '.' + signature;
  return btoa(token);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const decoded = atob(token);
    const lastDot = decoded.lastIndexOf('.');
    if (lastDot === -1) return null;
    const payload = decoded.slice(0, lastDot);
    const signature = decoded.slice(lastDot + 1);
    const expectedSignature = await createSignature(payload);
    if (signature !== expectedSignature) return null;
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

const RECOVERY_TTL_MS = 60 * 60 * 1000; // 1 hora

export async function createRecoveryToken(email: string): Promise<string> {
  const payload = JSON.stringify({ email, exp: Date.now() + RECOVERY_TTL_MS });
  const signature = await createSignature(payload);
  return btoa(payload + '.' + signature);
}

export async function verifyRecoveryToken(token: string): Promise<string | null> {
  try {
    const decoded = atob(token);
    const lastDot = decoded.lastIndexOf('.');
    if (lastDot === -1) return null;
    const payload = decoded.slice(0, lastDot);
    const signature = decoded.slice(lastDot + 1);
    const expectedSignature = await createSignature(payload);
    if (signature !== expectedSignature) return null;
    const data = JSON.parse(payload) as { email?: string; exp?: number };
    if (!data.email || !data.exp || data.exp < Date.now()) return null;
    return data.email;
  } catch {
    return null;
  }
}
