import { describe, expect, it } from 'vitest'
import {
    ADD_HL_R16,
    ADD_HL_R16_OPCODES,
} from '@/instructions/add/ADD_HL_R16.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(ADD_HL_R16, () => {
    it.for<
        {
            opcode: ADD_HL_R16_OPCODES
            expectedRegister: string
            expectedValue: number
            expectedCarryFlag: number
            expectedHalfCarryFlag: number
        },
        GbEmulatorTestContext
    >([
        {
            opcode: 0b00_00_1001,
            expectedRegister: 'BC',
            expectedValue: 0b1111111111111111,
            expectedCarryFlag: 0,
            expectedHalfCarryFlag: 0,
        },
        {
            opcode: 0b00_01_1001,
            expectedRegister: 'DE',
            expectedValue: 0b0000100000000000,
            expectedCarryFlag: 1,
            expectedHalfCarryFlag: 0,
        },
        {
            opcode: 0b00_10_1001,
            expectedRegister: 'HL',
            expectedValue: 0b0001000000000000,
            expectedCarryFlag: 1,
            expectedHalfCarryFlag: 1,
        },
        {
            opcode: 0b00_11_1001,
            expectedRegister: 'SP',
            expectedValue: 0b1001000000000000,
            expectedCarryFlag: 0,
            expectedHalfCarryFlag: 1,
        },
    ])(
        'should add $expectedValue from register $expectedRegister value to HL',
        (
            { opcode, expectedValue, expectedCarryFlag, expectedHalfCarryFlag },
            { cpu, registers }
        ) => {
            // Given
            registers.PC.value = 0x0
            registers.BC.value = 0b0111011111111111
            registers.SP.value = 0b0000100000000000
            registers.DE.value = 0b1000000000000000
            registers.HL.value = 0b1000100000000000
            registers.F.zeroFlag = 1
            registers.F.subtractionFlag = 1
            registers.F.carryFlag = 1
            registers.F.halfCarryFlag = 1

            // When
            new ADD_HL_R16(cpu).execute(opcode)

            // Then
            expect(registers.HL.value).to.equal(expectedValue)
            expect(registers.PC.value).to.equal(0x1)
            expect(registers.F.zeroFlag).to.equal(0)
            expect(registers.F.subtractionFlag).to.equal(0)
            expect(registers.F.carryFlag).to.equal(expectedCarryFlag)
            expect(registers.F.halfCarryFlag).to.equal(expectedHalfCarryFlag)
        }
    )
})
