import { Instruction } from '@/instructions/instruction.ts'

export type INC_R8_OPCODES =
    | 0b00000100
    | 0b00001100
    | 0b00010100
    | 0b00011100
    | 0b00100100
    | 0b00101100
    | 0b00110100
    | 0b00111100

export class INC_R8 extends Instruction {
    execute(opcode: INC_R8_OPCODES) {
        this.r8Dest(opcode).value++

        this.cpu.goToNextInstruction()
    }

    toString(opcode: INC_R8_OPCODES): string {
        return `INC ${this.r8Dest(opcode)}`
    }
}
