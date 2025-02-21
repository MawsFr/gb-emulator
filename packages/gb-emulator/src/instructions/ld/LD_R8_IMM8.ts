import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";

export type LD_R8_IMM8_OPCODES =
    | 0b00_000_110
    | 0b00_001_110
    | 0b00_010_110
    | 0b00_011_110
    | 0b00_100_110
    | 0b00_101_110
    | 0b00_110_110
    | 0b00_111_110

export class LD_R8_IMM8 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute(opcode: LD_R8_IMM8_OPCODES) {
        const destination = this.extractDestinationR8(opcode);

        this.registers.r8[destination].value = this.cpu.getImmediate8()

        this.registers.PC.value++
    }
}