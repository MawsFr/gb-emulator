import { Instruction } from '@/instructions/instruction.ts'

export type RET_OPCODE = 0b11001001

export class RET extends Instruction {
    execute() {
        this.registers.popPCFromStack()

        this.cpu.goToNextInstruction()
    }

    toString() {
        return 'RET'
    }
}
