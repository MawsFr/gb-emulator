import { describe, expect, it } from 'vitest'
import { R8Code } from '$/src'
import {
    SWAP_R8,
    SWAP_R8_OPCODES,
} from '@/instructions/prefixed-instructions/SWAP_R8.ts'

describe(SWAP_R8, () => {
    it.for<{ opcode: SWAP_R8_OPCODES; expectedRegister: R8Code }>([
        {
            opcode: 0b00110_000,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00110_001,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00110_010,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00110_011,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00110_100,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00110_101,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00110_110,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00110_111,
            expectedRegister: 0b111,
        },
    ])(
        'should swap the value in a register',
        ({ opcode, expectedRegister }, { registers, cpu }) => {
            // Given
            registers.r8[expectedRegister].value = 0b10110101

            // When
            new SWAP_R8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).to.equal(0b01011011)
            expect(registers.F.carryFlag).to.equal(0)
            expect(registers.F.zeroFlag).to.equal(0)
            expect(registers.F.halfCarryFlag).to.equal(0)
            expect(registers.F.subtractionFlag).to.equal(0)
            expect(registers.PC.value).to.equal(1)
        }
    )
})
