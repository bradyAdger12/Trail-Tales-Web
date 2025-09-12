export function formatDistance(distance: number, unit?: string): string {
  if (unit === "imperial") {
    return metersToMiles(distance).toFixed(2)
  }
  return (distance / 1000).toFixed(2)
}
export function distanceLabel(unit?: string, format: 'long' | 'short' = 'long'): string {
  if (unit === "imperial") {
    return format === "long" ? "Miles" : "mi";
  }
  return format === "long" ? "Kilometers" : "km";
}
export function metersToMiles(meters: number): number {
  return meters / 1609.344;
}

export function milesToKilometers(miles: number): number {
  return miles * 1.609344;
}

export function kilometersToMiles(kilometers: number): number {
  return kilometers / 1.609344;
}



// function to convert seconds into mm:ss format
export function secondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// seconds to hh:mm:ss format
export function secondsToHHMMSS(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function mmssToSeconds(mmss: string): number {
  const [minutes, seconds] = mmss.split(':').map(Number);
  return minutes * 60 + seconds;
}

