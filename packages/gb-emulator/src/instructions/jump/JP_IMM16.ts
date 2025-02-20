import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type JP_IMM16_OPCODE = 0b11000011

export class JP_IMM16 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        this.registers.PC.value = this.cpu.getImmediate16()
    }
}