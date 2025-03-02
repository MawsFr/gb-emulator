import { describe, expect, it } from 'vitest'
import { R8Code } from '@/registers/registers.ts'
import { INC_R8, INC_R8_OPCODES } from '@/instructions/inc/INC_R8.ts'

describe(INC_R8, () => {
    it.for<{
        opcode: INC_R8_OPCODES
        expectedRegister: R8Code
    }>([
        {
            opcode: 0b00000100,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00001100,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00010100,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00011100,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00100100,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00101100,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00110100,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00111100,
            expectedRegister: 0b111,
        },
    ])(
        'should increment the value in register $expectedRegister',
        ({ opcode, expectedRegister }, { cpu, registers }) => {
            // Given
            registers.PC.value = 0x0
            registers.r8[expectedRegister].value = 0x50

            // When
            new INC_R8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).to.equal(0x51)
            expect(registers.PC.value).to.equal(0x1)
        }
    )
})
