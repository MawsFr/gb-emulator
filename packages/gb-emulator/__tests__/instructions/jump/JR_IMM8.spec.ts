import { describe, expect, it } from 'vitest'
import { JR_IMM8 } from '@/instructions/jump/JR_IMM8.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(JR_IMM8, () => {
    it<GbEmulatorTestContext>('should jump to the address specified by the immediate 8 bits', ({
        cpu,
        memory,
        registers,
    }) => {
        // Given
        memory.write(0x2, 0x50)

        registers.PC.value = 0x1

        // When
        new JR_IMM8(cpu).execute()

        // Then
        expect(registers.PC.value).to.equal(0x51)
    })
})
