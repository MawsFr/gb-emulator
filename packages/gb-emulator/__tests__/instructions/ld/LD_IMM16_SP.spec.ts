import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { LD_IMM16_SP } from "@/instructions/ld/LD_IMM16_SP.ts";

describe(LD_IMM16_SP, () => {
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

    it('should put SP into the address pointed by the immediate 16 bits', () => {
        // Given
        memory.addresses[0x0] = 0x01
        memory.addresses[0x1] = 0x50
        memory.addresses[0x2] = 0x51
        memory.addresses[0x5051] = 0x01
        memory.addresses[0x5052] = 0x01

        registers.PC.value = 0x0
        registers.SP.value = 0x1234

        // When
        new LD_IMM16_SP(cpu).execute()

        // Then
        expect(memory.addresses[0x5051]).to.equal(0x34)
        expect(memory.addresses[0x5052]).to.equal(0x12)
        expect(registers.PC.value).to.equal(0x3)
    })
})