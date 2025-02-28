import { Instruction } from '@/instructions/instruction.ts'
import {
    bitwiseOr,
    getNthBit,
    shiftLeftBy,
    shiftRightBy1,
} from '@mawsfr/binary-operations'

export type RRCA_OPCODE = 0b00001111

export class RRCA extends Instruction {
    execute() {
        const carry = getNthBit(this.registers.A.value, 0)

        this.registers.A.value = bitwiseOr(
            shiftRightBy1(this.registers.A.value),
            shiftLeftBy(7)(carry)
        )
        this.registers.F.carryFlag = carry

        this.cpu.goToNextInstruction()
    }

    toString() {
        return 'RRCA'
    }
}
