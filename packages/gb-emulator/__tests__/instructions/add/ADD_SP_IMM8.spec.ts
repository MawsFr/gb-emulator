import { describe, expect, it } from 'vitest'
import { ADD_SP_IMM8 } from '@/instructions/add/ADD_SP_IMM8.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(ADD_SP_IMM8, () => {
    it<GbEmulatorTestContext>('should add immediate 8 bits value to SP register', ({
        registers,
        memory,
        cpu,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.SP.value = 0xFFFF
        memory.addresses[0x1] = 0xFF

        // When
        new ADD_SP_IMM8(cpu).execute()

        // Then
        expect(registers.SP.value).to.equal(0xFE)
        expect(registers.PC.value).to.equal(0x2)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(1)
        expect(registers.F.carryFlag).to.equal(1)
    })
})
