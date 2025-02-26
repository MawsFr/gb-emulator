import { Instruction } from '@/instructions/instruction.ts'

export type JP_HL_OPCODE = 0b11101001

export class JP_HL extends Instruction {
    execute() {
        this.registers.PC.value = this.registers.HL.value
    }
}
