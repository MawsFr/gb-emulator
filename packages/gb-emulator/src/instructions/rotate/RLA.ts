import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { bitwiseOr, getNthBit, shiftLeftBy1 } from "@mawsfr/binary-operations";

export type RLA_OPCODE = 0b00010111

export class RLA extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        const carry = this.registers.F.carryFlag
        const bit7 = getNthBit(this.registers.A.value, 7)
        this.registers.A.value = bitwiseOr(shiftLeftBy1(this.registers.A.value), carry)
        this.registers.F.carryFlag = bit7

        this.registers.PC.value++
    }
}