"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRMF = generateRMF;
function generateRMF(schoolCode) {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `RMF-${schoolCode}-${year}-${random}`;
}
//# sourceMappingURL=rmf.util.js.map