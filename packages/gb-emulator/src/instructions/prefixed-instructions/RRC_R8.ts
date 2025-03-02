import { Instruction } from '@/instructions/instruction.ts'
import {
    bitwiseOr,
    getNthBit,
    shiftLeftBy,
    shiftRightBy1,
} from '@mawsfr/binary-operations'

export type RRC_R8_OPCODES =
    | 0b00001000
    | 0b00001001
    | 0b00001010
    | 0b00001011
    | 0b00001100
    | 0b00001101
    | 0b00001110
    | 0b00001111

export class RRC_R8 extends Instruction {
    execute(opcode: RRC_R8_OPCODES) {
        const register = this.r8Source(opcode)
        const carry = getNthBit(register.value, 0)

        register.value = bitwiseOr(
            shiftRightBy1(register.value),
            shiftLeftBy(7)(carry)
        )

        this.updateFlagsAfterRotate(register.value, carry)

        this.cpu.goToNextInstruction()
    }

    toString(opcode: RRC_R8_OPCODES) {
        return `(prefixed) RRC ${this.r8Source(opcode).name}`
    }
}
