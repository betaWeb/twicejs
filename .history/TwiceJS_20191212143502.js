/**
 * @property {Object} options
 * @property {Map} dataset
 */
class TwiceJS {

    /**
     * @returns {Array}
     */
    get entries() {
        return Array.from(this.keys.map(this._decodeKey.bind(this)))
    }

    /**
     * @returns {Object[] | Array[]}
     */
    get withCount() {
        return this.keys.reduce((acc, key) => {
            const count = this._dataset.get(key)
            const item = this._decodeKey(key)

            if (item.constructor !== Object)
                return [...acc, [item, count]]

            return [
                ...acc,
                {
                    ...item,
                    ...{ [this.options.count_key]: count }
                }
            ]
        }, [])
    }

    /**
     * @returns {Array}
     */
    get keys() {
        return [...this._dataset.keys()]
    }

    /**
     * @returns {Boolean}
     */
    get isEmpty() {
        return this.keys.length === 0
    }

    /**
     * @returns {Map}
     */
    get rawMap() {
        return this._dataset
    }

    /**
     * @returns {Object}
     */
    static get DEFAULT_OPTIONS() {
        return {
            count_key: '_count'
        }
    }

    /**
     * @param {Object} options 
     */
    constructor(options = {}) {
        this.options = { ...TwiceJS.DEFAULT_OPTIONS, ...options }
        this.clear()
    }

    /**
     * @returns {TwiceJS}
     */
    clear() {
        this._dataset = new Map()
        return this
    }

    /**
     * @param {Array|*} data
     * @returns {TwiceJS}
     */
    append(data) {
        return this._process(data, item => {
            const key = this._keyify(item)
            let count = this._dataset.get(key) || 0

            this._dataset.set(key, count += 1)
        })
    }

    /**
     * @param {Array|*} oldKey
     * @param {Array|*} newKey
     * @returns {TwiceJS}
     */
    replace(oldKey, newKey) {
        oldKey = this._keyify(oldKey)
        newKey = this._keyify(newKey)

        if (!this._dataset.has(oldKey))
            throw new Error(`[Err] TwiceJS.set :: key '${oldKey}' doesn't exists on dataset`)

        const oldCount = this._dataset.get(oldKey)
        const newKeyExists = this._dataset.has(newKey)

        this
            .remove(oldKey)
            .append(newKey)

        if (!newKeyExists)
            this._dataset.set(newKey, oldCount)

        return this
    }

    /**
     * @param {Array|*} data
     * @returns {TwiceJS}
     */
    remove(data) {
        return this._process(data, item => {
            const key = this._keyify(item)

            if (this._dataset.has(key))
                this._dataset.delete(key)
        })
    }

    /**
     * @param {*} item 
     * @returns {Number}
     */
    count(item) {
        const key = this._keyify(item)
        return this._dataset.get(key) || 0
    }

    /**
     * @param {Array} data
     * @param {Function} process
     * @returns {TwiceJS}
     */
    _process(data, process) {
        if (!Array.isArray(data))
            data = [data]

        data = this._normalize(data)
        data.forEach(process.bind(this))
        return this
    }

    /**
     * @param {*} item 
     * @returns {String}
     */
    _keyify(item) {
        if (!Array.isArray(item) && item.constructor !== Object)
            return item.toString()

        try {
            return JSON.stringify(item)
        } catch (e) {
            throw new Error(`[Err] TwiceJS._keyify :: error on keyify item ${item}\n${e}`)
        }
    }

    /**
     * @param {String} key
     * @returns {*}
     */
    _decodeKey(key) {
        try {
            return JSON.parse(key)
        } catch (err) {
            return key;
        }
    }

    /**
     * @param {Array|Object|*} data
     * @returns {Array|Object|*}
     */
    _normalize(data) {
        try {
            return JSON.parse(JSON.stringify(data))
        } catch (e) {
            return data
        }
    }

}

if (!('TwiceJS' in window))
    window.TwiceJS = TwiceJS