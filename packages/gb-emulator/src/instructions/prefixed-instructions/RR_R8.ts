import { Instruction } from '@/instructions/instruction.ts'
import {
    bitwiseOr,
    getNthBit,
    shiftLeftBy,
    shiftRightBy1,
} from '@mawsfr/binary-operations'

export type RR_R8_OPCODES =
    | 0b00011000
    | 0b00011001
    | 0b00011010
    | 0b00011011
    | 0b00011100
    | 0b00011101
    | 0b00011110
    | 0b00011111

export class RR_R8 extends Instruction {
    execute(opcode: RR_R8_OPCODES) {
        const register = this.r8Source(opcode)
        const carry = this.registers.F.carryFlag
        const bit0 = getNthBit(register.value, 0)

        register.value = bitwiseOr(
            shiftRightBy1(register.value),
            shiftLeftBy(7)(carry)
        )
        this.registers.F.carryFlag = bit0

        this.cpu.goToNextInstruction()
    }

    toString(opcode: RR_R8_OPCODES) {
        return `(prefixed) RR ${this.r8Source(opcode).name}`
    }
}
