import { R8Code } from '@/registers/registers.ts'
import { describe, expect, it } from 'vitest'
import {
    RES_B3_R8,
    RES_B3_R8_OPCODES,
} from '@/instructions/prefixed-instructions/RES_B3_R8'

describe(RES_B3_R8, () => {
    it.for<{
        expectedRegister: R8Code
        opcodes: { opcode: RES_B3_R8_OPCODES; expectedValue: number }[]
    }>([
        {
            expectedRegister: 0b000,
            opcodes: [
                { opcode: 0b10000000, expectedValue: 0b11111110 },
                { opcode: 0b10001000, expectedValue: 0b11111101 },
                { opcode: 0b10010000, expectedValue: 0b11111011 },
                { opcode: 0b10011000, expectedValue: 0b11110111 },
                { opcode: 0b10100000, expectedValue: 0b11101111 },
                { opcode: 0b10101000, expectedValue: 0b11011111 },
                { opcode: 0b10110000, expectedValue: 0b10111111 },
                { opcode: 0b10111000, expectedValue: 0b01111111 },
            ],
        },
        {
            expectedRegister: 0b001,
            opcodes: [
                { opcode: 0b10000001, expectedValue: 0b11111110 },
                { opcode: 0b10001001, expectedValue: 0b11111101 },
                { opcode: 0b10010001, expectedValue: 0b11111011 },
                { opcode: 0b10011001, expectedValue: 0b11110111 },
                { opcode: 0b10100001, expectedValue: 0b11101111 },
                { opcode: 0b10101001, expectedValue: 0b11011111 },
                { opcode: 0b10110001, expectedValue: 0b10111111 },
                { opcode: 0b10111001, expectedValue: 0b01111111 },
            ],
        },
        {
            expectedRegister: 0b010,
            opcodes: [
                { opcode: 0b10000010, expectedValue: 0b11111110 },
                { opcode: 0b10001010, expectedValue: 0b11111101 },
                { opcode: 0b10010010, expectedValue: 0b11111011 },
                { opcode: 0b10011010, expectedValue: 0b11110111 },
                { opcode: 0b10100010, expectedValue: 0b11101111 },
                { opcode: 0b10101010, expectedValue: 0b11011111 },
                { opcode: 0b10110010, expectedValue: 0b10111111 },
                { opcode: 0b10111010, expectedValue: 0b01111111 },
            ],
        },
        {
            expectedRegister: 0b011,
            opcodes: [
                { opcode: 0b10000011, expectedValue: 0b11111110 },
                { opcode: 0b10001011, expectedValue: 0b11111101 },
                { opcode: 0b10010011, expectedValue: 0b11111011 },
                { opcode: 0b10011011, expectedValue: 0b11110111 },
                { opcode: 0b10100011, expectedValue: 0b11101111 },
                { opcode: 0b10101011, expectedValue: 0b11011111 },
                { opcode: 0b10110011, expectedValue: 0b10111111 },
                { opcode: 0b10111011, expectedValue: 0b01111111 },
            ],
        },
        {
            expectedRegister: 0b100,
            opcodes: [
                { opcode: 0b10000100, expectedValue: 0b11111110 },
                { opcode: 0b10001100, expectedValue: 0b11111101 },
                { opcode: 0b10010100, expectedValue: 0b11111011 },
                { opcode: 0b10011100, expectedValue: 0b11110111 },
                { opcode: 0b10100100, expectedValue: 0b11101111 },
                { opcode: 0b10101100, expectedValue: 0b11011111 },
                { opcode: 0b10110100, expectedValue: 0b10111111 },
                { opcode: 0b10111100, expectedValue: 0b01111111 },
            ],
        },
        {
            expectedRegister: 0b101,
            opcodes: [
                { opcode: 0b10000101, expectedValue: 0b11111110 },
                { opcode: 0b10001101, expectedValue: 0b11111101 },
                { opcode: 0b10010101, expectedValue: 0b11111011 },
                { opcode: 0b10011101, expectedValue: 0b11110111 },
                { opcode: 0b10100101, expectedValue: 0b11101111 },
                { opcode: 0b10101101, expectedValue: 0b11011111 },
                { opcode: 0b10110101, expectedValue: 0b10111111 },
                { opcode: 0b10111101, expectedValue: 0b01111111 },
            ],
        },
        {
            expectedRegister: 0b110,
            opcodes: [
                { opcode: 0b10000110, expectedValue: 0b11111110 },
                { opcode: 0b10001110, expectedValue: 0b11111101 },
                { opcode: 0b10010110, expectedValue: 0b11111011 },
                { opcode: 0b10011110, expectedValue: 0b11110111 },
                { opcode: 0b10100110, expectedValue: 0b11101111 },
                { opcode: 0b10101110, expectedValue: 0b11011111 },
                { opcode: 0b10110110, expectedValue: 0b10111111 },
                { opcode: 0b10111110, expectedValue: 0b01111111 },
            ],
        },
        {
            expectedRegister: 0b111,
            opcodes: [
                { opcode: 0b10000111, expectedValue: 0b11111110 },
                { opcode: 0b10001111, expectedValue: 0b11111101 },
                { opcode: 0b10010111, expectedValue: 0b11111011 },
                { opcode: 0b10011111, expectedValue: 0b11110111 },
                { opcode: 0b10100111, expectedValue: 0b11101111 },
                { opcode: 0b10101111, expectedValue: 0b11011111 },
                { opcode: 0b10110111, expectedValue: 0b10111111 },
                { opcode: 0b10111111, expectedValue: 0b01111111 },
            ],
        },
    ])(
        'should set nth bit to 0 of a register value',
        ({ opcodes, expectedRegister }, { registers, cpu }) => {
            for (const { opcode, expectedValue } of opcodes) {
                // Given
                registers.r8[expectedRegister].value = 0b11111111
                registers.F.zeroFlag = 1
                registers.F.halfCarryFlag = 1
                registers.F.subtractionFlag = 1
                registers.F.carryFlag = 1
                registers.PC.value = 0x0

                // When
                new RES_B3_R8(cpu).execute(opcode)

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
