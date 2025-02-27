import { setNthBit } from '@mawsfr/binary-operations'
import { Instruction } from '../instruction'

export type SET_B3_R8_OPCODES =
    | 0b11_000_000
    | 0b11_001_000
    | 0b11_010_000
    | 0b11_011_000
    | 0b11_100_000
    | 0b11_101_000
    | 0b11_110_000
    | 0b11_111_000
    | 0b11_000_001
    | 0b11_001_001
    | 0b11_010_001
    | 0b11_011_001
    | 0b11_100_001
    | 0b11_101_001
    | 0b11_110_001
    | 0b11_111_001
    | 0b11_000_010
    | 0b11_001_010
    | 0b11_010_010
    | 0b11_011_010
    | 0b11_100_010
    | 0b11_101_010
    | 0b11_110_010
    | 0b11_111_010
    | 0b11_000_011
    | 0b11_001_011
    | 0b11_010_011
    | 0b11_011_011
    | 0b11_100_011
    | 0b11_101_011
    | 0b11_110_011
    | 0b11_111_011
    | 0b11_000_100
    | 0b11_001_100
    | 0b11_010_100
    | 0b11_011_100
    | 0b11_100_100
    | 0b11_101_100
    | 0b11_110_100
    | 0b11_111_100
    | 0b11_000_101
    | 0b11_001_101
    | 0b11_010_101
    | 0b11_011_101
    | 0b11_100_101
    | 0b11_101_101
    | 0b11_110_101
    | 0b11_111_101
    | 0b11_000_110
    | 0b11_001_110
    | 0b11_010_110
    | 0b11_011_110
    | 0b11_100_110
    | 0b11_101_110
    | 0b11_110_110
    | 0b11_111_110
    | 0b11_000_111
    | 0b11_001_111
    | 0b11_010_111
    | 0b11_011_111
    | 0b11_100_111
    | 0b11_101_111
    | 0b11_110_111
    | 0b11_111_111

export class SET_B3_R8 extends Instruction {
    execute(opcode: SET_B3_R8_OPCODES): void {
        const register = this.extractSourceR8(opcode)
        const bit = this.extractDestinationR8(opcode)

        this.registers.r8[register].value = setNthBit({
            number: this.registers.r8[register].value,
            bitIndex: bit,
            value: 1,
        })

        this.registers.PC.value += 1
    }
}
