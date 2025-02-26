import { describe, expect, it } from 'vitest'
import { RRA } from '@/instructions/rotate/RRA.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(RRA, () => {
    it<GbEmulatorTestContext>('should rotate the value in register A to the right and load the carry flag', ({
        registers,
        cpu,
    }) => {
        // Given
        registers.A.value = 0b00000001
        registers.F.carryFlag = 1

        // When
        new RRA(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0b10000000)
        expect(registers.F.carryFlag).to.equal(1)
    })
})
