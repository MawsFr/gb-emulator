import { describe, expect, it } from 'vitest'
import { RRCA } from '@/instructions/rotate/RRCA.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(RRCA, () => {
    it<GbEmulatorTestContext>('should rotate the value in register A to the right and set the carry flag', ({
        cpu,
        registers,
    }) => {
        // Given
        registers.A.value = 0b00000001

        // When
        new RRCA(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0b10000000)
    })
})
