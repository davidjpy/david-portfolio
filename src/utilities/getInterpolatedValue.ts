export const getInterpolatedValue = (numArr: number[], value: number, min: number, max: number): number => {
    const outputMax = numArr.length - 1

    if (value >= max) {
        return numArr[outputMax]
    }

    const factor = (value - min) / (max - min)
    const index = Math.floor(factor * outputMax)

    const lowerValue = numArr[index]
    const upperValue = numArr[index + 1]

    const interpolatedValue = lowerValue + (upperValue - lowerValue) * (factor * outputMax - index)

    return interpolatedValue
}
