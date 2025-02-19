import { beforeEach, describe, expect, it } from "vitest";
import { Cpu } from "@/cpu.ts";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { JP_IMM8 } from "@/instructions/jump/JP_IMM8.ts"

describe(JP_IMM8, () => {
    let registers: Registers
    let memory: Memory
    let cpu: Cpu

    beforeEach(() => {
        memory = new Memory()
        registers = new Registers(memory)
        cpu = new Cpu({
            registers,
            memory
        })
    })

    it('should jump to the address specified by the immediate 8 bits', () => {
        // Given
        memory.addresses[0x1] = 0x50

        registers.PC.value = 0x0

        // When
        new JP_IMM8(cpu).execute()

        // Then
        expect(registers.PC.value).to.equal(0x52)
    })
})