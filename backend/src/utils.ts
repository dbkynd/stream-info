function displayName(username: string, displayName?: string): string {
  if (!displayName) return username;
  if (username.toLowerCase() !== displayName.toLowerCase()) return username;
  return displayName;
}

export default {
  displayName,
};
