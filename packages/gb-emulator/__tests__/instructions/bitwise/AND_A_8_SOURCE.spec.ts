import { beforeEach, describe, expect, it } from 'vitest'
import { Cpu } from '@/cpu.ts'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { AND_A_IMM8, AND_A_R8 } from '@/instructions/bitwise/AND_A_8_SOURCE.ts'

describe(AND_A_R8, () => {
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

    it('should bitwise AND the value of a register to A', () => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0b11001100
        registers.B.value = 0b10101010
        const expectedValue = 0b10001000

        // When
        new AND_A_R8(cpu, 0b000).execute()

        // Then
        expect(registers.A.value).to.equal(expectedValue)
        expect(registers.B.value).to.equal(0b10101010)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(1)
        expect(registers.PC.value).to.equal(0x1)
    })
})

describe(AND_A_IMM8, () => {
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

    it('should bitwise AND the immediate value to A', () => {
        // Given
        registers.PC.value = 0x0
        registers.A.value = 0b11001100
        memory.addresses[0x1] = 0b10101010
        const expectedValue = 0b10001000

        // When
        new AND_A_IMM8(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(expectedValue)
        expect(memory.addresses[0x1]).to.equal(0b10101010)
        expect(registers.F.zeroFlag).to.equal(0)
        expect(registers.F.subtractionFlag).to.equal(0)
        expect(registers.F.halfCarryFlag).to.equal(1)
        expect(registers.PC.value).to.equal(0x2)
    })
})
