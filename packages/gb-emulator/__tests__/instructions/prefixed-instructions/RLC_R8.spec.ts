import { describe, expect, it } from 'vitest'
import {
    RLC_R8,
    RLC_R8_OPCODES,
} from '@/instructions/prefixed-instructions/RLC_R8.ts'
import { R8Code } from '$/src'

describe(RLC_R8, () => {
    it.for<{
        opcode: RLC_R8_OPCODES
        expectedRegister: R8Code
    }>([
        {
            opcode: 0b00000_000,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00000_001,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00000_010,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00000_011,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00000_100,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00000_101,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00000_110,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00000_111,
            expectedRegister: 0b111,
        },
    ])(
        'should rotate the 8-bit register to the left',
        ({ opcode, expectedRegister }, { registers, cpu }) => {
            // Given
            registers.r8[expectedRegister].value = 0b11000000

            // When
            new RLC_R8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).toEqual(0b10000001)
            expect(registers.F.carryFlag).toEqual(1)
            expect(registers.F.zeroFlag).toEqual(0)
            expect(registers.F.subtractionFlag).toEqual(0)
            expect(registers.F.halfCarryFlag).toEqual(0)
        }
    )
})
