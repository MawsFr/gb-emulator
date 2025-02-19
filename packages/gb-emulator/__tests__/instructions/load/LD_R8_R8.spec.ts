import { beforeEach, describe, expect, it } from "vitest";
import { LD_R8_R8 } from "@/instructions/ld/LD_R8_R8";
import { Cpu } from "@/cpu.ts";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";

describe(LD_R8_R8, () => {
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

    it('should load the value of a register into another register', () => {
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