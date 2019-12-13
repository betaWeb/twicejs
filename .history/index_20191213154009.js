const TwiceJS = require('./src/TwiceJS')

if (isServerSide)
    module.exports = TwiceJS

if (isBrowserSide) {
    !window.hasOwnProperty('Zangdar') && (window.TwiceJS = TwiceJS)

    if (!Array.prototype.TwiceJS)
        Array.prototype.TwiceJS = function (options) {
            const _instance = new TwiceJS(options)
            return _instance.append(this)
        }
}