import { Instruction } from '@/instructions/instruction.ts'
import { getNthBit, shiftLeftBy1 } from '@mawsfr/binary-operations'

export type SLA_R8_OPCODES =
    | 0b00100_000
    | 0b00100_001
    | 0b00100_010
    | 0b00100_011
    | 0b00100_100
    | 0b00100_101
    | 0b00100_110
    | 0b00100_111

export class SLA_R8 extends Instruction {
    execute(opcode: SLA_R8_OPCODES) {
        const register = this.extractSourceR8(opcode)
        const bit7 = getNthBit(this.registers.r8[register].value, 7)

        this.registers.r8[register].value = shiftLeftBy1(
            this.registers.r8[register].value
        )
        this.registers.F.carryFlag = bit7

        this.registers.PC.value++
    }
}
