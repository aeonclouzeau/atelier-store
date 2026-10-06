// Better Auth only warns on short or low-entropy secrets. The secret signs session
// cookies and the HS256 tokens accepted by /api/auth/verify-email, so a guessable one
// lets an attacker forge them. Fail closed instead.

const MIN_LENGTH = 32;
const MIN_BITS_PER_CHAR = 3.5;
const BETTER_AUTH_DEFAULT_SECRET = "better-auth-secret-12345678901234567890";
const HINT = "Generate one with `openssl rand -base64 32`.";

// Shannon entropy in bits per character.
function bitsPerChar(value: string) {
  const counts = new Map<string, number>();
  for (const char of value) counts.set(char, (counts.get(char) ?? 0) + 1);
  let bits = 0;
  for (const count of counts.values()) {
    const p = count / value.length;
    bits -= p * Math.log2(p);
  }
  return bits;
}

export function getAuthSecret() {
  const secret = process.env.BETTER_AUTH_SECRET ?? "";

  // `next build` may run without runtime secrets. Requests never run in this phase.
  if (process.env.NEXT_PHASE === "phase-production-build") return secret;

  if (!secret) {
    throw new Error(`BETTER_AUTH_SECRET is not set. ${HINT}`);
  }
  if (secret === BETTER_AUTH_DEFAULT_SECRET) {
    throw new Error(`BETTER_AUTH_SECRET is Better Auth's public default. ${HINT}`);
  }
  if (secret.length < MIN_LENGTH) {
    throw new Error(
      `BETTER_AUTH_SECRET must be at least ${MIN_LENGTH} characters. ${HINT}`,
    );
  }
  if (bitsPerChar(secret) < MIN_BITS_PER_CHAR) {
    throw new Error(`BETTER_AUTH_SECRET looks low-entropy. ${HINT}`);
  }
  return secret;
}
