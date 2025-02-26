import { Instruction } from '@/instructions/instruction.ts'

export type JR_COND_IMM8_OPCODE =
    | 0b00100000 // JR NZ, imm8
    | 0b00101000 // JR Z, imm8
    | 0b00110000 // JR NC, imm8
    | 0b00111000 // JR C, imm8

export class JR_COND_IMM8 extends Instruction {
    execute(opcode: JR_COND_IMM8_OPCODE) {
        const immediate8 = this.cpu.getImmediate8()

        if (this.conditionIsMet(opcode)) {
            this.registers.PC.value += immediate8
        } else {
            this.registers.PC.value++
        }
    }
}
