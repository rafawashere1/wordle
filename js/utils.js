export class Utils {
    static areLettersEqualWithoutAccent(letter1, letter2) {
        const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normalize(letter1).toLowerCase() === normalize(letter2).toLowerCase();
    }
    static normalizeLetterWithoutAccent(letter) {
        return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
}
//# sourceMappingURL=utils.js.map