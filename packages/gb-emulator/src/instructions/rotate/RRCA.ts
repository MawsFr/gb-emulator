import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";

export type RRCA_OPCODE = 0b00001111

export class RRCA extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        const carry = this.registers.A.value & 0b1
        this.registers.A.value = (this.registers.A.value >> 1) | (carry << 7)
        this.registers.F.carryFlag = carry

        this.registers.PC.value++
    }
}