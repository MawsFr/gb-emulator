import { describe, expect, it } from 'vitest'
import { LDH_IMM8_A } from '@/instructions/load/LDH_IMM8_A.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(LDH_IMM8_A, () => {
    it<GbEmulatorTestContext>('should write the value in register A at address FF00 + immediate 8 bit value', ({
        cpu,
        memory,
        registers,
    }) => {
        registers.PC.value = 0x0
        registers.A.value = 0x50
        memory.write(0x1, 0x03)
        memory.write(0xFF03, 0x12)

        new LDH_IMM8_A(cpu).execute()

        expect(memory.addresses[0xFF03]).to.equal(0x50)
        expect(registers.PC.value).to.equal(0x01)
    })
})
