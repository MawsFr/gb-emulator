import { describe, expect, it } from 'vitest'
import { LD_R8_IMM8, LD_R8_IMM8_OPCODES } from '@/instructions/load/LD_R8_IMM8'
import { R8Code } from '@/registers/registers.ts'

describe(LD_R8_IMM8, () => {
    it.for<{
        opcode: LD_R8_IMM8_OPCODES
        expectedRegister: R8Code
    }>([
        {
            opcode: 0b00000110,
            expectedRegister: 0b00,
        },
        {
            opcode: 0b00001110,
            expectedRegister: 0b01,
        },
        {
            opcode: 0b00010110,
            expectedRegister: 0b10,
        },
        {
            opcode: 0b00011110,
            expectedRegister: 0b11,
        },
        {
            opcode: 0b00100110,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00101110,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00110110,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00111110,
            expectedRegister: 0b111,
        },
    ])(
        'should load the next bytes into a 8 bits register',
        ({ opcode, expectedRegister }, { cpu, memory, registers }) => {
            // Given
            registers.PC.value = 0x0
            memory.write(0x0, 0x01)
            memory.write(0x1, 0x12)

            // When
            new LD_R8_IMM8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).to.equal(0x12)
            expect(registers.PC.value).to.equal(0x2)
        }
    )
})
