import { Instruction } from '@/instructions/instruction.ts'

export type INC_R8_OPCODES =
    | 0b00_000_100
    | 0b00_001_100
    | 0b00_010_100
    | 0b00_011_100
    | 0b00_100_100
    | 0b00_101_100
    | 0b00_110_100
    | 0b00_111_100

export class INC_R8 extends Instruction {
    execute(opcode: INC_R8_OPCODES) {
        this.r8Dest(opcode).value++

        this.cpu.goToNextInstruction()
    }

    toString(opcode: INC_R8_OPCODES): string {
        return `INC ${this.r8Dest(opcode)}`
    }
}
