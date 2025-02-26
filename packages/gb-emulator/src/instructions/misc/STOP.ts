import { Instruction } from '@/instructions/instruction.ts'

export type STOP_OPCODE = 0b00010000

export class STOP extends Instruction {
    execute() {
        throw new Error('STOP instruction not implemented')
    }
}
