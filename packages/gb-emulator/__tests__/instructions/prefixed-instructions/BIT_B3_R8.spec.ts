import { R8Code } from '@/registers/registers.ts'
import { describe, expect, it } from 'vitest'
import {
    BIT_B3_R8,
    BIT_B3_R8_OPCODES,
} from '@/instructions/prefixed-instructions/BIT_B3_R8'

describe(BIT_B3_R8, () => {
    it.for<{
        expectedRegister: R8Code
        opcodes: BIT_B3_R8_OPCODES[]
    }>([
        {
            expectedRegister: 0b000,
            opcodes: [
                0b01000000, 0b01001000, 0b01010000, 0b01011000, 0b01100000,
                0b01101000, 0b01110000, 0b01111000,
            ],
        },
        {
            expectedRegister: 0b001,
            opcodes: [
                0b01000001, 0b01001001, 0b01010001, 0b01011001, 0b01100001,
                0b01101001, 0b01110001, 0b01111001,
            ],
        },
        {
            expectedRegister: 0b010,
            opcodes: [
                0b01000010, 0b01001010, 0b01010010, 0b01011010, 0b01100010,
                0b01101010, 0b01110010, 0b01111010,
            ],
        },
        {
            expectedRegister: 0b011,
            opcodes: [
                0b01000011, 0b01001011, 0b01010011, 0b01011011, 0b01100011,
                0b01101011, 0b01110011, 0b01111011,
            ],
        },
        {
            expectedRegister: 0b100,
            opcodes: [
                0b01000100, 0b01001100, 0b01010100, 0b01011100, 0b01100100,
                0b01101100, 0b01110100, 0b01111100,
            ],
        },
        {
            expectedRegister: 0b101,
            opcodes: [
                0b01000101, 0b01001101, 0b01010101, 0b01011101, 0b01100101,
                0b01101101, 0b01110101, 0b01111101,
            ],
        },
        {
            expectedRegister: 0b110,
            opcodes: [
                0b01000110, 0b01001110, 0b01010110, 0b01011110, 0b01100110,
                0b01101110, 0b01110110, 0b01111110,
            ],
        },
        {
            expectedRegister: 0b111,
            opcodes: [
                0b01000111, 0b01001111, 0b01010111, 0b01011111, 0b01100111,
                0b01101111, 0b01110111, 0b01111111,
            ],
        },
    ])(
        'should set zero flag to 1 if nth bit of a register value is set',
        ({ opcodes, expectedRegister }, { registers, cpu }) => {
            // Given
            registers.r8[expectedRegister].value = 0b11111111

            for (const opcode of opcodes) {
                registers.F.zeroFlag = 0
                registers.F.halfCarryFlag = 0
                registers.F.subtractionFlag = 1
                registers.F.carryFlag = 1
                registers.PC.value = 0x0

                // When
                new BIT_B3_R8(cpu).execute(opcode)

                // Then
                expect(registers.F.zeroFlag).to.equal(1)
                expect(registers.F.halfCarryFlag).to.equal(1)
                expect(registers.F.subtractionFlag).to.equal(0)
                expect(registers.F.carryFlag).to.equal(1)
                expect(registers.PC.value).to.equal(0x01)
            }
        }
    )

    it.for<{
        expectedRegister: R8Code
        opcodes: BIT_B3_R8_OPCODES[]
    }>([
        {
            expectedRegister: 0b000,
            opcodes: [
                0b01000000, 0b01001000, 0b01010000, 0b01011000, 0b01100000,
                0b01101000, 0b01110000, 0b01111000,
            ],
        },
        {
            expectedRegister: 0b001,
            opcodes: [
                0b01000001, 0b01001001, 0b01010001, 0b01011001, 0b01100001,
                0b01101001, 0b01110001, 0b01111001,
            ],
        },
        {
            expectedRegister: 0b010,
            opcodes: [
                0b01000010, 0b01001010, 0b01010010, 0b01011010, 0b01100010,
                0b01101010, 0b01110010, 0b01111010,
            ],
        },
        {
            expectedRegister: 0b011,
            opcodes: [
                0b01000011, 0b01001011, 0b01010011, 0b01011011, 0b01100011,
                0b01101011, 0b01110011, 0b01111011,
            ],
        },
        {
            expectedRegister: 0b100,
            opcodes: [
                0b01000100, 0b01001100, 0b01010100, 0b01011100, 0b01100100,
                0b01101100, 0b01110100, 0b01111100,
            ],
        },
        {
            expectedRegister: 0b101,
            opcodes: [
                0b01000101, 0b01001101, 0b01010101, 0b01011101, 0b01100101,
                0b01101101, 0b01110101, 0b01111101,
            ],
        },
        {
            expectedRegister: 0b110,
            opcodes: [
                0b01000110, 0b01001110, 0b01010110, 0b01011110, 0b01100110,
                0b01101110, 0b01110110, 0b01111110,
            ],
        },
        {
            expectedRegister: 0b111,
            opcodes: [
                0b01000111, 0b01001111, 0b01010111, 0b01011111, 0b01100111,
                0b01101111, 0b01110111, 0b01111111,
            ],
        },
    ])(
        'should set zero flag to 0 if nth bit of a register value is not set',
        ({ opcodes, expectedRegister }, { registers, cpu }) => {
            // Given
            registers.r8[expectedRegister].value = 0b00000000

            for (const opcode of opcodes) {
                registers.F.zeroFlag = 1
                registers.F.halfCarryFlag = 0
                registers.F.subtractionFlag = 1
                registers.F.carryFlag = 1
                registers.PC.value = 0x0

                // When
                new BIT_B3_R8(cpu).execute(opcode)

                // Then
                expect(registers.F.zeroFlag).to.equal(0)
                expect(registers.F.halfCarryFlag).to.equal(1)
                expect(registers.F.subtractionFlag).to.equal(0)
                expect(registers.F.carryFlag).to.equal(1)
                expect(registers.PC.value).to.equal(0x01)
            }
        }
    )
})
