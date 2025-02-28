import { describe, expect, it } from 'vitest'
import { GbEmulatorTestContext } from '$/test.setup.ts'
import { NOP } from '@/instructions/misc/NOP.ts'

describe(NOP, () => {
    it<GbEmulatorTestContext>('should do something', ({ cpu, registers }) => {
        // Given
        registers.PC.value = 0x0

        // When
        new NOP(cpu).execute()

        // Then
        expect(registers.PC.value).to.equal(0x1)
    })
})
