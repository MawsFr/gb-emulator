import { beforeEach, describe, expect, it } from "vitest";
import { R16Code, Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { LD_A_R16MEM, LD_A_R16MEM_OPCODES } from "@/instructions/ld/LD_A_R16MEM.ts";

describe(LD_A_R16MEM, () => {
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

    it.each<{ opcode: LD_A_R16MEM_OPCODES, expectedRegister: R16Code, expectedValue: number }>([
        {
            opcode: 0b00_00_1010,
            expectedRegister: 0b00,
            expectedValue: 0x1
        },
        {
            opcode: 0b00_01_1010,
            expectedRegister: 0b01,
            expectedValue: 0x1
        },
        {
            opcode: 0b00_10_1010,
            expectedRegister: 0b10,
            expectedValue: 0x2
        },
        {
            opcode: 0b00_11_1010,
            expectedRegister: 0b11,
            expectedValue: 0x0
        }
    ])('should load the value of the address pointed by a 16 bits register into A', (
        {
            opcode, expectedRegister, expectedValue
        }) => {
        // Given
        memory.addresses[0x0] = 0x01
        memory.addresses[0x1] = 0x34

        registers.PC.value = 0x0
        registers.r16mem[expectedRegister].value = 0x1
        registers.A.value = 0x12

        // When
        new LD_A_R16MEM(cpu).execute(opcode)

        // Then
        expect(registers.A.value).to.equal(0x34)
        expect(registers.PC.value).to.equal(0x1)
        expect(registers.r16mem[expectedRegister].value).to.equal(expectedValue)
    })
})