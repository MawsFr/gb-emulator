import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { POP_R16STK, POP_R16STK_OPCODES } from "@/instructions/stack/POP_R16STK.ts";

describe(POP_R16STK, () => {
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

    it.each<{
        opcode: POP_R16STK_OPCODES,
        expectedBC?: number,
        expectedDE?: number,
        expectedHL?: number,
        expectedAF?: number
    }>([
        {
            opcode: 0b11_00_0001,
            expectedBC: 0x1234
        },
        {
            opcode: 0b11_01_0001,
            expectedDE: 0x1234
        },
        {
            opcode: 0b11_10_0001,
            expectedHL: 0x1234
        },
        {
            opcode: 0b11_11_0001,
            expectedAF: 0x1234
        }
    ])('should pop the value from the stack into the register pair', (
        {
            opcode, expectedBC, expectedDE, expectedHL, expectedAF
        }) => {
        // Given
        registers.PC.value = 0x0000
        registers.SP.value = 0xFFFC

        memory.addresses[0xFFFD] = 0x34
        memory.addresses[0xFFFC] = 0x12

        // When
        new POP_R16STK(cpu).execute(opcode)

        // Then
        expect(registers.PC.value).to.equal(0x0001)
        expect(registers.SP.value).to.equal(0xFFFE)
        expect(registers.BC.value).to.equal(expectedBC ?? 0)
        expect(registers.DE.value).to.equal(expectedDE ?? 0)
        expect(registers.HL.value).to.equal(expectedHL ?? 0)
        expect(registers.AF.value).to.equal(expectedAF ?? 0)
    })
})