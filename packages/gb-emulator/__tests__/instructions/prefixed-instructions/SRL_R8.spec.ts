import { describe, expect, it } from 'vitest'
import {
    SRL_R8,
    SRL_R8_OPCODES,
} from '@/instructions/prefixed-instructions/SRL_R8.ts'
import { R8Code } from '$/src'

describe(SRL_R8, () => {
    it.for<{ opcode: SRL_R8_OPCODES; expectedRegister: R8Code }>([
        {
            opcode: 0b00111_000,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00111_001,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00111_010,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00111_011,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00111_100,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00111_101,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00111_110,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00111_111,
            expectedRegister: 0b111,
        },
    ])(
        'should shift the value in a register to the right and load the carry flag',
        ({ opcode, expectedRegister }, { registers, cpu }) => {
            // Given
            registers.r8[expectedRegister].value = 0b00000001
            registers.F.carryFlag = 0

            // When
            new SRL_R8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).to.equal(0b00000000)
            expect(registers.F.carryFlag).to.equal(1)
            expect(registers.F.zeroFlag).to.equal(1)
            expect(registers.F.halfCarryFlag).to.equal(0)
            expect(registers.F.subtractionFlag).to.equal(0)
            expect(registers.PC.value).to.equal(1)
        }
    )
})
