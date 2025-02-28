import { Instruction } from '@/instructions/instruction.ts'
import { bitwiseAnd, bitwiseOr } from '@mawsfr/binary-operations'

export type DAA_OPCODE = 0b00100111

export class DAA extends Instruction {
    execute() {
        let offset = 0

        const aValue = this.registers.A.value
        const halfCarry = this.registers.F.halfCarryFlag
        const carry = this.registers.F.carryFlag
        const subtract = this.registers.F.subtractionFlag
        const isAddition = subtract === 0

        if (
            (isAddition && DAA.isLeastSignificantNibbleGreaterThan9(aValue))
            || halfCarry === 1
        ) {
            offset = bitwiseOr(offset, 0x06)
        }

        if (
            (isAddition && DAA.isMostSignificantNibbleGreaterThan9(aValue))
            || carry === 1
        ) {
            offset = bitwiseOr(offset, 0x60)
            this.registers.F.carryFlag = 1
        }

        this.registers.A.value += isAddition ? offset : -offset

        this.setZeroFlag(this.registers.A.value)
        this.registers.F.halfCarryFlag = 0

        this.cpu.goToNextInstruction()
    }

    static isLeastSignificantNibbleGreaterThan9(value: number): boolean {
        return bitwiseAnd(value, 0x0F) > 0x09
    }

    static isMostSignificantNibbleGreaterThan9(value: number): boolean {
        return value >= 0x90
    }

    toString() {
        return `DAA`
    }
}
