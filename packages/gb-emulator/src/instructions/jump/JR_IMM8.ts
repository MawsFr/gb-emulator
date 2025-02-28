import { Instruction } from '@/instructions/instruction.ts'

export type JR_IMM8_OPCODE = 0b00011000

export class JR_IMM8 extends Instruction {
    execute() {
        this.cpu.goToRelativeAddress(this.cpu.getImmediate8())
    }

    toString(): string {
        return `JR ${this.cpu.imm8}`
    }
}
