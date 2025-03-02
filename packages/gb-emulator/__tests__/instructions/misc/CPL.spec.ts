import { describe, expect, it } from 'vitest'
import { CPL } from '@/instructions/misc/CPL.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(CPL, () => {
    it<GbEmulatorTestContext>('should flip all bits in the A register', ({
        cpu,
        registers,
    }) => {
        // Given
        registers.A.value = 0b10101010

        // When
        new CPL(cpu).execute()

        // Then
        expect(registers.A.value).toEqual(0b01010101)
        expect(registers.F.subtractionFlag).toBe(1)
        expect(registers.F.halfCarryFlag).toBe(1)
    })
})
