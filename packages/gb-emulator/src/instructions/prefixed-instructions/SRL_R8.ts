import { Instruction } from '@/instructions/instruction.ts'
import { getNthBit, shiftRightBy1 } from '@mawsfr/binary-operations'

export type SRL_R8_OPCODES =
    | 0b00111_000
    | 0b00111_001
    | 0b00111_010
    | 0b00111_011
    | 0b00111_100
    | 0b00111_101
    | 0b00111_110
    | 0b00111_111

export class SRL_R8 extends Instruction {
    execute(opcode: SRL_R8_OPCODES) {
        const register = this.extractSourceR8(opcode)
        const bit0 = getNthBit(this.registers.r8[register].value, 0)

        this.registers.r8[register].value = shiftRightBy1(
            this.registers.r8[register].value
        )

        this.updateFlagsAfterRotate(this.registers.r8[register].value, bit0)

        this.registers.PC.value++
    }
}
