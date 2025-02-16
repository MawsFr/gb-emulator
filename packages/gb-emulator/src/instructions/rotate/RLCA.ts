import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { bitwiseOr, getNthBit, shiftLeftBy1 } from "@mawsfr/binary-operations";

export type RLCA_OPCODE = 0b00000111

export class RLCA extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        const carry = getNthBit(this.registers.A.value, 7)
        this.registers.A.value = bitwiseOr(shiftLeftBy1(this.registers.A.value), carry)
        this.registers.F.carryFlag = carry

        this.registers.PC.value++
    }
}