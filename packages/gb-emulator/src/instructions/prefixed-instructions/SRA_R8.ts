import { Instruction } from '@/instructions/instruction.ts'
import { getNthBit, shiftRightBy1 } from '@mawsfr/binary-operations'

export type SRA_R8_OPCODES =
    | 0b00101_000
    | 0b00101_001
    | 0b00101_010
    | 0b00101_011
    | 0b00101_100
    | 0b00101_101
    | 0b00101_110
    | 0b00101_111

export class SRA_R8 extends Instruction {
    execute(opcode: SRA_R8_OPCODES) {
        const register = this.extractSourceR8(opcode)
        const bit0 = getNthBit(this.registers.r8[register].value, 0)

        this.registers.r8[register].value = shiftRightBy1(
            this.registers.r8[register].value
        )

        this.updateFlagsAfterRotate(this.registers.r8[register].value, bit0)

        this.registers.PC.value++
    }
}
