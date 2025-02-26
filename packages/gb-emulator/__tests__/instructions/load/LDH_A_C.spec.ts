import { describe, expect, it } from 'vitest'
import { LDH_A_C } from '@/instructions/ld/LDH_A_C.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(LDH_A_C, () => {
    it<GbEmulatorTestContext>('should write the value at address FF00 + value in register C in register A', ({
        cpu,
        memory,
        registers,
    }) => {
        registers.PC.value = 0x0
        registers.A.value = 0x12
        registers.C.value = 0x03
        memory.addresses[0xFF03] = 0x50

        new LDH_A_C(cpu).execute()

        expect(registers.A.value).to.equal(0x50)
        expect(registers.PC.value).to.equal(0x01)
    })
})
