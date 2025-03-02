import { describe, expect, it } from 'vitest'
import { R16Code } from '@/registers/registers.ts'
import { DEC_R16, DEC_R16_OPCODES } from '@/instructions/dec/DEC_R16.ts'

describe(DEC_R16, () => {
    it.for<{
        opcode: DEC_R16_OPCODES
        expectedRegister: R16Code
    }>([
        {
            opcode: 0b00001011,
            expectedRegister: 0b00,
        },
        {
            opcode: 0b00011011,
            expectedRegister: 0b01,
        },
        {
            opcode: 0b00101011,
            expectedRegister: 0b10,
        },
        {
            opcode: 0b00111011,
            expectedRegister: 0b11,
        },
    ])(
        'should decrement the value in register $expectedRegister',
        ({ opcode, expectedRegister }, { cpu, registers }) => {
            // Given
            registers.PC.value = 0x0
            registers.r16[expectedRegister].value = 0x50

            // When
            new DEC_R16(cpu).execute(opcode)

            // Then
            expect(registers.r16[expectedRegister].value).to.equal(0x4F)
            expect(registers.PC.value).to.equal(0x1)
        }
    )
})
