export function displayName(username, displayName) {
  if (!displayName) return username;
  if (username.toLowerCase() !== displayName.toLowerCase()) return username;
  return displayName;
}
