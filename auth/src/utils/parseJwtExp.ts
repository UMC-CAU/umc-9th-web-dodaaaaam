export function parseJwtExp(token?: string | null): number | null {
  if (!token) return null;
  try {
    const [, payloadB64] = token.split(".");
    if (!payloadB64) return null;
    let b64 = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    if (pad) b64 += "=".repeat(4 - pad);
    const decoded = atob(b64);
    const { exp } = JSON.parse(decoded) as { exp?: number };
    if (typeof exp !== "number") return null;
    // 혹시 밀리초 단위로 오는 서버가 있으면 보정
    return exp > 1e12 ? Math.floor(exp / 1000) : exp;
  } catch {
    return null;
  }
}