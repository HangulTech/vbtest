export class EtaEngine {
  static AVG_MINUTES_PER_STOP = 5;

  static computeEta(
    totalStops: number,
    currentIndex: number,
    startTime: Date
  ): Date {
    const remainingStops = totalStops - currentIndex - 1;
    const minutes = remainingStops * this.AVG_MINUTES_PER_STOP;

    const eta = new Date(startTime);
    eta.setMinutes(eta.getMinutes() + minutes);
    return eta;
  }
}
