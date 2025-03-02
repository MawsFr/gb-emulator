import { describe, expect, it } from 'vitest'
import {
    RR_R8,
    RR_R8_OPCODES,
} from '@/instructions/prefixed-instructions/RR_R8.ts'
import { R8Code } from '$/src'

describe(RR_R8, () => {
    it.for<{
        opcode: RR_R8_OPCODES
        expectedRegister: R8Code
    }>([
        {
            opcode: 0b00011000,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00011001,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00011010,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00011011,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00011100,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00011101,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00011110,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00011111,
            expectedRegister: 0b111,
        },
    ])(
        'should rotate the value in a register to the right and load the carry flag',
        ({ opcode, expectedRegister }, { cpu, registers }) => {
            // Given
            registers.r8[expectedRegister].value = 0b00000011
            registers.F.carryFlag = 1

            // When
            new RR_R8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).to.equal(0b10000001)
            expect(registers.F.carryFlag).to.equal(1)
        }
    )
})
