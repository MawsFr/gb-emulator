export const concatBytes = (
    highByte: number,
    lowByte: number,
    { endianness }: { endianness: 'big' | 'little' } = {
        endianness: 'little',
    }
): number => {
    if (endianness === 'big') {
        return bitwiseOr(shiftLeftBy8(highByte), lowByte)
    }

    return bitwiseOr(highByte, shiftLeftBy8(lowByte))
}

export const bitwiseOr = (number1: number, number2: number): number =>
    // eslint-disable-next-line no-bitwise
    number1 | number2
export const bitwiseXor = (number1: number, number2: number): number =>
    // eslint-disable-next-line no-bitwise
    number1 ^ number2
export const bitwiseAnd = (number1: number, number2: number): number =>
    // eslint-disable-next-line no-bitwise
    number1 & number2

export const masks = {
    SECOND_DIGIT: 0x0F_00,
    THIRD_DIGIT: 0x00_F0,
    FOURTH_DIGIT: 0x00_0F,
    TWO_FIRST_DIGITS: 0xFF_00,
    TWO_LAST_DIGITS: 0x00_FF,
    THREE_LAST_DIGITS: 0x0F_FF,
}

export const shiftRightBy =
    (offset: number) =>
    (number_: number): number =>
        // eslint-disable-next-line no-bitwise
        number_ >> offset
export const shiftLeftBy =
    (offset: number) =>
    (number_: number): number =>
        // eslint-disable-next-line no-bitwise
        number_ << offset

export const shiftRightBy8 = shiftRightBy(8)
export const shiftLeftBy8 = shiftLeftBy(8)

export const shiftRightBy4 = shiftRightBy(4)

export const shiftRightBy1 = shiftRightBy(1)
export const shiftLeftBy1 = shiftLeftBy(1)

export const shiftRightBy7 = shiftRightBy(7)

export const isolate2ndDigit = (number_: number): number =>
    shiftRightBy8(bitwiseAnd(number_, masks.SECOND_DIGIT))
export const isolate3rdDigit = (number_: number): number =>
    shiftRightBy4(bitwiseAnd(number_, masks.THIRD_DIGIT))
export const isolate4thDigit = (number_: number): number =>
    bitwiseAnd(number_, masks.FOURTH_DIGIT)

export const isolate2FirstDigits = (number_: number): number =>
    shiftRightBy8(number_)
export const isolate2LastDigits = (number_: number): number =>
    bitwiseAnd(number_, masks.TWO_LAST_DIGITS)
export const isolate3LastDigits = (number_: number): number =>
    bitwiseAnd(number_, masks.THREE_LAST_DIGITS)

export const isolateLeastSignificantBit = (number_: number): number =>
    bitwiseAnd(number_, 0x01)
export const isolateMostSignificantBit = (number_: number): number =>
    shiftRightBy7(number_)

export const getNthBit = (number_: number, bitIndex: number): number => {
    return bitwiseAnd(shiftRightBy(bitIndex)(number_), 0x01)
}
export const get1stBit = (number_: number): number => getNthBit(number_, 0)
export const get2ndBit = (number_: number): number => getNthBit(number_, 1)
export const get3rdBit = (number_: number): number => getNthBit(number_, 2)
export const get4thBit = (number_: number): number => getNthBit(number_, 3)

export const setNthBit = ({
    number,
    bitIndex,
    value,
}: {
    number: number
    bitIndex: number
    value: number
}): number => {
    const mask = shiftLeftBy(bitIndex)(0x01)
    return value === 1 ?
            bitwiseOr(number, mask)
        :   bitwiseAnd(number, bitwiseXor(mask, 0xFF))
}

export const set1stBit = (number_: number, value: number): number =>
    setNthBit({ number: number_, bitIndex: 0, value })
export const set2ndBit = (number_: number, value: number): number =>
    setNthBit({ number: number_, bitIndex: 1, value })
export const set3rdBit = (number_: number, value: number): number =>
    setNthBit({ number: number_, bitIndex: 2, value })
export const set4thBit = (number_: number, value: number): number =>
    setNthBit({ number: number_, bitIndex: 3, value })

export const isBitSet = (
    number_: number,
    bitIndex: number,
    { endianness }: { endianness: 'big' | 'little' } = {
        endianness: 'little',
    }
): boolean => {
    return (
        getNthBit(
            number_,
            endianness === 'little' ? bitIndex : 7 - bitIndex
        ) === 1
    )
}
