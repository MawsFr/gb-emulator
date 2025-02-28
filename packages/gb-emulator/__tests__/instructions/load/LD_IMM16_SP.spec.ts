import { describe, expect, it } from 'vitest'
import { LD_IMM16_SP } from '@/instructions/load/LD_IMM16_SP.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(LD_IMM16_SP, () => {
    it<GbEmulatorTestContext>('should put SP into the address pointed by the immediate 16 bits', ({
        cpu,
        memory,
        registers,
    }) => {
        // Given
        memory.write(0x0, 0x01)
        memory.write(0x1, 0x51)
        memory.write(0x2, 0x50)
        memory.write(0x5051, 0x01)
        memory.write(0x5052, 0x01)

        registers.PC.value = 0x0
        registers.SP.value = 0x1234

        // When
        new LD_IMM16_SP(cpu).execute()

        // Then
        expect(memory.addresses[0x5051]).to.equal(0x34)
        expect(memory.addresses[0x5052]).to.equal(0x12)
        expect(registers.PC.value).to.equal(0x3)
    })
})
