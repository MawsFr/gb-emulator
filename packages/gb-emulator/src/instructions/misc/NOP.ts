import { Instruction } from '@/instructions/instruction.ts'

export type NOP_OPCODE = 0x00000000

export class NOP extends Instruction {
    execute() {
        this.registers.PC.value++
    }

    toString() {
        return `NOP`
    }
}
