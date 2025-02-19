import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type SCF_OPCODE = 0b00110111

export class SCF extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        this.registers.F.carryFlag = 1
        this.registers.F.subtractionFlag = 0
        this.registers.F.halfCarryFlag = 0

        this.registers.PC.value++
    }
}