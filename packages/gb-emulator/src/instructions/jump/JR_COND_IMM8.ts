import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_8 } from '$/src'

export type JR_COND_IMM8_OPCODE =
    | 0b00100000 // JR NZ, imm8
    | 0b00101000 // JR Z, imm8
    | 0b00110000 // JR NC, imm8
    | 0b00111000 // JR C, imm8

export class JR_COND_IMM8 extends Instruction {
    execute(opcode: JR_COND_IMM8_OPCODE) {
        if (!this.condition(opcode).isMet()) {
            this.cpu.goToNextInstruction(SKIP_IMMEDIATE_8)
            return
        }

        this.executeJR_IMM8(opcode)
    }

    private executeJR_IMM8(opcode: JR_COND_IMM8_OPCODE) {
        this.cpu.instructions[0b00011000].execute(opcode)
    }

    toString(opcode: JR_COND_IMM8_OPCODE): string {
        return `JR ${this.condition(opcode)}, ${this.cpu.imm8}`
    }
}
