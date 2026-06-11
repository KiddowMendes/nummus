const API_BASE = "https://api.nummus.app/v1";

async function request<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    if (res.status === 429) throw new Error("rate_limited");
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `request_failed`);
  }
  return res.json();
}

export function sendPasswordResetEmail(email: string): Promise<void> {
  return request("/auth/reset-password", { email });
}

export function login(email: string, password: string): Promise<{ token: string }> {
  return request("/auth/login", { email, password });
}

export function register(name: string, email: string, password: string): Promise<{ token: string }> {
  return request("/auth/register", { name, email, password });
}
