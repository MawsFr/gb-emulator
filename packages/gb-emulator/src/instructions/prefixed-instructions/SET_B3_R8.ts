import { setNthBit } from '@mawsfr/binary-operations'
import { Instruction } from '../instruction'

export type SET_B3_R8_OPCODES =
    | 0b11000000
    | 0b11001000
    | 0b11010000
    | 0b11011000
    | 0b11100000
    | 0b11101000
    | 0b11110000
    | 0b11111000
    | 0b11000001
    | 0b11001001
    | 0b11010001
    | 0b11011001
    | 0b11100001
    | 0b11101001
    | 0b11110001
    | 0b11111001
    | 0b11000010
    | 0b11001010
    | 0b11010010
    | 0b11011010
    | 0b11100010
    | 0b11101010
    | 0b11110010
    | 0b11111010
    | 0b11000011
    | 0b11001011
    | 0b11010011
    | 0b11011011
    | 0b11100011
    | 0b11101011
    | 0b11110011
    | 0b11111011
    | 0b11000100
    | 0b11001100
    | 0b11010100
    | 0b11011100
    | 0b11100100
    | 0b11101100
    | 0b11110100
    | 0b11111100
    | 0b11000101
    | 0b11001101
    | 0b11010101
    | 0b11011101
    | 0b11100101
    | 0b11101101
    | 0b11110101
    | 0b11111101
    | 0b11000110
    | 0b11001110
    | 0b11010110
    | 0b11011110
    | 0b11100110
    | 0b11101110
    | 0b11110110
    | 0b11111110
    | 0b11000111
    | 0b11001111
    | 0b11010111
    | 0b11011111
    | 0b11100111
    | 0b11101111
    | 0b11110111
    | 0b11111111

export class SET_B3_R8 extends Instruction {
    execute(opcode: SET_B3_R8_OPCODES): void {
        const register = this.r8Source(opcode)
        const bit = this.extractDestinationR8(opcode)

        register.value = setNthBit({
            number: register.value,
            bitIndex: bit,
            value: 1,
        })

        this.cpu.goToNextInstruction()
    }

    toString(opcode: SET_B3_R8_OPCODES): string {
        return `(prefixed) SET ${this.extractDestinationR8(opcode)}, ${this.r8Source(opcode).name}`
    }
}
