import { Instruction } from '@/instructions/instruction.ts'

export type RET_COND_OPCODES = 0b11000000 | 0b11001000 | 0b11010000 | 0b11011000

export class RET_COND extends Instruction {
    execute(opcode: RET_COND_OPCODES) {
        if (!this.condition(opcode).isMet()) {
            this.cpu.goToNextInstruction()
            return
        }

        this.executeRET(opcode)
    }

    private executeRET(opcode: RET_COND_OPCODES) {
        this.cpu.instructions[0b11001001].execute(opcode)
    }

    toString(opcode: RET_COND_OPCODES) {
        return `RET ${this.condition(opcode)}]`
    }
}
