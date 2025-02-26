import { Instruction } from '@/instructions/instruction.ts'

export type INC_R16_OPCODES =
    | 0b00_00_0011
    | 0b00_01_0011
    | 0b00_10_0011
    | 0b00_11_0011

export class INC_R16 extends Instruction {
    execute(opcode: INC_R16_OPCODES) {
        const destination = this.extractDestinationR16(opcode)

        this.registers.r16[destination].value++

        this.registers.PC.value++
    }
}
