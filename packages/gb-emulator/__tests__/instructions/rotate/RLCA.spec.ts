import { describe, expect, it } from 'vitest'
import { RLCA } from '@/instructions/rotate/RLCA.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(RLCA, () => {
    it<GbEmulatorTestContext>('should rotate the value in register A to the left and set the carry flag', ({
        registers,
        cpu,
    }) => {
        // Given
        registers.A.value = 0b10000000

        // When
        new RLCA(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0b00000001)
        expect(registers.F.carryFlag).to.equal(1)
    })
})
