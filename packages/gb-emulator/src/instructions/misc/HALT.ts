import { Instruction } from '@/instructions/instruction.ts'

export type HALT_OPCODE = 0b01110110

export class HALT extends Instruction {
    execute() {
        throw new Error('HALT instruction not implemented')
    }
}
