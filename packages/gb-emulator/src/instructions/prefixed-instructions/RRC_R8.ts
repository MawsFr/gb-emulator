import { Instruction } from '@/instructions/instruction.ts'
import {
    bitwiseOr,
    getNthBit,
    shiftLeftBy,
    shiftRightBy1,
} from '@mawsfr/binary-operations'

export type RRC_R8_OPCODES =
    | 0b00001_000
    | 0b00001_001
    | 0b00001_010
    | 0b00001_011
    | 0b00001_100
    | 0b00001_101
    | 0b00001_110
    | 0b00001_111

export class RRC_R8 extends Instruction {
    execute(opcode: RRC_R8_OPCODES) {
        const register = this.extractSourceR8(opcode)
        const carry = getNthBit(this.registers.r8[register].value, 0)

        this.registers.r8[register].value = bitwiseOr(
            shiftRightBy1(this.registers.r8[register].value),
            shiftLeftBy(7)(carry)
        )

        this.updateFlagsAfterRotate(this.registers.r8[register].value, carry)

        this.registers.PC.value++
    }
}
