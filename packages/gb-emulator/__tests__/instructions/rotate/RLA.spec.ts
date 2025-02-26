import { describe, expect, it } from 'vitest'
import { RLA } from '@/instructions/rotate/RLA.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(RLA, () => {
    it<GbEmulatorTestContext>('should rotate the value in register A to the left and load the carry flag', ({
        cpu,
        registers,
    }) => {
        // Given
        registers.A.value = 0b10000000
        registers.F.carryFlag = 1

        // When
        new RLA(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0b00000001)
        expect(registers.F.carryFlag).to.equal(1)
    })
})
