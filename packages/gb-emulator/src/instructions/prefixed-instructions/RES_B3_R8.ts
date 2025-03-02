import { setNthBit } from '@mawsfr/binary-operations'
import { Instruction } from '../instruction'

export type RES_B3_R8_OPCODES =
    | 0b10000000
    | 0b10001000
    | 0b10010000
    | 0b10011000
    | 0b10100000
    | 0b10101000
    | 0b10110000
    | 0b10111000
    | 0b10000001
    | 0b10001001
    | 0b10010001
    | 0b10011001
    | 0b10100001
    | 0b10101001
    | 0b10110001
    | 0b10111001
    | 0b10000010
    | 0b10001010
    | 0b10010010
    | 0b10011010
    | 0b10100010
    | 0b10101010
    | 0b10110010
    | 0b10111010
    | 0b10000011
    | 0b10001011
    | 0b10010011
    | 0b10011011
    | 0b10100011
    | 0b10101011
    | 0b10110011
    | 0b10111011
    | 0b10000100
    | 0b10001100
    | 0b10010100
    | 0b10011100
    | 0b10100100
    | 0b10101100
    | 0b10110100
    | 0b10111100
    | 0b10000101
    | 0b10001101
    | 0b10010101
    | 0b10011101
    | 0b10100101
    | 0b10101101
    | 0b10110101
    | 0b10111101
    | 0b10000110
    | 0b10001110
    | 0b10010110
    | 0b10011110
    | 0b10100110
    | 0b10101110
    | 0b10110110
    | 0b10111110
    | 0b10000111
    | 0b10001111
    | 0b10010111
    | 0b10011111
    | 0b10100111
    | 0b10101111
    | 0b10110111
    | 0b10111111

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
