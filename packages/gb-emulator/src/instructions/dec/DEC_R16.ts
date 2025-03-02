import { Instruction } from '@/instructions/instruction.ts'

export type DEC_R16_OPCODES = 0b00001011 | 0b00011011 | 0b00101011 | 0b00111011

export class DEC_R16 extends Instruction {
    execute(opcode: DEC_R16_OPCODES) {
        this.r16(opcode).value--

        this.cpu.goToNextInstruction()
    }

    toString(opcode: DEC_R16_OPCODES): string {
        return `DEC ${this.r16(opcode)}`
    }
}
