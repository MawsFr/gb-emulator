import { Instruction } from '@/instructions/instruction.ts'

export type JP_IMM16_OPCODE = 0b11000011

export class JP_IMM16 extends Instruction {
    execute() {
        this.registers.PC.value = this.cpu.getImmediate16()
    }
}
