import { R8Code } from '@/registers'
import { describe, expect, it } from 'vitest'
import {
    BIT_B3_R8,
    BIT_B3_R8_OPCODES,
} from '@/instructions/prefixed-instructions/BIT_B3_R8'

describe(BIT_B3_R8, () => {
    it.for<{
        expectedRegister: R8Code
        opcodes: BIT_B3_R8_OPCODES[]
    }>([
        {
            expectedRegister: 0b000,
            opcodes: [
                0b01_000_000, 0b01_001_000, 0b01_010_000, 0b01_011_000,
                0b01_100_000, 0b01_101_000, 0b01_110_000, 0b01_111_000,
            ],
        },
        {
            expectedRegister: 0b001,
            opcodes: [
                0b01_000_001, 0b01_001_001, 0b01_010_001, 0b01_011_001,
                0b01_100_001, 0b01_101_001, 0b01_110_001, 0b01_111_001,
            ],
        },
        {
            expectedRegister: 0b010,
            opcodes: [
                0b01_000_010, 0b01_001_010, 0b01_010_010, 0b01_011_010,
                0b01_100_010, 0b01_101_010, 0b01_110_010, 0b01_111_010,
            ],
        },
        {
            expectedRegister: 0b011,
            opcodes: [
                0b01_000_011, 0b01_001_011, 0b01_010_011, 0b01_011_011,
                0b01_100_011, 0b01_101_011, 0b01_110_011, 0b01_111_011,
            ],
        },
        {
            expectedRegister: 0b100,
            opcodes: [
                0b01_000_100, 0b01_001_100, 0b01_010_100, 0b01_011_100,
                0b01_100_100, 0b01_101_100, 0b01_110_100, 0b01_111_100,
            ],
        },
        {
            expectedRegister: 0b101,
            opcodes: [
                0b01_000_101, 0b01_001_101, 0b01_010_101, 0b01_011_101,
                0b01_100_101, 0b01_101_101, 0b01_110_101, 0b01_111_101,
            ],
        },
        {
            expectedRegister: 0b110,
            opcodes: [
                0b01_000_110, 0b01_001_110, 0b01_010_110, 0b01_011_110,
                0b01_100_110, 0b01_101_110, 0b01_110_110, 0b01_111_110,
            ],
        },
        {
            expectedRegister: 0b111,
            opcodes: [
                0b01_000_111, 0b01_001_111, 0b01_010_111, 0b01_011_111,
                0b01_100_111, 0b01_101_111, 0b01_110_111, 0b01_111_111,
            ],
        },
    ])(
        'should set zero flag to 1 if nth bit of a register value is set',
        ({ opcodes, expectedRegister }, { registers, cpu }) => {
            // Given
            registers.r8[expectedRegister].value = 0b11_111_111

            for (const opcode of opcodes) {
                registers.F.zeroFlag = 0
                registers.F.halfCarryFlag = 0
                registers.F.subtractionFlag = 1
                registers.F.carryFlag = 1
                registers.PC.value = 0x0

                // When
                new BIT_B3_R8(cpu).execute(opcode)

                // Then
                expect(registers.F.zeroFlag).to.equal(1)
                expect(registers.F.halfCarryFlag).to.equal(1)
                expect(registers.F.subtractionFlag).to.equal(0)
                expect(registers.F.carryFlag).to.equal(1)
                expect(registers.PC.value).to.equal(0x0001)
            }
        }
    )

    it.for<{
        expectedRegister: R8Code
        opcodes: BIT_B3_R8_OPCODES[]
    }>([
        {
            expectedRegister: 0b000,
            opcodes: [
                0b01_000_000, 0b01_001_000, 0b01_010_000, 0b01_011_000,
                0b01_100_000, 0b01_101_000, 0b01_110_000, 0b01_111_000,
            ],
        },
        {
            expectedRegister: 0b001,
            opcodes: [
                0b01_000_001, 0b01_001_001, 0b01_010_001, 0b01_011_001,
                0b01_100_001, 0b01_101_001, 0b01_110_001, 0b01_111_001,
            ],
        },
        {
            expectedRegister: 0b010,
            opcodes: [
                0b01_000_010, 0b01_001_010, 0b01_010_010, 0b01_011_010,
                0b01_100_010, 0b01_101_010, 0b01_110_010, 0b01_111_010,
            ],
        },
        {
            expectedRegister: 0b011,
            opcodes: [
                0b01_000_011, 0b01_001_011, 0b01_010_011, 0b01_011_011,
                0b01_100_011, 0b01_101_011, 0b01_110_011, 0b01_111_011,
            ],
        },
        {
            expectedRegister: 0b100,
            opcodes: [
                0b01_000_100, 0b01_001_100, 0b01_010_100, 0b01_011_100,
                0b01_100_100, 0b01_101_100, 0b01_110_100, 0b01_111_100,
            ],
        },
        {
            expectedRegister: 0b101,
            opcodes: [
                0b01_000_101, 0b01_001_101, 0b01_010_101, 0b01_011_101,
                0b01_100_101, 0b01_101_101, 0b01_110_101, 0b01_111_101,
            ],
        },
        {
            expectedRegister: 0b110,
            opcodes: [
                0b01_000_110, 0b01_001_110, 0b01_010_110, 0b01_011_110,
                0b01_100_110, 0b01_101_110, 0b01_110_110, 0b01_111_110,
            ],
        },
        {
            expectedRegister: 0b111,
            opcodes: [
                0b01_000_111, 0b01_001_111, 0b01_010_111, 0b01_011_111,
                0b01_100_111, 0b01_101_111, 0b01_110_111, 0b01_111_111,
            ],
        },
    ])(
        'should set zero flag to 0 if nth bit of a register value is not set',
        ({ opcodes, expectedRegister }, { registers, cpu }) => {
            // Given
            registers.r8[expectedRegister].value = 0b00_000_000

            for (const opcode of opcodes) {
                registers.F.zeroFlag = 1
                registers.F.halfCarryFlag = 0
                registers.F.subtractionFlag = 1
                registers.F.carryFlag = 1
                registers.PC.value = 0x0

                // When
                new BIT_B3_R8(cpu).execute(opcode)

                // Then
                expect(registers.F.zeroFlag).to.equal(0)
                expect(registers.F.halfCarryFlag).to.equal(1)
                expect(registers.F.subtractionFlag).to.equal(0)
                expect(registers.F.carryFlag).to.equal(1)
                expect(registers.PC.value).to.equal(0x0001)
            }
        }
    )
})
