import { beforeEach, describe, expect, it } from "vitest";
import { LD_R16_IMM16 } from "@/instructions/LD_R16_IMM16.ts";
import { Cpu } from "@/cpu.ts";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";

describe("LD instructions", () => {
    let registers: Registers
    let memory: Memory
    let cpu: Cpu

    beforeEach(() => {
        registers = new Registers()
        memory = new Memory()
        cpu = new Cpu({
            registers,
            memory
        })
    })

    describe('ld r16, imm16', () => {
        it('should load the 2 next bytes into a 16 bits register', () => {
            // Given
            const BC = 0x0
            registers.PC.value = 0x0
            memory.addresses[0x0] = 0x01
            memory.addresses[0x1] = 0x12
            memory.addresses[0x2] = 0x34

            // When
            new LD_R16_IMM16(cpu).execute({
                destination: BC
            })

            // Then
            expect(registers.BC.value).to.equal(0x1234)
            expect(registers.PC.value).to.equal(0x3)
        })
    });
});