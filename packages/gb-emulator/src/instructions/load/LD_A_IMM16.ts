import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_16 } from '$/src'

export type LD_A_IMM16_OPCODE = 0b11111010

export class LD_A_IMM16 extends Instruction {
    execute() {
        this.registers.A.copyValueFrom(this.cpu['[imm16]'])

        this.cpu.goToNextInstruction(SKIP_IMMEDIATE_16)
    }

    toString(): string {
        return `LD ${this.registers.A}, ${this.cpu['[imm16]']}`
    }
}
