import { beforeEach, describe, expect, it } from 'vitest'
import { Cpu } from '@/cpu.ts'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { JP_HL } from '@/instructions/jump/JP_HL.ts'

describe(JP_HL, () => {
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

    it('should jump to the address specified by the HL register', () => {
        // Given
        registers.HL.value = 0x5051

        // When
        new JP_HL(cpu).execute()

        // Then
        expect(registers.PC.value).to.equal(0x5051)
    })
})
