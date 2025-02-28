import { describe, expect, it } from 'vitest'
import { OR_A_IMM8, OR_A_R8 } from '@/instructions/bitwise/OR_A_8_SOURCE.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(OR_A_R8, () => {
    it<GbEmulatorTestContext>('should bitwise OR the value of a register to A', ({
        cpu,
        registers,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0b11001100
        registers.B.value = 0b10101010
        const expectedValue = 0b11101110

        // When
        new OR_A_R8(cpu, 0b000).execute()

        // Then
        expect(registers.A.value).to.equal(expectedValue)
        expect(registers.B.value).to.equal(0b10101010)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(0)
        expect(registers.PC.value).to.equal(0x1)
    })
})

describe(OR_A_IMM8, () => {
    it<GbEmulatorTestContext>('should bitwise OR the immediate value to A', ({
        cpu,
        memory,
        registers,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0b11001100
        memory.write(0x1, 0b10101010)
        const expectedValue = 0b11101110

        // When
        new OR_A_IMM8(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(expectedValue)
        expect(memory.addresses[0x1]).to.equal(0b10101010)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(0)
        expect(registers.PC.value).to.equal(0x2)
    })
})
