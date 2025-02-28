import { Instruction } from '@/instructions/instruction.ts'

export type JP_IMM16_OPCODE = 0b11000011

export class JP_IMM16 extends Instruction {
    execute() {
        this.cpu.goToAddress(this.cpu.getImmediate16())
    }

    toString(): string {
        return `JP ${this.cpu.imm16}`
    }
}
