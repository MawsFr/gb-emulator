import { beforeEach, describe, expect, it } from 'vitest'
import { Cpu } from '@/cpu.ts'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { ADC_A_IMM8, ADC_A_R8 } from '@/instructions/add/ADC_A_8_SOURCE.ts'

describe(ADC_A_R8, () => {
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

    it('should add the value of a register and the carry flag to A', () => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0x1
        registers.B.value = 0x2
        registers.F.carryFlag = 1

        // When
        new ADC_A_R8(cpu, 0b000).execute()

        // Then
        expect(registers.A.value).to.equal(0x4)
        expect(registers.B.value).to.equal(0x2)
        expect(registers.F.carryFlag).to.equal(0)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.PC.value).to.equal(0x1)
    })
})

describe(ADC_A_IMM8, () => {
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

    it('should add the immediate value and the carry flag to A', () => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0x1
        memory.addresses[0x1] = 0x2
        registers.F.carryFlag = 1

        // When
        new ADC_A_IMM8(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0x4)
        expect(memory.addresses[0x1]).to.equal(0x2)
        expect(registers.F.carryFlag).to.equal(0)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.PC.value).to.equal(0x2)
    })
})
