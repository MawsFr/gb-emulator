import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_16 } from '$/src'

export type JP_COND_IMM16_OPCODE =
    | 0b11000010
    | 0b11001010
    | 0b11010010
    | 0b11011010

export class JP_COND_IMM16 extends Instruction {
    execute(opcode: JP_COND_IMM16_OPCODE) {
        if (!this.condition(opcode).isMet()) {
            this.cpu.goToNextInstruction(SKIP_IMMEDIATE_16)
            return
        }

        this.executeJP_IMM16(opcode)
    }

    private executeJP_IMM16(opcode: JP_COND_IMM16_OPCODE) {
        this.cpu.instructions[0b11000011].execute(opcode)
    }

    toString(opcode: JP_COND_IMM16_OPCODE): string {
        return `JP ${this.condition(opcode)}, ${this.cpu.imm16}`
    }
}
