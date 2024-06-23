function secondsToHm(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursDisplay = hours > 0 ? String(hours).padStart(2, "0") : "00";
  const minutesDisplay = minutes > 0 ? String(minutes).padStart(2, "0") : "00";
  return hoursDisplay + ":" + minutesDisplay;
}
export default secondsToHm;
