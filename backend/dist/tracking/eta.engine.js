"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtaEngine = void 0;
class EtaEngine {
    static computeEta(totalStops, currentIndex, startTime) {
        const remainingStops = totalStops - currentIndex - 1;
        const minutes = remainingStops * this.AVG_MINUTES_PER_STOP;
        const eta = new Date(startTime);
        eta.setMinutes(eta.getMinutes() + minutes);
        return eta;
    }
}
exports.EtaEngine = EtaEngine;
EtaEngine.AVG_MINUTES_PER_STOP = 5;
//# sourceMappingURL=eta.engine.js.map