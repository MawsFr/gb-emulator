import { Instruction } from '@/instructions/instruction.ts'
import { getNthBit, shiftLeftBy1 } from '@mawsfr/binary-operations'

export type SLA_R8_OPCODES =
    | 0b00100000
    | 0b00100001
    | 0b00100010
    | 0b00100011
    | 0b00100100
    | 0b00100101
    | 0b00100110
    | 0b00100111

export class SLA_R8 extends Instruction {
    execute(opcode: SLA_R8_OPCODES) {
        const register = this.r8Source(opcode)
        const bit7 = getNthBit(register.value, 7)

        register.value = shiftLeftBy1(register.value)
        this.updateFlagsAfterRotate(register.value, bit7)

        this.cpu.goToNextInstruction()
    }

    toString(opcode: SLA_R8_OPCODES) {
        return `(prefixed) SLA ${this.r8Source(opcode).name}`
    }
}
