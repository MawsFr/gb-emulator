import { describe, expect, it } from 'vitest'
import { JP_IMM16 } from '@/instructions/jump/JP_IMM16.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(JP_IMM16, () => {
    it<GbEmulatorTestContext>('should jump to the address specified by the immediate 16 bits', ({
        cpu,
        memory,
        registers,
    }) => {
        // Given
        memory.addresses[0x1] = 0x51
        memory.addresses[0x2] = 0x50

        registers.PC.value = 0x0

        // When
        new JP_IMM16(cpu).execute()

        // Then
        expect(registers.PC.value).to.equal(0x5051)
    })
})
