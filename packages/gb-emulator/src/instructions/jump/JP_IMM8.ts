import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type JP_IMM8_OPCODE = 0b00011000

export class JP_IMM8 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        const immediate8 = this.cpu.getImmediate8()
        this.registers.PC.value += immediate8

        this.registers.PC.value++
    }
}