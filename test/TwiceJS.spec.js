import TwiceJS from '../index'

describe('TwiceJS', () => {

    it('Should instantiate TwiceJS class correctly', () => {
        const dataset = new TwiceJS()
        expect(dataset).toBeInstanceOf(TwiceJS)
    })

    it('Should dedupe simple array', () => {
        const iterable = [1, 1, 2, 1, 3, 3]
        const dataset = new TwiceJS()

        dataset.append(iterable)

        expect(iterable.length).toEqual(6)
        expect(dataset.entries.length).toEqual(3)
    })

})
