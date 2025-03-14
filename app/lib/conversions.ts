
export function metersToMiles(meters: number): number {
  return meters / 1609.344;
}


// function to convert seconds into mm:ss format
export function secondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function mmssToSeconds(mmss: string): number {
  const [minutes, seconds] = mmss.split(':').map(Number);
  return minutes * 60 + seconds;
}

