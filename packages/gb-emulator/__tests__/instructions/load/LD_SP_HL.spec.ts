import { describe, expect, it } from 'vitest'
import { GbEmulatorTestContext } from '$/test.setup.ts'
import { LD_SP_HL } from '@/instructions/load/LD_SP_HL.ts'

describe(LD_SP_HL, () => {
    it<GbEmulatorTestContext>('should load the value of HL into SP', ({
        registers,
        cpu,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.SP.value = 0x50
        registers.HL.value = 0x1000

        // When
        new LD_SP_HL(cpu).execute()

        // Then
        expect(registers.SP.value).to.equal(0x1000)
        expect(registers.PC.value).to.equal(0x1)
    })
})
