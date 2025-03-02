import { Instruction } from '@/instructions/instruction.ts'

export type DEC_R8_OPCODES =
    | 0b00000101
    | 0b00001101
    | 0b00010101
    | 0b00011101
    | 0b00100101
    | 0b00101101
    | 0b00110101
    | 0b00111101

export class DEC_R8 extends Instruction {
    execute(opcode: DEC_R8_OPCODES) {
        this.r8Dest(opcode).value--

        this.cpu.goToNextInstruction()
    }

    toString(opcode: DEC_R8_OPCODES): string {
        return `DEC ${this.r8Dest(opcode)}`
    }
}
