import { Instruction } from '@/instructions/instruction.ts'

export type INC_R16_OPCODES = 0b00000011 | 0b00010011 | 0b00100011 | 0b00110011

export class INC_R16 extends Instruction {
    execute(opcode: INC_R16_OPCODES) {
        this.r16(opcode).value++

        this.cpu.goToNextInstruction()
    }

    toString(opcode: INC_R16_OPCODES): string {
        return `INC ${this.r16(opcode)}`
    }
}
