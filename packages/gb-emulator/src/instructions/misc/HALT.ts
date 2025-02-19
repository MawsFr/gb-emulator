import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type HALT_OPCODE = 0b01110110

export class HALT extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        throw new Error("HALT instruction not implemented")
    }
}