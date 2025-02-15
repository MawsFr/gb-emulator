import { beforeEach, describe, expect, it, vi } from "vitest";
import { Cpu, Opcode } from "@/cpu.ts";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";

describe(Cpu, () => {
    let cpu: Cpu
    let memory: Memory
    let registers: Registers

    beforeEach(() => {
        registers = new Registers()
        memory = new Memory()
        cpu = new Cpu({
            registers,
            memory
        })

        Object.values(cpu.instructions).forEach(instruction => {
            vi.spyOn(instruction, 'execute').mockReturnValue(void 0);
        })
    })

    describe(Cpu.prototype.getImmediateBytes, () => {
        it('should return the concatenation of the next 2 bytes and skip them', () => {
            memory.addresses[0x0] = 0x01
            memory.addresses[0x1] = 0x12
            memory.addresses[0x2] = 0x34

            const value = cpu.getImmediateBytes({ count: 2 })

            expect(value).to.equal(0x1234)
            expect(registers.PC.value).to.equal(0x2)
        })
    });

    describe(Cpu.prototype.interpret, () => {
        it.each([
            "00000001",
            "00010001",
            "00100001",
            "00110001",
        ])('Opcode "%s" should call "ld r16, imm16" instruction',
            (opcodeString) => {
                // Given
                const opcode = parseInt(opcodeString, 2) as Opcode
                const instruction = cpu.instructions[opcode];

                // When
                cpu.interpret(opcode)

                // Then
                expect(instruction.execute).toHaveBeenCalledWith(opcode)
            })
    })
});