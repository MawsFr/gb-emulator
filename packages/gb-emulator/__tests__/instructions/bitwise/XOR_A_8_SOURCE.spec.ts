import { describe, expect, it } from 'vitest'
import { XOR_A_IMM8, XOR_A_R8 } from '@/instructions/bitwise/XOR_A_8_SOURCE.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(XOR_A_R8, () => {
    it<GbEmulatorTestContext>('should bitwise XOR the value of a register to A', ({
        cpu,
        registers,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0b11001100
        registers.B.value = 0b10101010
        const expectedValue = 0b01100110

        // When
        new XOR_A_R8(cpu, 0b000).execute()

        // Then
        expect(registers.A.value).to.equal(expectedValue)
        expect(registers.B.value).to.equal(0b10101010)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(0)
        expect(registers.PC.value).to.equal(0x1)
    })
})

describe(XOR_A_IMM8, () => {
    it<GbEmulatorTestContext>('should bitwise XOR the immediate value to A', ({
        cpu,
        memory,
        registers,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0b11001100
        memory.write(0x1, 0b10101010)
        const expectedValue = 0b01100110

        // When
        new XOR_A_IMM8(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(expectedValue)
        expect(memory.addresses[0x1]).to.equal(0b10101010)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(0)
        expect(registers.PC.value).to.equal(0x2)
    })
})
