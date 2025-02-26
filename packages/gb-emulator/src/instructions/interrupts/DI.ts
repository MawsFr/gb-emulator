import { Instruction } from '@/instructions/instruction.ts'

export type DI_OPCODE = 0b11110011

export class DI extends Instruction {
    execute() {
        throw new Error('Not implemented')
    }
}
