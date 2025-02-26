import { Instruction } from '@/instructions/instruction.ts'

export type PUSH_R16STK_OPCODES =
    | 0b11_00_0101
    | 0b11_01_0101
    | 0b11_10_0101
    | 0b11_11_0101

export class PUSH_R16STK extends Instruction {
    execute(opcode: PUSH_R16STK_OPCODES) {
        const registerPair = this.extractDestinationR16(opcode)
        const registerPairValue = this.registers.r16Stk[registerPair]

        this.registers.pushToStack(registerPairValue.value)

        this.registers.PC.value += 1
    }
}
