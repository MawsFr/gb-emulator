import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { Cpu } from "@/cpu.ts";
import { PUSH_R16STK, PUSH_R16STK_OPCODES } from "@/instructions/stack/PUSH_R16STK.ts";

describe(PUSH_R16STK, () => {
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
        opcode: PUSH_R16STK_OPCODES,
    }>([
        { opcode: 0b11_00_0101, },
        { opcode: 0b11_01_0101, },
        { opcode: 0b11_10_0101, },
        { opcode: 0b11_11_0101, }
    ])('should push the value from the register pair onto the stack', (
        {
            opcode
        }) => {
        // Given
        registers.PC.value = 0x0000
        registers.SP.value = 0xFFFE

        switch (opcode) {
            case 0b11_00_0101:
                registers.BC.value = 0x1234
                break
            case 0b11_01_0101:
                registers.DE.value = 0x1234
                break
            case 0b11_10_0101:
                registers.HL.value = 0x1234
                break
            case 0b11_11_0101:
                registers.AF.value = 0x1234
                break
        }

        // When
        new PUSH_R16STK(cpu).execute(opcode)

        // Then
        expect(memory.addresses[0xFFFD]).to.equal(0x34)
        expect(memory.addresses[0xFFFC]).to.equal(0x12)
        expect(registers.SP.value).to.equal(0xFFFC)
    })
})