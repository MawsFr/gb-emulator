import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { CCF } from "@/instructions/misc/CCF.ts";

describe(CCF, () => {
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
        registers.F.carryFlag = 0

        // When
        new CCF(cpu).execute()

        // Then
        expect(registers.F.carryFlag).toBe(1)
        expect(registers.F.subtractionFlag).toBe(0)
        expect(registers.F.halfCarryFlag).toBe(0)
    });
})