import TwiceJS from '../index'

function ArrayDataset(options = {}) {
	const iterable = [1, 1, 2, 1, 3, 3]
	const dataset = (new TwiceJS(options)).append(iterable)
	return { iterable, dataset }
}

function objectDataset(options = {}) {
	const iterable = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 3 }]
	const dataset = (new TwiceJS(options)).append(iterable)
	return { iterable, dataset }
}

describe('TwiceJS', () => {

	describe('Basics', () => {

		it('Should instantiate TwiceJS class correctly', () => {
			const dataset = new TwiceJS()
			expect(dataset).toBeInstanceOf(TwiceJS)
		})

		it('Should dedupe simple array', () => {
			const { iterable, dataset } = ArrayDataset()

			expect(iterable.length).toEqual(6)
			expect(dataset.isEmpty()).toBeFalse()
			expect(dataset.entries.length).toEqual(3)
		})

		it('Should dedupe complex array', () => {
			const { iterable, dataset } = objectDataset()

			expect(iterable.length).toEqual(6)
			expect(dataset.isEmpty()).toBeFalse()
			expect(dataset.entries.length).toEqual(3)
		})

		it('should verify if an entry exists on a simple array', () => {
			const { dataset } = ArrayDataset()

			expect(dataset.has(1)).toBeTrue()
			expect(dataset.has(7)).toBeFalse()
		})

		it('should verify if an entry exists on a complex array', () => {
			const { dataset } = objectDataset()

			expect(dataset.has({ id: 1 })).toBeTrue()
			expect(dataset.has({ id: 7 })).toBeFalse()
		})

		it('Should replace an element', () => {
			const { dataset } = objectDataset()

			expect(dataset.entries).not.toContainValue({ id: 4 })
			expect(dataset.entries).toContainValue({ id: 1 })

			dataset.replace({ id: 1 }, { id: 4 })

			expect(dataset.entries).not.toContainValue({ id: 1 })
			expect(dataset.entries).toContainValue({ id: 4 })
		})

		it('Should remove an element', () => {
			const { dataset } = objectDataset()

			expect(dataset.entries).toContainValue({ id: 1 })

			dataset.remove({ id: 1 })

			expect(dataset.entries).not.toContainValue({ id: 1 })
		})

		it('Should count occurences of an element', () => {
			const { dataset } = objectDataset()

			expect(dataset.occurrence({ id: 1 })).toEqual(3)
			expect(dataset.occurrence({ id: 2 })).toEqual(1)
			expect(dataset.occurrence({ id: 3 })).toEqual(2)
		})

		it('Should returns entries with occurrences count key', () => {
			const { dataset } = objectDataset()

			expect(dataset.withCount[0].id).toEqual(1)
			expect(dataset.withCount[0]._count).toEqual(3)

			expect(dataset.withCount[1].id).toEqual(2)
			expect(dataset.withCount[1]._count).toEqual(1)

			expect(dataset.withCount[2].id).toEqual(3)
			expect(dataset.withCount[2]._count).toEqual(2)
		})

	})

	describe('Encoding/Decoding', () => {

		it('Should JSON encode entries correctly', () => {
			const { dataset } = objectDataset()

			expect(dataset.encodedEntries).toContainAllValues(['{"id":1}', '{"id":2}', '{"id":3}'])
		})

		it('Should base64 encode entries correctly ', () => {
			const { dataset } = objectDataset({
				key_encoder: TwiceJS.ENCODERS.BASE_64
			})

			expect(dataset.encodedEntries).toContainAllValues(['eyJpZCI6MX0=', 'eyJpZCI6Mn0=', 'eyJpZCI6M30='])
		})

		it('Should JSON decode entries correctly', () => {
			const { dataset } = objectDataset()

			expect(dataset.entries).toContainAllValues([{ id: 1 }, { id: 2 }, { id: 3 }])
		})

		it('Should base64 decode entries correctly ', () => {
			const { dataset } = objectDataset({
				key_encoder: TwiceJS.ENCODERS.BASE_64
			})

			expect(dataset.entries).toContainAllValues([{ id: 1 }, { id: 2 }, { id: 3 }])
		})

		it('Should JSON encode entry correctly', () => {
			const { dataset } = objectDataset()

			expect(dataset.encode({ id: 1 })).toEqual('{"id":1}')
		})

		it('Should base64 encode entry correctly ', () => {
			const { dataset } = objectDataset({
				key_encoder: TwiceJS.ENCODERS.BASE_64
			})

			expect(dataset.encode({ id: 1 })).toEqual('eyJpZCI6MX0=')
		})

		it('Should JSON decode entry correctly', () => {
			const { dataset } = objectDataset()

			expect(dataset.decode('{"id":1}')).toEqual({ id: 1 })
		})

		it('Should base64 decode entry correctly ', () => {
			const { dataset } = objectDataset({
				key_encoder: TwiceJS.ENCODERS.BASE_64
			})

			expect(dataset.decode('eyJpZCI6MX0=')).toEqual({ id: 1 })
		})

	})

})
