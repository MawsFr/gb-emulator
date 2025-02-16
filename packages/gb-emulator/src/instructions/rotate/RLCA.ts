import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";

export type RLCA_OPCODE = 0b00000111

export class RLCA extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        const carry = this.registers.A.value >> 7
        this.registers.A.value = (this.registers.A.value << 1) | carry
        this.registers.F.carryFlag = carry

        this.registers.PC.value++
    }
}