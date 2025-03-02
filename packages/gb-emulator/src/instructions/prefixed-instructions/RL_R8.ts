import { Instruction } from '@/instructions/instruction.ts'
import { bitwiseOr, getNthBit, shiftLeftBy1 } from '@mawsfr/binary-operations'

export type RL_R8_OPCODES =
    | 0b00010000
    | 0b00010001
    | 0b00010010
    | 0b00010011
    | 0b00010100
    | 0b00010101
    | 0b00010110
    | 0b00010111

export class RL_R8 extends Instruction {
    execute(opcode: RL_R8_OPCODES) {
        const register = this.r8Source(opcode)
        const carry = this.registers.F.carryFlag
        const bit7 = getNthBit(register.value, 7)

        register.value = bitwiseOr(shiftLeftBy1(register.value), carry)
        this.registers.F.carryFlag = bit7

        this.cpu.goToNextInstruction()
    }

    toString(opcode: RL_R8_OPCODES) {
        return `(prefixed) RL ${this.r8Source(opcode).name}`
    }
}
