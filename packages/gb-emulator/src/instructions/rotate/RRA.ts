import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { bitwiseOr, getNthBit, shiftLeftBy, shiftRightBy1 } from "@mawsfr/binary-operations";

export type RRA_OPCODE = 0b00011111

export class RRA extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        const carry = this.registers.F.carryFlag
        const bit0 = getNthBit(this.registers.A.value, 0)
        this.registers.A.value = bitwiseOr(shiftRightBy1(this.registers.A.value), shiftLeftBy(7)(carry))
        this.registers.F.carryFlag = bit0

        this.registers.PC.value++
    }
}