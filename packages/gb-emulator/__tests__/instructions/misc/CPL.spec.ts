import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { CPL } from "@/instructions/misc/CPL.ts";

describe(CPL, () => {
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

    it('should flip all bits in the A register', () => {
        // Given
        registers.A.value = 0b1010_1010

        // When
        new CPL(cpu).execute()

        // Then
        expect(registers.A.value).toEqual(0b0101_0101)
        expect(registers.F.subtractionFlag).toBe(1)
        expect(registers.F.halfCarryFlag).toBe(1)
    });
})