import { Instruction } from '@/instructions/instruction.ts'

export type POP_R16STK_OPCODES =
    | 0b11000001
    | 0b11010001
    | 0b11100001
    | 0b11110001

export class POP_R16STK extends Instruction {
    execute(opcode: POP_R16STK_OPCODES) {
        const registerPair = this.extractDestinationR16(opcode)
        const registerPairValue = this.registers.r16Stk[registerPair]

        registerPairValue.value = this.registers.popFromStack()

        this.registers.PC.value += 1
    }
}
