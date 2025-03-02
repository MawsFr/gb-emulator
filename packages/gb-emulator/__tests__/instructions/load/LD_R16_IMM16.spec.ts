import { describe, expect, it } from 'vitest'
import {
    LD_R16_IMM16,
    LD_R16_IMM16_OPCODES,
} from '@/instructions/load/LD_R16_IMM16.ts'
import { R16Code } from '@/registers/registers.ts'

describe(LD_R16_IMM16, () => {
    it.for<{
        opcode: LD_R16_IMM16_OPCODES
        expectedRegister: R16Code
    }>([
        {
            opcode: 0b00000001,
            expectedRegister: 0b00,
        },
        {
            opcode: 0b00010001,
            expectedRegister: 0b01,
        },
        {
            opcode: 0b00100001,
            expectedRegister: 0b10,
        },
        {
            opcode: 0b00110001,
            expectedRegister: 0b11,
        },
    ])(
        'should load the 2 next bytes into a 16 bits register',
        ({ opcode, expectedRegister }, { cpu, memory, registers }) => {
            // Given
            registers.PC.value = 0x0
            memory.write(0x0, 0x01)
            memory.write(0x1, 0x34)
            memory.write(0x2, 0x12)

            // When
            new LD_R16_IMM16(cpu).execute(opcode)

            // Then
            expect(registers.r16[expectedRegister].value).to.equal(0x1234)
            expect(registers.PC.value).to.equal(0x3)
        }
    )
})
