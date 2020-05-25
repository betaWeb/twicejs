/**
 * @property {Object} options
 * @property {Map} dataset
 */
export default class TwiceJS {

	/**
	 * @returns {Object.<String, String>}
	 */
	static get DEFAULT_OPTIONS() {
		return {
			count_key: '_count',
			key_encoder: TwiceJS.ENCODERS.JSON
		}
	}

	/**
	 * @returns {Object.<String, String>}
	 */
	static get ENCODERS() {
		return {
			JSON: 'json',
			BASE_64: 'base64'
		}
	}

	/**
	 * @returns {Array}
	 */
	get entries() {
		return Array.from(this.keys.map(this._decodeKey.bind(this)))
	}

	get encodedEntries() {
		return Array.from(this.keys)
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
	 * @returns {Map}
	 */
	get rawMap() {
		return this._dataset
	}

	/**
	 * @param {Object} options 
	 */
	constructor(options = {}) {
		this.options = { ...TwiceJS.DEFAULT_OPTIONS, ...options }
		this.clear()
	}

	/**
	 * @returns {Boolean}
	 */
	isEmpty() {
		return this.keys.length === 0 || this._dataset.size === 0
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
	 * Get if an item exists on dataset
	 * 
	 * @param {*} item 
	 * @returns Boolean
	 */
	has(item) {
		if (this.isEmpty()) return false

		const encoded_item = this._keyify(item)

		return (
			this.encodedEntries.includes(item) ||
			this.encodedEntries.includes(encoded_item) ||
			this.entries.includes(item) ||
			this.entries.includes(encoded_item)
		)
	}

	/**
	 * Get an item occurrences count
	 * 
	 * @param {*} item 
	 * @returns {Number}
	 */
	occurrence(item) {
		const key = this._keyify(item)
		return this._dataset.get(key) || 0
	}

	/**
	 * Encode an entry according the defined key_encoder option
	 * 
	 * @param {*} item 
	 * @returns {String}
	 */
	encode(item) {
		return this._keyify(item)
	}

	/**
	 * Decode an entry according the defined key_encoder option
	 * 
	 * @param {String} key
	 * @returns {*}
	 */
	decode(key) {
		return this._decodeKey(key)
	}

	/**
	 * @param {Array} data
	 * @param {Function} process
	 * @returns {TwiceJS}
	 *
	 * @private
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
	 *
	 * @private
	 */
	_keyify(item) {
		if (!Array.isArray(item) && item.constructor !== Object)
			return item.toString()

		try {
			item = JSON.stringify(item)

			if (this.options.key_encoder === TwiceJS.ENCODERS.BASE_64)
				item = btoa(item)
		} catch (e) {
			throw new Error(`[Err] TwiceJS._keyify :: error on keyify item ${item}\n${e}`)
		}
		return item
	}

	/**
	 * @param {String} key
	 * @returns {*}
	 *
	 * @private
	 */
	_decodeKey(key) {
		try {
			if (this.options.key_encoder === TwiceJS.ENCODERS.BASE_64)
				key = atob(key)

			return JSON.parse(key)
		} catch (err) {
			return key;
		}
	}

	/**
	 * @param {Array|Object|*} data
	 * @returns {Array|Object|*}
	 *
	 * @private
	 */
	_normalize(data) {
		try {
			return JSON.parse(JSON.stringify(data))
		} catch (e) {
			return data
		}
	}

}
