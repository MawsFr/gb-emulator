import { Instruction } from '@/instructions/instruction.ts'
import {
    bitwiseAnd,
    bitwiseOr,
    shiftLeftBy,
    shiftRightBy4,
} from '@mawsfr/binary-operations'

export type SWAP_R8_OPCODES =
    | 0b00110000
    | 0b00110001
    | 0b00110010
    | 0b00110011
    | 0b00110100
    | 0b00110101
    | 0b00110110
    | 0b00110111

export class SWAP_R8 extends Instruction {
    execute(opcode: SWAP_R8_OPCODES) {
        const register = this.r8Source(opcode)
        const { value } = register

        register.value = bitwiseOr(
            shiftLeftBy(4)(bitwiseAnd(value, 0x0F)),
            shiftRightBy4(bitwiseAnd(value, 0xF0))
        )

        this.updateFlagsAfterRotate(register.value, 0)

        this.cpu.goToNextInstruction()
    }

    toString(opcode: SWAP_R8_OPCODES) {
        return `(prefixed) SWAP ${this.r8Source(opcode).name}`
    }
}
