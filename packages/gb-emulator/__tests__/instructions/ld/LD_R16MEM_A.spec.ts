import { beforeEach, describe, expect, it } from "vitest";
import { LD_R16MEM_A, LD_R16MEM_A_OPCODES } from "@/instructions/ld/LD_R16MEM_A.ts";
import { R16Code, Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";

describe(LD_R16MEM_A, () => {
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

    it.each<{ opcode: LD_R16MEM_A_OPCODES, expectedRegister: R16Code, expectedValue: number }>([
        {
            opcode: 0b00_00_0010,
            expectedRegister: 0b00,
            expectedValue: 0x2
        },
        {
            opcode: 0b00_01_0010,
            expectedRegister: 0b01,
            expectedValue: 0x2
        },
        {
            opcode: 0b00_10_0010,
            expectedRegister: 0b10,
            expectedValue: 0x3
        },
        {
            opcode: 0b00_11_0010,
            expectedRegister: 0b11,
            expectedValue: 0x1
        }
    ])('should load the value of A into the address pointed by a 16 bits register', (
        {
            opcode, expectedRegister, expectedValue
        }) => {
        // Given
        memory.addresses[0x0] = 0x01
        memory.addresses[0x1] = 0x12
        memory.addresses[0x2] = 0x34

        registers.PC.value = 0x0
        registers.A.value = 0x56

        const pointedAddress = 0x2
        registers.r16mem[expectedRegister].value = pointedAddress

        // When
        new LD_R16MEM_A(cpu).execute(opcode)

        // Then
        expect(memory.addresses[pointedAddress]).to.equal(0x56)
        expect(registers.PC.value).to.equal(0x1)
        expect(registers.r16mem[expectedRegister].value).to.equal(expectedValue)
    })
})