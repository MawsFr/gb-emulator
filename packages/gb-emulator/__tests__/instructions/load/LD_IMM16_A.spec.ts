import { describe, expect, it } from 'vitest'
import { LD_IMM16_A } from '@/instructions/load/LD_IMM16_A.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(LD_IMM16_A, () => {
    it<GbEmulatorTestContext>('should put register A value into the address pointed by the immediate 16 bits', ({
        cpu,
        memory,
        registers,
    }) => {
        // Given
        memory.write(0x0, 0x01)
        memory.write(0x1, 0x51)
        memory.write(0x2, 0x50)
        memory.write(0x5051, 0x01)

        registers.PC.value = 0x0
        registers.A.value = 0x12

        // When
        new LD_IMM16_A(cpu).execute()

        // Then
        expect(memory.addresses[0x5051]).to.equal(0x12)
        expect(registers.PC.value).to.equal(0x3)
    })
})
