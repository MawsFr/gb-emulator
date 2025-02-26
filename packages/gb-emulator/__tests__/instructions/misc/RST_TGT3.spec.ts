import { describe, expect, it } from 'vitest'
import { RST_TGT3, RST_TGT3_OPCODES } from '@/instructions/misc/RST_TGT3.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(RST_TGT3, () => {
    it.for<
        {
            opcode: RST_TGT3_OPCODES
            expectedPC: number
        },
        GbEmulatorTestContext
    >([
        {
            opcode: 0b11_000_111,
            expectedPC: 0x0018,
        },
        {
            opcode: 0b11_001_111,
            expectedPC: 0x0020,
        },
        {
            opcode: 0b11_010_111,
            expectedPC: 0x0028,
        },
        {
            opcode: 0b11_011_111,
            expectedPC: 0x0030,
        },
        {
            opcode: 0b11_100_111,
            expectedPC: 0x0038,
        },
        {
            opcode: 0b11_101_111,
            expectedPC: 0x0040,
        },
        {
            opcode: 0b11_110_111,
            expectedPC: 0x0048,
        },
        {
            opcode: 0b11_111_111,
            expectedPC: 0x0050,
        },
    ])(
        'should call the address specified by the immediate 16 bits if the condition is met',
        ({ opcode, expectedPC }, { cpu, memory, registers }) => {
            // Given
            registers.PC.value = 0x5051
            registers.SP.value = 0xFFFE

            // When
            new RST_TGT3(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).toBe(expectedPC)
            expect(registers.SP.value).toBe(0xFFFC)
            expect(memory.addresses[0xFFFD]).toBe(0x52)
            expect(memory.addresses[0xFFFC]).toBe(0x50)
        }
    )
})
