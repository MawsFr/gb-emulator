import { Instruction } from '@/instructions/instruction.ts'

export type HARD_LOCK_OPCODES =
    | 0xD3
    | 0xDB
    | 0xDD
    | 0xE3
    | 0xE4
    | 0xEB
    | 0xEC
    | 0xED
    | 0xF4
    | 0xFC
    | 0xFD

export class HARD_LOCK extends Instruction {
    execute() {
        this.cpu.hardLock()
    }
}
