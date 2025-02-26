import { describe, expect, it } from 'vitest'
import { LD_R8_R8 } from '@/instructions/ld/LD_R8_R8'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(LD_R8_R8, () => {
    it<GbEmulatorTestContext>('should load the value of a register into another register', ({
        cpu,
        registers,
    }) => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0x1
        registers.B.value = 0x2

        // When
        new LD_R8_R8(cpu).execute(0b01111000)

        // Then
        expect(registers.A.value).to.equal(0x2)
        expect(registers.B.value).to.equal(0x2)
        expect(registers.PC.value).to.equal(0x1)
    })
})
