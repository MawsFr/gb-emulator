import { Instruction } from '@/instructions/instruction.ts'
import {
    bitwiseOr,
    getNthBit,
    shiftLeftBy,
    shiftRightBy1,
} from '@mawsfr/binary-operations'

export type RR_R8_OPCODES =
    | 0b00011_000
    | 0b00011_001
    | 0b00011_010
    | 0b00011_011
    | 0b00011_100
    | 0b00011_101
    | 0b00011_110
    | 0b00011_111

export class RR_R8 extends Instruction {
    execute(opcode: RR_R8_OPCODES) {
        const register = this.extractSourceR8(opcode)
        const carry = this.registers.F.carryFlag
        const bit0 = getNthBit(this.registers.r8[register].value, 0)

        this.registers.r8[register].value = bitwiseOr(
            shiftRightBy1(this.registers.r8[register].value),
            shiftLeftBy(7)(carry)
        )
        this.registers.F.carryFlag = bit0

        this.registers.PC.value++
    }
}
