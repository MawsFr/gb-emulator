import { describe, expect, it } from 'vitest'
import { JP_HL } from '@/instructions/jump/JP_HL.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(JP_HL, () => {
    it<GbEmulatorTestContext>('should jump to the address specified by the HL register', ({
        cpu,
        registers,
    }) => {
        // Given
        registers.HL.value = 0x5051

        // When
        new JP_HL(cpu).execute()

        // Then
        expect(registers.PC.value).to.equal(0x5051)
    })
})
