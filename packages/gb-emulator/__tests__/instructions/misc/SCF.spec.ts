import { describe, expect, it } from 'vitest'
import { SCF } from '@/instructions/misc/SCF.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(SCF, () => {
    it<GbEmulatorTestContext>('should flip all bits in the A register', ({
        cpu,
        registers,
    }) => {
        // Given
        registers.F.carryFlag = 0

        // When
        new SCF(cpu).execute()

        // Then
        expect(registers.F.carryFlag).toBe(1)
        expect(registers.F.subtractionFlag).toBe(0)
        expect(registers.F.halfCarryFlag).toBe(0)
    })
})
