import { Instruction } from '@/instructions/instruction.ts'

export type PUSH_R16STK_OPCODES =
    | 0b11000101
    | 0b11010101
    | 0b11100101
    | 0b11110101

export class PUSH_R16STK extends Instruction {
    execute(opcode: PUSH_R16STK_OPCODES) {
        this.registers.stack.push(this.r16Stk(opcode).value)

        this.cpu.goToNextInstruction()
    }

    toString(opcode: PUSH_R16STK_OPCODES) {
        return `PUSH ${this.r16Stk(opcode).name}`
    }
}
