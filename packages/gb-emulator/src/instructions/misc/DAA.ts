import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type DAA_OPCODE = 0b00100111

export class DAA extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        let offset = 0;

        const aValue = this.registers.A.value
        const halfCarry = this.registers.F.halfCarryFlag
        const carry = this.registers.F.carryFlag
        const subtract = this.registers.F.subtractionFlag
        const isAddition = subtract === 0

        if ((isAddition && this.isLeastSignificantNibbleGreaterThan9(aValue)) || halfCarry === 1) {
            offset |= 0x06;
        }

        if ((isAddition && this.isMostSignificantNibbleGreaterThan9(aValue)) || carry === 1) {
            offset |= 0x60;
            this.registers.F.carryFlag = 1
        }

        this.registers.A.value += isAddition
            ? offset
            : -offset

        this.registers.F.zeroFlag = this.registers.A.value === 0 ? 1 : 0
        this.registers.F.halfCarryFlag = 0

        this.registers.PC.value++
    }

    private isLeastSignificantNibbleGreaterThan9(value: number): boolean {
        return (value & 0x0F) > 0x09
    }

    private isMostSignificantNibbleGreaterThan9(value: number): boolean {
        return value >= 0x90
    }
}