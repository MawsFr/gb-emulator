import { describe, expect, it } from 'vitest'
import {
    RRC_R8,
    RRC_R8_OPCODES,
} from '@/instructions/prefixed-instructions/RRC_R8.ts'
import { R8Code } from '$/src'

describe(RRC_R8, () => {
    it.for<{
        opcode: RRC_R8_OPCODES
        expectedRegister: R8Code
    }>([
        {
            opcode: 0b00001_000,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00001_001,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00001_010,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00001_011,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00001_100,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00001_101,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00001_110,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00001_111,
            expectedRegister: 0b111,
        },
    ])(
        'should rotate the 8-bit register to the right and set the carry flag',
        ({ opcode, expectedRegister }, { registers, cpu }) => {
            // Given
            registers.PC.value = 0x0
            registers.r8[expectedRegister].value = 0b00000011

            // When
            new RRC_R8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).toEqual(0b10000001)
            expect(registers.F.carryFlag).toEqual(1)
            expect(registers.F.zeroFlag).toEqual(0)
            expect(registers.F.subtractionFlag).toEqual(0)
            expect(registers.F.halfCarryFlag).toEqual(0)
            expect(registers.PC.value).toEqual(0x1)
        }
    )
})
