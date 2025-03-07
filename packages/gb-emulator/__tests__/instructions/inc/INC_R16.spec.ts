import { describe, expect, it } from 'vitest'
import { R16Code } from '@/registers/registers.ts'
import { INC_R16, INC_R16_OPCODES } from '@/instructions/inc/INC_R16.ts'

describe(INC_R16, () => {
    it.for<{
        opcode: INC_R16_OPCODES
        expectedRegister: R16Code
    }>([
        {
            opcode: 0b00000011,
            expectedRegister: 0b00,
        },
        {
            opcode: 0b00010011,
            expectedRegister: 0b01,
        },
        {
            opcode: 0b00100011,
            expectedRegister: 0b10,
        },
        {
            opcode: 0b00110011,
            expectedRegister: 0b11,
        },
    ])(
        'should increment the value in register $expectedRegister',
        ({ opcode, expectedRegister }, { cpu, registers }) => {
            // Given
            registers.PC.value = 0x0
            registers.r16[expectedRegister].value = 0x50

            // When
            new INC_R16(cpu).execute(opcode)

            // Then
            expect(registers.r16[expectedRegister].value).to.equal(0x51)
            expect(registers.PC.value).to.equal(0x1)
        }
    )
})
