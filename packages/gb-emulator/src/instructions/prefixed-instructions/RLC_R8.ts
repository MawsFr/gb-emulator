import { Instruction } from '@/instructions/instruction.ts'
import { bitwiseOr, getNthBit, shiftLeftBy1 } from '@mawsfr/binary-operations'

export type RLC_R8_OPCODES =
    | 0b00000_000
    | 0b00000_001
    | 0b00000_010
    | 0b00000_011
    | 0b00000_100
    | 0b00000_101
    | 0b00000_110
    | 0b00000_111

export class RLC_R8 extends Instruction {
    execute(opcode: RLC_R8_OPCODES) {
        const register = this.extractSourceR8(opcode)
        const carry = getNthBit(this.registers.r8[register].value, 7)

        this.registers.r8[register].value = bitwiseOr(
            shiftLeftBy1(this.registers.r8[register].value),
            carry
        )

        this.updateFlagsAfterRotate(this.registers.r8[register].value, carry)

        this.registers.PC.value++
    }
}
