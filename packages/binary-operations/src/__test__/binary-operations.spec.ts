import { describe, expect, it } from 'vitest'
import {
    Bit,
    bitwiseAnd,
    bitwiseOr,
    bitwiseXor,
    concatBytes,
    get1stBit,
    get2ndBit,
    get3rdBit,
    get4thBit,
    getNthBit,
    isBitSet,
    isolate2FirstDigits,
    isolate2LastDigits,
    isolate2ndDigit,
    isolate3LastDigits,
    isolate3rdDigit,
    isolate4thDigit,
    isolateLeastSignificantBit,
    isolateMostSignificantBit,
    set1stBit,
    set2ndBit,
    set3rdBit,
    set4thBit,
    setNthBit,
    shiftLeftBy,
    shiftLeftBy1,
    shiftLeftBy8,
    shiftRightBy,
    shiftRightBy1,
    shiftRightBy4,
    shiftRightBy7,
    shiftRightBy8,
    toHex,
} from '../index.ts'

describe('BinaryOperations', () => {
    describe(concatBytes, () => {
        it.each<{ endianness: 'big' | 'little'; expected: number }>([
            { endianness: 'big', expected: 0x1020 },
            { endianness: 'little', expected: 0x2010 },
        ])(
            'should concat two bytes with $endianness endian',
            ({ endianness, expected }) => {
                const byte1 = 0x10
                const byte2 = 0x20

                const result = concatBytes(byte1, byte2, {
                    endianness,
                })

                expect(result).to.equal(expected)
            }
        )
    })

    describe(bitwiseXor, () => {
        it('should xor two numbers', () => {
            const num1 = 0b1010
            const num2 = 0b1100

            const result = bitwiseXor(num1, num2)

            expect(result).to.equal(0b0110)
        })
    })

    describe(bitwiseAnd, () => {
        it('should and two numbers', () => {
            const num1 = 0b1010
            const num2 = 0b1100

            const result = bitwiseAnd(num1, num2)

            expect(result).to.equal(0b1000)
        })
    })

    describe(bitwiseOr, () => {
        it('should or two numbers', () => {
            const num1 = 0b1010
            const num2 = 0b1100

            const result = bitwiseOr(num1, num2)

            expect(result).to.equal(0b1110)
        })
    })

    describe(shiftRightBy, () => {
        it('should shift right', () => {
            const num = 0b1010

            const result = shiftRightBy(1)(num)

            expect(result).to.equal(0b0101)
        })
    })

    describe(shiftLeftBy, () => {
        it('should shift left', () => {
            const num = 0b1010

            const result = shiftLeftBy(1)(num)

            expect(result).to.equal(0b10100)
        })
    })

    describe(shiftRightBy8, () => {
        it('should shift right by 8', () => {
            const num = 0x1234

            const result = shiftRightBy8(num)

            expect(result).to.equal(0x12)
        })
    })

    describe(shiftLeftBy8, () => {
        it('should shift left by 8', () => {
            const num = 0x1234

            const result = shiftLeftBy8(num)

            expect(result).to.equal(0x123400)
        })
    })

    describe(shiftRightBy4, () => {
        it('should shift right by 4', () => {
            const num = 0x1234

            const result = shiftRightBy4(num)

            expect(result).to.equal(0x123)
        })
    })

    describe(shiftRightBy1, () => {
        it('should shift right by 1', () => {
            const num = 0b1010

            const result = shiftRightBy1(num)

            expect(result).to.equal(0b0101)
        })
    })

    describe(shiftLeftBy1, () => {
        it('should shift left by 1', () => {
            const num = 0b1010

            const result = shiftLeftBy1(num)

            expect(result).to.equal(0b10100)
        })
    })

    describe(shiftRightBy7, () => {
        it('should shift right by 7', () => {
            const num = 0b10000000

            const result = shiftRightBy7(num)

            expect(result).to.equal(0b1)
        })
    })

    describe(isolate2ndDigit, () => {
        it('should isolate the second digit', () => {
            const num = 0x1234

            const result = isolate2ndDigit(num)

            expect(result).to.equal(0x2)
        })
    })

    describe(isolate3rdDigit, () => {
        it('should isolate the third digit', () => {
            const num = 0x1234

            const result = isolate3rdDigit(num)

            expect(result).to.equal(0x3)
        })
    })

    describe(isolate4thDigit, () => {
        it('should isolate the fourth digit', () => {
            const num = 0x1234

            const result = isolate4thDigit(num)

            expect(result).to.equal(0x4)
        })
    })

    describe(isolate2FirstDigits, () => {
        it('should isolate the two first digits', () => {
            const num = 0x1234

            const result = isolate2FirstDigits(num)

            expect(result).to.equal(0x12)
        })
    })

    describe(isolate2LastDigits, () => {
        it('should isolate the two last digits', () => {
            const num = 0x1234

            const result = isolate2LastDigits(num)

            expect(result).to.equal(0x34)
        })
    })

    describe(isolate3LastDigits, () => {
        it('should isolate the three last digits', () => {
            const num = 0x1234

            const result = isolate3LastDigits(num)

            expect(result).to.equal(0x234)
        })
    })

    describe(isolateLeastSignificantBit, () => {
        it('should isolate the least significant bit', () => {
            const num = 0b00000001

            const result = isolateLeastSignificantBit(num)

            expect(result).to.equal(0b1)
        })
    })

    describe(isolateMostSignificantBit, () => {
        it('should isolate the most significant bit', () => {
            const num = 0b10000000

            const result = isolateMostSignificantBit(num)

            expect(result).to.equal(0b1)
        })
    })

    describe(getNthBit, () => {
        it.for<{
            num: number
            bitIndex: number
            expected: Bit
            endianness: 'big' | 'little'
        }>([
            { num: 0b11111110, bitIndex: 0, expected: 0, endianness: 'little' },
            { num: 0b10000000, bitIndex: 7, expected: 1, endianness: 'little' },
            { num: 0b11111110, bitIndex: 0, expected: 1, endianness: 'big' },
            { num: 0b10000000, bitIndex: 7, expected: 0, endianness: 'big' },
        ])(
            'should get the nth bit',
            ({ num, bitIndex, expected, endianness }) => {
                const result = getNthBit(num, bitIndex, { endianness })
                expect(result).toBe(expected)
            }
        )
    })

    describe(get1stBit, () => {
        it('should get the 1st bit', () => {
            const num = 0b00000001

            const result = get1stBit(num)

            expect(result).toBe(1)
        })
    })

    describe(get2ndBit, () => {
        it('should get the 2nd bit', () => {
            const num = 0b00000010

            const result = get2ndBit(num)

            expect(result).toBe(1)
        })
    })

    describe(get3rdBit, () => {
        it('should get the 3rd bit', () => {
            const num = 0b0000100

            const result = get3rdBit(num)

            expect(result).toBe(1)
        })
    })

    describe(get4thBit, () => {
        it('should get the 4th bit', () => {
            const num = 0b00001000

            const result = get4thBit(num)

            expect(result).toBe(1)
        })
    })

    describe(setNthBit, () => {
        it.for<{
            num: number
            bitIndex: number
            value: Bit
            expected: number
        }>([
            { num: 0b00000000, bitIndex: 0, value: 1, expected: 0b00000001 },
            { num: 0b00000000, bitIndex: 1, value: 1, expected: 0b00000010 },
            { num: 0b00000000, bitIndex: 2, value: 1, expected: 0b00000100 },
            { num: 0b00000000, bitIndex: 3, value: 1, expected: 0b00001000 },
            { num: 0b11111111, bitIndex: 0, value: 0, expected: 0b11111110 },
            { num: 0b11111111, bitIndex: 1, value: 0, expected: 0b11111101 },
            { num: 0b11111111, bitIndex: 2, value: 0, expected: 0b11111011 },
            { num: 0b11111111, bitIndex: 3, value: 0, expected: 0b11110111 },
        ])('should set the nth bit', ({ num, bitIndex, value, expected }) => {
            const result = setNthBit({ number: num, bitIndex, value })
            expect(result).toBe(expected)
        })
    })

    describe(set1stBit, () => {
        it('should set the 1st bit', () => {
            const num = 0b00010000

            const result = set1stBit(num, 1)

            expect(result).toBe(0b00010001)
        })
    })

    describe(set2ndBit, () => {
        it('should set the 2nd bit', () => {
            const num = 0b00001000

            const result = set2ndBit(num, 1)

            expect(result).toBe(0b00001010)
        })
    })

    describe(set3rdBit, () => {
        it('should set the 3rd bit', () => {
            const num = 0b00001000

            const result = set3rdBit(num, 1)

            expect(result).toBe(0b00001100)
        })
    })

    describe(set4thBit, () => {
        it('should set the 4th bit', () => {
            const num = 0b00000010

            const result = set4thBit(num, 1)

            expect(result).toBe(0b00001010)
        })
    })

    describe(isBitSet, () => {
        it('should check if a bit is set on an 8 bit number with little endian', () => {
            const num = 0b00000001

            const result = isBitSet(num, 0)

            expect(result).toBeTruthy()
        })

        it('should check if a bit is set on an 8 bit number with big endian', () => {
            const num = 0b10000000

            const result = isBitSet(num, 0, { endianness: 'big' })

            expect(result).toBeTruthy()
        })
    })

    describe(isBitSet, () => {
        it('should check if a bit is not set with little endian', () => {
            const num = 0b01111111

            const result = isBitSet(num, 7)

            expect(result).toBeFalsy()
        })

        it('should check if a bit is not set with big endian', () => {
            const num = 0b01111111

            const result = isBitSet(num, 0, { endianness: 'big' })

            expect(result).toBeFalsy()
        })
    })

    describe(toHex, () => {
        it('should convert a number to uppercase hexadecimal', () => {
            const num = 0xFF

            const result = toHex(num)

            expect(result).to.equal('0xFF')
        })
    })
})
