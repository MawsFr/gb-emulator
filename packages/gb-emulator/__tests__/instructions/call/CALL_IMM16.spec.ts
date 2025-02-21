import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { CALL_IMM16 } from "@/instructions/call/CALL_IMM16.ts";

describe(CALL_IMM16, () => {
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

    it('should call the address specified by the immediate 16 bits', () => {
        // Given
        registers.PC.value = 0x8000

        memory.addresses[0x8001] = 0x34
        memory.addresses[0x8002] = 0x12

        registers.SP.value = 0xFFFE

        // When
        new CALL_IMM16(cpu).execute()

        // Then
        expect(registers.PC.value).to.equal(0x1234)
        expect(registers.SP.value).to.equal(0xFFFC)
        expect(memory.addresses[0xFFFD]).to.equal(0x03)
        expect(memory.addresses[0xFFFC]).to.equal(0x80)
    })
})