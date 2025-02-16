import { beforeEach, describe, expect, it, vi } from "vitest";
import { Cpu, Opcode } from "@/cpu.ts";
import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";

describe(Cpu, () => {
    let cpu: Cpu
    let memory: Memory
    let registers: Registers

    beforeEach(() => {
        memory = new Memory()
        registers = new Registers(memory)
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
        it.each<Opcode>([
            0b00000001,
            0b00010001,
            0b00100001,
            0b00110001,
            0b00000010,
            0b00010010,
            0b00100010,
            0b00110010,
            0b00001010,
            0b00011010,
            0b00101010,
            0b00111010,
            0b00001000,
            0b00000011,
            0b00010011,
            0b00100011,
            0b00110011,
            0b00001011,
            0b00011011,
            0b00101011,
            0b00111011,
            0b00001001,
            0b00011001,
            0b00101001,
            0b00111001,
            0b00000100,
            0b00001100,
            0b00010100,
            0b00011100,
            0b00100100,
            0b00101100,
            0b00110100,
            0b00111100,
            0b00000101,
            0b00001101,
            0b00010101,
            0b00011101,
            0b00100101,
            0b00101101,
            0b00110101,
            0b00111101,
            0b00000110,
            0b00001110,
            0b00010110,
            0b00011110,
            0b00100110,
            0b00101110,
            0b00110110,
            0b00111110,
        ])('should call the right instruction',
            (opcode) => {
                // Given
                const instruction = cpu.instructions[opcode];

                // When
                cpu.interpret(opcode)

                // Then
                expect(instruction.execute).toHaveBeenCalledWith(opcode)
            })
    })
});