export function displayName(username?: string, displayName?: string) {
  if (!username) return 'Unknown';
  if (!displayName) return username;
  if (username.toLowerCase() !== displayName.toLowerCase()) return username;
  return displayName;
}

export function overflow(enable: boolean) {
  const e = document.getElementsByTagName('html')[0];
  if (!e) return;
  if (enable) e.style.overflowY = 'hidden';
  else e.style.overflowY = 'scroll';
}
