const TwiceJS = require('./src/TwiceJS')

// Server side
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined' && typeof global !== 'undefined')
    module.exports = TwiceJS

// Browser side
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    !window.hasOwnProperty('Zangdar') && (window.TwiceJS = TwiceJS)

    if (!Array.prototype.TwiceJS)
        Array.prototype.TwiceJS = function (options) {
            const _instance = new TwiceJS(options)
            return _instance.append(this)
        }
}
