import { Instruction } from '@/instructions/instruction.ts'

export type EI_OPCODE = 0b11111011

export class EI extends Instruction {
    execute() {
        throw new Error('Not implemented')
    }
}
