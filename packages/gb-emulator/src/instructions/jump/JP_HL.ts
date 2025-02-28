import { Instruction } from '@/instructions/instruction.ts'

export type JP_HL_OPCODE = 0b11101001

export class JP_HL extends Instruction {
    execute() {
        this.registers.PC.copyValueFrom(this.registers.HL)
    }

    toString(): string {
        return `JP ${this.registers.HL}`
    }
}
