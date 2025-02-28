import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_16 } from '$/src'

export type LD_IMM16_A_OPCODE = 0b11101010

export class LD_IMM16_A extends Instruction {
    execute() {
        this.registers.A.copyValueInto(this.cpu['[imm16]'])

        this.cpu.goToNextInstruction(SKIP_IMMEDIATE_16)
    }

    toString(): string {
        return `LD ${this.cpu['[imm16]']}, ${this.registers.A}`
    }
}
