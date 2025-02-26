import { describe, expect, it } from 'vitest'
import { GbEmulatorTestContext } from '$/test.setup.ts'
import { LD_HL_SP_PLUS_IMM8 } from '@/instructions/load/LD_HL_SP_PLUS_IMM8.ts'

describe(LD_HL_SP_PLUS_IMM8, () => {
    it<GbEmulatorTestContext>('should load the value of SP + IMM8 into HL', ({
        cpu,
        registers,
        memory,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.HL.value = 0x5000
        registers.SP.value = 0xFFFF
        memory.addresses[0x1] = 0xFF

        // When
        new LD_HL_SP_PLUS_IMM8(cpu).execute()

        // Then
        expect(registers.HL.value).to.equal(0xFE)
        expect(registers.PC.value).to.equal(0x2)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(1)
        expect(registers.F.carryFlag).to.equal(1)
    })
})
