import { R8Code } from '@/registers/registers.ts'
import { describe, expect, it } from 'vitest'
import {
    SET_B3_R8,
    SET_B3_R8_OPCODES,
} from '@/instructions/prefixed-instructions/SET_B3_R8'

describe(SET_B3_R8, () => {
    it.for<{
        expectedRegister: R8Code
        opcodes: { opcode: SET_B3_R8_OPCODES; expectedValue: number }[]
    }>([
        {
            expectedRegister: 0b000,
            opcodes: [
                { opcode: 0b11000000, expectedValue: 0b00000001 },
                { opcode: 0b11001000, expectedValue: 0b00000010 },
                { opcode: 0b11010000, expectedValue: 0b00000100 },
                { opcode: 0b11011000, expectedValue: 0b00001000 },
                { opcode: 0b11100000, expectedValue: 0b00010000 },
                { opcode: 0b11101000, expectedValue: 0b00100000 },
                { opcode: 0b11110000, expectedValue: 0b01000000 },
                { opcode: 0b11111000, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b001,
            opcodes: [
                { opcode: 0b11000001, expectedValue: 0b00000001 },
                { opcode: 0b11001001, expectedValue: 0b00000010 },
                { opcode: 0b11010001, expectedValue: 0b00000100 },
                { opcode: 0b11011001, expectedValue: 0b00001000 },
                { opcode: 0b11100001, expectedValue: 0b00010000 },
                { opcode: 0b11101001, expectedValue: 0b00100000 },
                { opcode: 0b11110001, expectedValue: 0b01000000 },
                { opcode: 0b11111001, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b010,
            opcodes: [
                { opcode: 0b11000010, expectedValue: 0b00000001 },
                { opcode: 0b11001010, expectedValue: 0b00000010 },
                { opcode: 0b11010010, expectedValue: 0b00000100 },
                { opcode: 0b11011010, expectedValue: 0b00001000 },
                { opcode: 0b11100010, expectedValue: 0b00010000 },
                { opcode: 0b11101010, expectedValue: 0b00100000 },
                { opcode: 0b11110010, expectedValue: 0b01000000 },
                { opcode: 0b11111010, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b011,
            opcodes: [
                { opcode: 0b11000011, expectedValue: 0b00000001 },
                { opcode: 0b11001011, expectedValue: 0b00000010 },
                { opcode: 0b11010011, expectedValue: 0b00000100 },
                { opcode: 0b11011011, expectedValue: 0b00001000 },
                { opcode: 0b11100011, expectedValue: 0b00010000 },
                { opcode: 0b11101011, expectedValue: 0b00100000 },
                { opcode: 0b11110011, expectedValue: 0b01000000 },
                { opcode: 0b11111011, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b100,
            opcodes: [
                { opcode: 0b11000100, expectedValue: 0b00000001 },
                { opcode: 0b11001100, expectedValue: 0b00000010 },
                { opcode: 0b11010100, expectedValue: 0b00000100 },
                { opcode: 0b11011100, expectedValue: 0b00001000 },
                { opcode: 0b11100100, expectedValue: 0b00010000 },
                { opcode: 0b11101100, expectedValue: 0b00100000 },
                { opcode: 0b11110100, expectedValue: 0b01000000 },
                { opcode: 0b11111100, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b101,
            opcodes: [
                { opcode: 0b11000101, expectedValue: 0b00000001 },
                { opcode: 0b11001101, expectedValue: 0b00000010 },
                { opcode: 0b11010101, expectedValue: 0b00000100 },
                { opcode: 0b11011101, expectedValue: 0b00001000 },
                { opcode: 0b11100101, expectedValue: 0b00010000 },
                { opcode: 0b11101101, expectedValue: 0b00100000 },
                { opcode: 0b11110101, expectedValue: 0b01000000 },
                { opcode: 0b11111101, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b110,
            opcodes: [
                { opcode: 0b11000110, expectedValue: 0b00000001 },
                { opcode: 0b11001110, expectedValue: 0b00000010 },
                { opcode: 0b11010110, expectedValue: 0b00000100 },
                { opcode: 0b11011110, expectedValue: 0b00001000 },
                { opcode: 0b11100110, expectedValue: 0b00010000 },
                { opcode: 0b11101110, expectedValue: 0b00100000 },
                { opcode: 0b11110110, expectedValue: 0b01000000 },
                { opcode: 0b11111110, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b111,
            opcodes: [
                { opcode: 0b11000111, expectedValue: 0b00000001 },
                { opcode: 0b11001111, expectedValue: 0b00000010 },
                { opcode: 0b11010111, expectedValue: 0b00000100 },
                { opcode: 0b11011111, expectedValue: 0b00001000 },
                { opcode: 0b11100111, expectedValue: 0b00010000 },
                { opcode: 0b11101111, expectedValue: 0b00100000 },
                { opcode: 0b11110111, expectedValue: 0b01000000 },
                { opcode: 0b11111111, expectedValue: 0b10000000 },
            ],
        },
    ])(
        'should set nth bit to 0 of a register value',
        ({ opcodes, expectedRegister }, { registers, cpu }) => {
            for (const { opcode, expectedValue } of opcodes) {
                // Given
                registers.r8[expectedRegister].value = 0b00000000
                registers.F.zeroFlag = 1
                registers.F.halfCarryFlag = 1
                registers.F.subtractionFlag = 1
                registers.F.carryFlag = 1
                registers.PC.value = 0x0

                // When
                new SET_B3_R8(cpu).execute(opcode)

                // Then
                expect(registers.r8[expectedRegister].value).to.equal(
                    expectedValue
                )
                expect(registers.F.zeroFlag).to.equal(1)
                expect(registers.F.halfCarryFlag).to.equal(1)
                expect(registers.F.subtractionFlag).to.equal(1)
                expect(registers.F.carryFlag).to.equal(1)
                expect(registers.PC.value).to.equal(0x01)
            }
        }
    )
})
