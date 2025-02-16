import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";

export type DEC_R8_OPCODES =
    | 0b00_000_101
    | 0b00_001_101
    | 0b00_010_101
    | 0b00_011_101
    | 0b00_100_101
    | 0b00_101_101
    | 0b00_110_101
    | 0b00_111_101

export class DEC_R8 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute(opcode: DEC_R8_OPCODES) {
        const destination = this.extractDestinationR8(opcode);

        this.registers.r8[destination].value--

        this.registers.PC.value++
    }
}