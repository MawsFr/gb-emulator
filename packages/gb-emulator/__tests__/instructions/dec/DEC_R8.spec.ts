import { describe, expect, it } from 'vitest'
import { R8Code } from '@/registers.ts'
import { DEC_R8, DEC_R8_OPCODES } from '@/instructions/dec/DEC_R8.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(DEC_R8, () => {
    it.for<
        {
            opcode: DEC_R8_OPCODES
            expectedRegister: R8Code
        },
        GbEmulatorTestContext
    >([
        {
            opcode: 0b00_000_101,
            expectedRegister: 0b000,
        },
        {
            opcode: 0b00_001_101,
            expectedRegister: 0b001,
        },
        {
            opcode: 0b00_010_101,
            expectedRegister: 0b010,
        },
        {
            opcode: 0b00_011_101,
            expectedRegister: 0b011,
        },
        {
            opcode: 0b00_100_101,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00_101_101,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00_110_101,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00_111_101,
            expectedRegister: 0b111,
        },
    ])(
        'should increment the value in register $expectedRegister',
        ({ opcode, expectedRegister }, { cpu, registers }) => {
            // Given
            registers.PC.value = 0x0
            registers.r8[expectedRegister].value = 0x50

            // When
            new DEC_R8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).to.equal(0x4F)
            expect(registers.PC.value).to.equal(0x1)
        }
    )
})
