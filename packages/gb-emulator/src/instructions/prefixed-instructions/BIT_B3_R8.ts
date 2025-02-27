import { Instruction } from '../instruction'
import { isBitSet } from '@mawsfr/binary-operations'

export type BIT_B3_R8_OPCODES =
    | 0b01_000_000
    | 0b01_001_000
    | 0b01_010_000
    | 0b01_011_000
    | 0b01_100_000
    | 0b01_101_000
    | 0b01_110_000
    | 0b01_111_000
    | 0b01_000_001
    | 0b01_001_001
    | 0b01_010_001
    | 0b01_011_001
    | 0b01_100_001
    | 0b01_101_001
    | 0b01_110_001
    | 0b01_111_001
    | 0b01_000_010
    | 0b01_001_010
    | 0b01_010_010
    | 0b01_011_010
    | 0b01_100_010
    | 0b01_101_010
    | 0b01_110_010
    | 0b01_111_010
    | 0b01_000_011
    | 0b01_001_011
    | 0b01_010_011
    | 0b01_011_011
    | 0b01_100_011
    | 0b01_101_011
    | 0b01_110_011
    | 0b01_111_011
    | 0b01_000_100
    | 0b01_001_100
    | 0b01_010_100
    | 0b01_011_100
    | 0b01_100_100
    | 0b01_101_100
    | 0b01_110_100
    | 0b01_111_100
    | 0b01_000_101
    | 0b01_001_101
    | 0b01_010_101
    | 0b01_011_101
    | 0b01_100_101
    | 0b01_101_101
    | 0b01_110_101
    | 0b01_111_101
    | 0b01_000_110
    | 0b01_001_110
    | 0b01_010_110
    | 0b01_011_110
    | 0b01_100_110
    | 0b01_101_110
    | 0b01_110_110
    | 0b01_111_110
    | 0b01_000_111
    | 0b01_001_111
    | 0b01_010_111
    | 0b01_011_111
    | 0b01_100_111
    | 0b01_101_111
    | 0b01_110_111
    | 0b01_111_111

export class BIT_B3_R8 extends Instruction {
    execute(opcode: BIT_B3_R8_OPCODES): void {
        const register = this.extractSourceR8(opcode)
        const bit = this.extractDestinationR8(opcode)

        this.registers.F.zeroFlag =
            (
                isBitSet(this.registers.r8[register].value, bit, {
                    endianness: 'big',
                })
            ) ?
                1
            :   0
        this.registers.F.halfCarryFlag = 1
        this.registers.F.subtractionFlag = 0

        this.registers.PC.value += 1
    }
}
