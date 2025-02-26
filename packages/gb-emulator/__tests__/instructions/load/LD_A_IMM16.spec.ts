import { describe, expect, it } from 'vitest'
import { LD_A_IMM16 } from '@/instructions/load/LD_A_IMM16.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(LD_A_IMM16, () => {
    it<GbEmulatorTestContext>('should put register A value into the address pointed by the immediate 16 bits', ({
        cpu,
        memory,
        registers,
    }) => {
        // Given
        memory.addresses[0x0] = 0x01
        memory.addresses[0x1] = 0x51
        memory.addresses[0x2] = 0x50
        memory.addresses[0x5051] = 0x12

        registers.PC.value = 0x0
        registers.A.value = 0x01

        // When
        new LD_A_IMM16(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0x12)
        expect(registers.PC.value).to.equal(0x3)
    })
})
