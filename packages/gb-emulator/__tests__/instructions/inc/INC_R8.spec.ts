import { describe, expect, it } from 'vitest'
import { R8Code } from '@/registers.ts'
import { INC_R8, INC_R8_OPCODES } from '@/instructions/inc/INC_R8.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(INC_R8, () => {
    it.for<
        {
            opcode: INC_R8_OPCODES
            expectedRegister: R8Code
        },
        GbEmulatorTestContext
    >([
        {
            opcode: 0b00_000_100,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00_001_100,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00_010_100,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00_011_100,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00_100_100,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00_101_100,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00_110_100,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00_111_100,
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
