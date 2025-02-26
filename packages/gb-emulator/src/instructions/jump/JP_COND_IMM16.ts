import { Instruction } from '@/instructions/instruction.ts'

export type JP_COND_IMM16_OPCODE =
    | 0b11000010
    | 0b11001010
    | 0b11010010
    | 0b11011010

export class JP_COND_IMM16 extends Instruction {
    execute(opcode: JP_COND_IMM16_OPCODE) {
        if (this.conditionIsMet(opcode)) {
            this.registers.PC.value = this.cpu.getImmediate16()
        } else {
            this.registers.PC.value += 3
        }
    }
}
