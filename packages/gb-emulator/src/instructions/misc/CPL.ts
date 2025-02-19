import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type CPL_OPCODE = 0b00101111

export class CPL extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        this.registers.A.value = ~this.registers.A.value
        this.registers.F.subtractionFlag = 1
        this.registers.F.halfCarryFlag = 1

        this.registers.PC.value++
    }
}