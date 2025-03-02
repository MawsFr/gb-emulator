import { Instruction } from '@/instructions/instruction.ts'
import {
    bitwiseOr,
    getNthBit,
    shiftLeftBy,
    shiftRightBy1,
} from '@mawsfr/binary-operations'

export type SRA_R8_OPCODES =
    | 0b00101000
    | 0b00101001
    | 0b00101010
    | 0b00101011
    | 0b00101100
    | 0b00101101
    | 0b00101110
    | 0b00101111

export class SRA_R8 extends Instruction {
    execute(opcode: SRA_R8_OPCODES) {
        const register = this.r8Source(opcode)
        const bit0 = getNthBit(register.value, 0)
        const bit7 = getNthBit(register.value, 7)

        register.value = shiftRightBy1(register.value)
        register.value = bitwiseOr(register.value, shiftLeftBy(7)(bit7))

        this.updateFlagsAfterRotate(register.value, bit0)

        this.cpu.goToNextInstruction()
    }

    toString(opcode: SRA_R8_OPCODES) {
        return `(prefixed) SRA ${this.r8Source(opcode).name}`
    }
}
