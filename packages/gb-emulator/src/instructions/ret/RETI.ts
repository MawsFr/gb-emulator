import { Instruction } from '@/instructions/instruction.ts'

export type RETI_OPCODE = 0b11011001

export class RETI extends Instruction {
    execute(): void {
        throw new Error('Not implemented')
    }

    toString(): string {
        return 'RETI'
    }
}
