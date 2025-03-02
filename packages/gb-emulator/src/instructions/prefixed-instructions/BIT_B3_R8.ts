import { Instruction } from '../instruction'
import { getNthBit } from '@mawsfr/binary-operations'

export type BIT_B3_R8_OPCODES =
    | 0b01000000
    | 0b01001000
    | 0b01010000
    | 0b01011000
    | 0b01100000
    | 0b01101000
    | 0b01110000
    | 0b01111000
    | 0b01000001
    | 0b01001001
    | 0b01010001
    | 0b01011001
    | 0b01100001
    | 0b01101001
    | 0b01110001
    | 0b01111001
    | 0b01000010
    | 0b01001010
    | 0b01010010
    | 0b01011010
    | 0b01100010
    | 0b01101010
    | 0b01110010
    | 0b01111010
    | 0b01000011
    | 0b01001011
    | 0b01010011
    | 0b01011011
    | 0b01100011
    | 0b01101011
    | 0b01110011
    | 0b01111011
    | 0b01000100
    | 0b01001100
    | 0b01010100
    | 0b01011100
    | 0b01100100
    | 0b01101100
    | 0b01110100
    | 0b01111100
    | 0b01000101
    | 0b01001101
    | 0b01010101
    | 0b01011101
    | 0b01100101
    | 0b01101101
    | 0b01110101
    | 0b01111101
    | 0b01000110
    | 0b01001110
    | 0b01010110
    | 0b01011110
    | 0b01100110
    | 0b01101110
    | 0b01110110
    | 0b01111110
    | 0b01000111
    | 0b01001111
    | 0b01010111
    | 0b01011111
    | 0b01100111
    | 0b01101111
    | 0b01110111
    | 0b01111111

export class BIT_B3_R8 extends Instruction {
    execute(opcode: BIT_B3_R8_OPCODES): void {
        const bit = this.extractDestinationR8(opcode)

        this.registers.F.halfCarryFlag = 1
        this.registers.F.subtractionFlag = 0
        this.registers.F.zeroFlag = getNthBit(this.r8Source(opcode).value, bit)

        this.cpu.goToNextInstruction()
    }

    toString(opcode: BIT_B3_R8_OPCODES): string {
        return `(prefixed) BIT ${this.extractDestinationR8(opcode)}, ${this.r8Source(opcode)}`
    }
}
