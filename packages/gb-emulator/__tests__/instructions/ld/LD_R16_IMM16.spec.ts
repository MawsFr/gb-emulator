import { beforeEach, describe, expect, it } from "vitest";
import { LD_R16_IMM16 } from "@/instructions/ld/LD_R16_IMM16.ts";
import { Cpu, Opcode } from "@/cpu.ts";
import { R16Code, Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";

describe(LD_R16_IMM16, () => {
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

    it.each<{ opcode: Opcode, expectedRegister: R16Code }>([
        {
            opcode: 0b00_00_0001,
            expectedRegister: 0b00
        },
        {
            opcode: 0b00_01_0001,
            expectedRegister: 0b01
        },
        {
            opcode: 0b00_10_0001,
            expectedRegister: 0b10
        },
        {
            opcode: 0b00_11_0001,
            expectedRegister: 0b11
        }
    ])('should load the 2 next bytes into a 16 bits register', (
        {
            opcode, expectedRegister
        }) => {
        // Given
        registers.PC.value = 0x0
        memory.addresses[0x0] = 0x01
        memory.addresses[0x1] = 0x12
        memory.addresses[0x2] = 0x34

        // When
        new LD_R16_IMM16(cpu).execute(opcode)

        // Then
        expect(registers.r16[expectedRegister].value).to.equal(0x1234)
        expect(registers.PC.value).to.equal(0x3)
    })
});