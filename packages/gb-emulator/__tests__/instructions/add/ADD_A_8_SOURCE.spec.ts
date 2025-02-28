import { describe, expect, it } from 'vitest'
import { ADD_A_IMM8, ADD_A_R8 } from '@/instructions/add/ADD_A_8_SOURCE.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(ADD_A_R8, () => {
    it<GbEmulatorTestContext>('should add the value of a register to A', ({
        registers,
        cpu,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0x1
        registers.B.value = 0x2

        // When
        new ADD_A_R8(cpu, 0b000).execute()

        // Then
        expect(registers.A.value).to.equal(0x3)
        expect(registers.B.value).to.equal(0x2)
        expect(registers.PC.value).to.equal(0x1)
    })
})

describe(ADD_A_IMM8, () => {
    it<GbEmulatorTestContext>('should add the immediate value to A', ({
        registers,
        memory,
        cpu,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0x1
        memory.write(0x1, 0x2)

        // When
        new ADD_A_IMM8(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0x3)
        expect(memory.addresses[0x1]).to.equal(0x2)
        expect(registers.PC.value).to.equal(0x2)
    })
})
