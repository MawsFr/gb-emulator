import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { RRCA } from "@/instructions/rotate/RRCA.ts";

describe(RRCA, () => {
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

    it('should rotate the value in register A to the right and set the carry flag', () => {
        // Given
        registers.A.value = 0b00000001

        // When
        new RRCA(cpu).execute()

        // Then
        expect(registers.A.value).to.equal(0b10000000)

    })
})