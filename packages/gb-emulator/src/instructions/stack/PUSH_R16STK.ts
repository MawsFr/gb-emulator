import { Instruction } from '@/instructions/instruction.ts'

export type PUSH_R16STK_OPCODES =
    | 0b11_00_0101
    | 0b11_01_0101
    | 0b11_10_0101
    | 0b11_11_0101

export class PUSH_R16STK extends Instruction {
    execute(opcode: PUSH_R16STK_OPCODES) {
        this.registers.pushToStack(this.r16Stk(opcode).value)

        this.cpu.goToNextInstruction()
    }

    toString(opcode: PUSH_R16STK_OPCODES) {
        return `PUSH ${this.r16Stk(opcode).name}`
    }
}
