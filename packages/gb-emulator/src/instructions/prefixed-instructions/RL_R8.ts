import { Instruction } from '@/instructions/instruction.ts'
import { bitwiseOr, getNthBit, shiftLeftBy1 } from '@mawsfr/binary-operations'

export type RL_R8_OPCODES =
    | 0b00010_000
    | 0b00010_001
    | 0b00010_010
    | 0b00010_011
    | 0b00010_100
    | 0b00010_101
    | 0b00010_110
    | 0b00010_111

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
