import { setNthBit } from '@mawsfr/binary-operations'
import { Instruction } from '../instruction'

export type RES_B3_R8_OPCODES =
    | 0b10_000_000
    | 0b10_001_000
    | 0b10_010_000
    | 0b10_011_000
    | 0b10_100_000
    | 0b10_101_000
    | 0b10_110_000
    | 0b10_111_000
    | 0b10_000_001
    | 0b10_001_001
    | 0b10_010_001
    | 0b10_011_001
    | 0b10_100_001
    | 0b10_101_001
    | 0b10_110_001
    | 0b10_111_001
    | 0b10_000_010
    | 0b10_001_010
    | 0b10_010_010
    | 0b10_011_010
    | 0b10_100_010
    | 0b10_101_010
    | 0b10_110_010
    | 0b10_111_010
    | 0b10_000_011
    | 0b10_001_011
    | 0b10_010_011
    | 0b10_011_011
    | 0b10_100_011
    | 0b10_101_011
    | 0b10_110_011
    | 0b10_111_011
    | 0b10_000_100
    | 0b10_001_100
    | 0b10_010_100
    | 0b10_011_100
    | 0b10_100_100
    | 0b10_101_100
    | 0b10_110_100
    | 0b10_111_100
    | 0b10_000_101
    | 0b10_001_101
    | 0b10_010_101
    | 0b10_011_101
    | 0b10_100_101
    | 0b10_101_101
    | 0b10_110_101
    | 0b10_111_101
    | 0b10_000_110
    | 0b10_001_110
    | 0b10_010_110
    | 0b10_011_110
    | 0b10_100_110
    | 0b10_101_110
    | 0b10_110_110
    | 0b10_111_110
    | 0b10_000_111
    | 0b10_001_111
    | 0b10_010_111
    | 0b10_011_111
    | 0b10_100_111
    | 0b10_101_111
    | 0b10_110_111
    | 0b10_111_111

export class RES_B3_R8 extends Instruction {
    execute(opcode: RES_B3_R8_OPCODES): void {
        const register = this.r8Source(opcode)
        const bit = this.extractDestinationR8(opcode)

        register.value = setNthBit({
            number: register.value,
            bitIndex: bit,
            value: 0,
        })

        this.cpu.goToNextInstruction()
    }

    toString(opcode: RES_B3_R8_OPCODES) {
        return `(prefixed) RES ${this.extractDestinationR8(opcode)}, ${this.r8Source(opcode).name}`
    }
}
