import { describe, expect, it } from 'vitest'
import {
    RL_R8,
    RL_R8_OPCODES,
} from '@/instructions/prefixed-instructions/RL_R8.ts'
import { R8Code } from '$/src'

describe(RL_R8, () => {
    it.for<{
        opcode: RL_R8_OPCODES
        expectedRegister: R8Code
    }>([
        {
            opcode: 0b00010_000,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00010_001,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00010_010,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00010_011,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00010_100,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00010_101,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00010_110,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00010_111,
            expectedRegister: 0b111,
        },
    ])(
        'should rotate the value in a register to the left and load the carry flag',
        ({ opcode, expectedRegister }, { cpu, registers }) => {
            // Given
            registers.r8[expectedRegister].value = 0b11000000
            registers.F.carryFlag = 1

            // When
            new RL_R8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).to.equal(0b10000001)
            expect(registers.F.carryFlag).to.equal(1)
        }
    )
})
