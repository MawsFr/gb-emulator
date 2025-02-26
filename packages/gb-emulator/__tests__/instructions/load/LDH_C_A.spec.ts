import { beforeEach, describe, expect, it } from 'vitest'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { Cpu } from '@/cpu.ts'
import { LDH_C_A } from '@/instructions/ld/LDH_C_A.ts'

describe(LDH_C_A, () => {
    let registers: Registers
    let memory: Memory
    let cpu: Cpu

    beforeEach(() => {
        memory = new Memory()
        registers = new Registers(memory)
        cpu = new Cpu({ registers, memory })
    })

    it('should write the value in register A at address FF00 + value in register C', () => {
        registers.PC.value = 0x0
        registers.A.value = 0x50
        registers.C.value = 0x03
        memory.addresses[0xFF03] = 0x12

        new LDH_C_A(cpu).execute()

        expect(memory.addresses[0xFF03]).to.equal(0x50)
        expect(registers.PC.value).to.equal(0x01)
    })
})
