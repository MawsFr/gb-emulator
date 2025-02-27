import { R8Code } from '@/registers'
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
                { opcode: 0b11_000_000, expectedValue: 0b00000001 },
                { opcode: 0b11_001_000, expectedValue: 0b00000010 },
                { opcode: 0b11_010_000, expectedValue: 0b00000100 },
                { opcode: 0b11_011_000, expectedValue: 0b00001000 },
                { opcode: 0b11_100_000, expectedValue: 0b00010000 },
                { opcode: 0b11_101_000, expectedValue: 0b00100000 },
                { opcode: 0b11_110_000, expectedValue: 0b01000000 },
                { opcode: 0b11_111_000, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b001,
            opcodes: [
                { opcode: 0b11_000_001, expectedValue: 0b00000001 },
                { opcode: 0b11_001_001, expectedValue: 0b00000010 },
                { opcode: 0b11_010_001, expectedValue: 0b00000100 },
                { opcode: 0b11_011_001, expectedValue: 0b00001000 },
                { opcode: 0b11_100_001, expectedValue: 0b00010000 },
                { opcode: 0b11_101_001, expectedValue: 0b00100000 },
                { opcode: 0b11_110_001, expectedValue: 0b01000000 },
                { opcode: 0b11_111_001, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b010,
            opcodes: [
                { opcode: 0b11_000_010, expectedValue: 0b00000001 },
                { opcode: 0b11_001_010, expectedValue: 0b00000010 },
                { opcode: 0b11_010_010, expectedValue: 0b00000100 },
                { opcode: 0b11_011_010, expectedValue: 0b00001000 },
                { opcode: 0b11_100_010, expectedValue: 0b00010000 },
                { opcode: 0b11_101_010, expectedValue: 0b00100000 },
                { opcode: 0b11_110_010, expectedValue: 0b01000000 },
                { opcode: 0b11_111_010, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b011,
            opcodes: [
                { opcode: 0b11_000_011, expectedValue: 0b00000001 },
                { opcode: 0b11_001_011, expectedValue: 0b00000010 },
                { opcode: 0b11_010_011, expectedValue: 0b00000100 },
                { opcode: 0b11_011_011, expectedValue: 0b00001000 },
                { opcode: 0b11_100_011, expectedValue: 0b00010000 },
                { opcode: 0b11_101_011, expectedValue: 0b00100000 },
                { opcode: 0b11_110_011, expectedValue: 0b01000000 },
                { opcode: 0b11_111_011, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b100,
            opcodes: [
                { opcode: 0b11_000_100, expectedValue: 0b00000001 },
                { opcode: 0b11_001_100, expectedValue: 0b00000010 },
                { opcode: 0b11_010_100, expectedValue: 0b00000100 },
                { opcode: 0b11_011_100, expectedValue: 0b00001000 },
                { opcode: 0b11_100_100, expectedValue: 0b00010000 },
                { opcode: 0b11_101_100, expectedValue: 0b00100000 },
                { opcode: 0b11_110_100, expectedValue: 0b01000000 },
                { opcode: 0b11_111_100, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b101,
            opcodes: [
                { opcode: 0b11_000_101, expectedValue: 0b00000001 },
                { opcode: 0b11_001_101, expectedValue: 0b00000010 },
                { opcode: 0b11_010_101, expectedValue: 0b00000100 },
                { opcode: 0b11_011_101, expectedValue: 0b00001000 },
                { opcode: 0b11_100_101, expectedValue: 0b00010000 },
                { opcode: 0b11_101_101, expectedValue: 0b00100000 },
                { opcode: 0b11_110_101, expectedValue: 0b01000000 },
                { opcode: 0b11_111_101, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b110,
            opcodes: [
                { opcode: 0b11_000_110, expectedValue: 0b00000001 },
                { opcode: 0b11_001_110, expectedValue: 0b00000010 },
                { opcode: 0b11_010_110, expectedValue: 0b00000100 },
                { opcode: 0b11_011_110, expectedValue: 0b00001000 },
                { opcode: 0b11_100_110, expectedValue: 0b00010000 },
                { opcode: 0b11_101_110, expectedValue: 0b00100000 },
                { opcode: 0b11_110_110, expectedValue: 0b01000000 },
                { opcode: 0b11_111_110, expectedValue: 0b10000000 },
            ],
        },
        {
            expectedRegister: 0b111,
            opcodes: [
                { opcode: 0b11_000_111, expectedValue: 0b00000001 },
                { opcode: 0b11_001_111, expectedValue: 0b00000010 },
                { opcode: 0b11_010_111, expectedValue: 0b00000100 },
                { opcode: 0b11_011_111, expectedValue: 0b00001000 },
                { opcode: 0b11_100_111, expectedValue: 0b00010000 },
                { opcode: 0b11_101_111, expectedValue: 0b00100000 },
                { opcode: 0b11_110_111, expectedValue: 0b01000000 },
                { opcode: 0b11_111_111, expectedValue: 0b10000000 },
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
