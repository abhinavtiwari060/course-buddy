export function detectPlatform(link) {
  if (!link) return 'Unknown';
  if (link.toLowerCase().includes('youtube.com') || link.toLowerCase().includes('youtu.be')) return 'YouTube';
  if (link.toLowerCase().includes('t.me') || link.toLowerCase().includes('telegram')) return 'Telegram';
  return 'Other';
}

export function calculateProgress(completed, total) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function formatDuration(totalSeconds) {
  if (!totalSeconds) return '0s';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  
  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}
