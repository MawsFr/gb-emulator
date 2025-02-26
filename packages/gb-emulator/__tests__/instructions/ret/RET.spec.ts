import { beforeEach, describe, expect, it } from 'vitest'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { Cpu } from '@/cpu.ts'
import { RET } from '@/instructions/ret/RET.ts'

describe(RET, () => {
    let registers: Registers
    let memory: Memory
    let cpu: Cpu

    beforeEach(() => {
        memory = new Memory()
        registers = new Registers(memory)
        cpu = new Cpu({
            registers,
            memory,
        })
    })

    it('should return unconditionally from a function', () => {
        registers.PC.value = 0x0050
        registers.SP.value = 0xFFFC
        memory.addresses[0xFFFC] = 0x34
        memory.addresses[0xFFFD] = 0x12

        new RET(cpu).execute()

        expect(registers.PC.value).to.equal(0x1235)
        expect(registers.SP.value).to.equal(0xFFFE)
    })
})
