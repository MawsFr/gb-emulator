import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { RRA } from "@/instructions/rotate/RRA.ts";

describe(RRA, () => {
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

    it('should rotate the value in register A to the right and load the carry flag', () => {
        // Given
        registers.A.value = 0b00000001
        registers.F.carryFlag = 1

        // When
        new RRA(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0b10000000)
        expect(registers.F.carryFlag).to.equal(1)
    })
})