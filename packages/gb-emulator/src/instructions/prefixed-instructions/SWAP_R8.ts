import { Instruction } from '@/instructions/instruction.ts'
import {
    bitwiseAnd,
    bitwiseOr,
    shiftLeftBy,
    shiftRightBy4,
} from '@mawsfr/binary-operations'

export type SWAP_R8_OPCODES =
    | 0b00110_000
    | 0b00110_001
    | 0b00110_010
    | 0b00110_011
    | 0b00110_100
    | 0b00110_101
    | 0b00110_110
    | 0b00110_111

export class SWAP_R8 extends Instruction {
    execute(opcode: SWAP_R8_OPCODES) {
        const register = this.extractSourceR8(opcode)
        // eslint-disable-next-line prefer-destructuring
        const value = this.registers.r8[register].value

        this.registers.r8[register].value = bitwiseOr(
            shiftLeftBy(4)(bitwiseAnd(value, 0x0F)),
            shiftRightBy4(bitwiseAnd(value, 0xF0))
        )

        this.updateFlagsAfterRotate(this.registers.r8[register].value, 0)

        this.registers.PC.value++
    }
}
