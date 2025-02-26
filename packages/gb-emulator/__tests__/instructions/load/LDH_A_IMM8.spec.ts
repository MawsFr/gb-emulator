import { describe, expect, it } from 'vitest'
import { LDH_A_IMM8 } from '@/instructions/load/LDH_A_IMM8.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(LDH_A_IMM8, () => {
    it<GbEmulatorTestContext>('should write the value at address FF00 + immediate 8 bit value into register A', ({
        cpu,
        memory,
        registers,
    }) => {
        registers.PC.value = 0x0
        registers.A.value = 0x12
        memory.addresses[0x1] = 0x03
        memory.addresses[0xFF03] = 0x50

        new LDH_A_IMM8(cpu).execute()

        expect(registers.A.value).to.equal(0x50)
        expect(registers.PC.value).to.equal(0x01)
    })
})
