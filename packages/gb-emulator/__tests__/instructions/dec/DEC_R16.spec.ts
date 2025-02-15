import { beforeEach, describe, expect, it } from "vitest";
import { Cpu } from "@/cpu.ts";
import { R16Code, Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { DEC_R16, DEC_R16_OPCODES } from "@/instructions/dec/DEC_R16.ts";

describe(DEC_R16, () => {
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

    it.each<{ opcode: DEC_R16_OPCODES, expectedRegister: R16Code }>([
        {
            opcode: 0b00_00_1011,
            expectedRegister: 0b00
        },
        {
            opcode: 0b00_01_1011,
            expectedRegister: 0b01
        },
        {
            opcode: 0b00_10_1011,
            expectedRegister: 0b10
        },
        {
            opcode: 0b00_11_1011,
            expectedRegister: 0b11
        }
    ])('should decrement the value in register $expectedRegister', (
        {
            opcode, expectedRegister
        }) => {
        // Given
        registers.PC.value = 0x0
        registers.r16[expectedRegister].value = 0x50

        // When
        new DEC_R16(cpu).execute(opcode)

        // Then
        expect(registers.r16[expectedRegister].value).to.equal(0x4F)
        expect(registers.PC.value).to.equal(0x1)
    })
});