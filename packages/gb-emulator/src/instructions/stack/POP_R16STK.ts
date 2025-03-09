import { Instruction } from '@/instructions/instruction.ts'

export type POP_R16STK_OPCODES =
    | 0b11000001
    | 0b11010001
    | 0b11100001
    | 0b11110001

export class POP_R16STK extends Instruction {
    execute(opcode: POP_R16STK_OPCODES) {
        this.r16Stk(opcode).value = this.registers.stack.pop()

        this.cpu.goToNextInstruction()
    }

    toString(opcode: POP_R16STK_OPCODES) {
        return `POP ${this.r16Stk(opcode).name}`
    }
}
