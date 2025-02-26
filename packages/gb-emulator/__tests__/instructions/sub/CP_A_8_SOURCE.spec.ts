import { describe, expect, it } from 'vitest'
import { CP_A_IMM8, CP_A_R8 } from '@/instructions/sub/CP_A_8_SOURCE.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(CP_A_R8, () => {
    it<GbEmulatorTestContext>('should compare the value of a register to A', ({
        registers,
        cpu,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0x1
        registers.B.value = 0x2

        // When
        new CP_A_R8(cpu, 0b000).execute()

        // Then
        expect(registers.A.value).to.equal(0x1)
        expect(registers.B.value).to.equal(0x2)
        expect(registers.F.carryFlag).to.equal(1)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(1)
        expect(registers.F.subtractionFlag).to.equal(1)
        expect(registers.PC.value).to.equal(0x1)
    })
})

describe(CP_A_IMM8, () => {
    it<GbEmulatorTestContext>('should compare the immediate value to A', ({
        registers,
        memory,
        cpu,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0x1
        memory.addresses[0x1] = 0x2

        // When
        new CP_A_IMM8(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0x1)
        expect(memory.addresses[0x1]).to.equal(0x2)
        expect(registers.F.carryFlag).to.equal(1)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(1)
        expect(registers.F.subtractionFlag).to.equal(1)
        expect(registers.PC.value).to.equal(0x2)
    })
})
