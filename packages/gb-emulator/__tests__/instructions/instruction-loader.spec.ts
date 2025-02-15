import { beforeEach, describe, expect, it } from "vitest";
import { Cpu } from "@/cpu.ts";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { InstructionLoader } from "@/instructions/instruction-loader.ts";

describe(InstructionLoader, () => {
    let cpu: Cpu

    beforeEach(() => {
        const registers = new Registers()
        const memory = new Memory()
        cpu = new Cpu({
            registers,
            memory
        })
    })

    describe(InstructionLoader.loadInstructions, () => {
        // When

        it('should load all instructions', () => {
            const result = InstructionLoader.loadInstructions(cpu);
            // Then
            expect(result).toHaveLength(1)
        });
    });
});