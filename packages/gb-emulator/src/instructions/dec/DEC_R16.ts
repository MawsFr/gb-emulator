import { Instruction } from '@/instructions/instruction.ts'

export type DEC_R16_OPCODES =
    | 0b00_00_1011
    | 0b00_01_1011
    | 0b00_10_1011
    | 0b00_11_1011

export class DEC_R16 extends Instruction {
    execute(opcode: DEC_R16_OPCODES) {
        this.r16(opcode).value--

        this.cpu.goToNextInstruction()
    }

    toString(opcode: DEC_R16_OPCODES): string {
        return `DEC ${this.r16(opcode)}`
    }
}
