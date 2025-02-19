import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type STOP_OPCODE = 0b00010000

export class STOP extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        throw new Error("STOP instruction not implemented")
    }
}