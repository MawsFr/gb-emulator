import { Instruction } from '@/instructions/instruction.ts'
import { bitwiseOr, getNthBit, shiftLeftBy1 } from '@mawsfr/binary-operations'

export type RLC_R8_OPCODES =
    | 0b00000000
    | 0b00000001
    | 0b00000010
    | 0b00000011
    | 0b00000100
    | 0b00000101
    | 0b00000110
    | 0b00000111

export class RLC_R8 extends Instruction {
    execute(opcode: RLC_R8_OPCODES) {
        const register = this.r8Source(opcode)
        const carry = getNthBit(register.value, 7)

        register.value = bitwiseOr(shiftLeftBy1(register.value), carry)
        this.updateFlagsAfterRotate(register.value, carry)

        this.cpu.goToNextInstruction()
    }

    toString(opcode: RLC_R8_OPCODES) {
        return `(prefixed) RLC ${this.r8Source(opcode).name}`
    }
}
