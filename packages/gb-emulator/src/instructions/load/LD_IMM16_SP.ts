import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_16 } from '$/src'

export type LD_IMM16_SP_OPCODE = 0b00001000

export class LD_IMM16_SP extends Instruction {
    execute() {
        this.registers.SP.copyValueInto(this.cpu['[imm16]'])

        this.cpu.goToNextInstruction(SKIP_IMMEDIATE_16)
    }

    toString(): string {
        return `LD ${this.cpu['[imm16]']}, ${this.registers.SP}`
    }
}
