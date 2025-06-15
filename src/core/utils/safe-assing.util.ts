export function safeAssign<T>(value: T | null | undefined): T | undefined {
  return value != null ? value : undefined;
}
