const TwiceJS = require('./src/TwiceJS').default

// Server side
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined' && typeof global !== 'undefined')
    module.exports = TwiceJS

// Browser side
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (!window.hasOwnProperty('Zangdar'))
        window.TwiceJS = TwiceJS

    if (!Array.prototype.TwiceJS)
        Array.prototype.dedupe = function (options) {
            const _instance = new TwiceJS(options)
            _instance.append(this)
            this.twiceJs = _instance
            return this
        }
}
