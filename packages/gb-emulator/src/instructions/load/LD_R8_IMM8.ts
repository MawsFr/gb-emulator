import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_8 } from '$/src'

export type LD_R8_IMM8_OPCODES =
    | 0b00_000_110
    | 0b00_001_110
    | 0b00_010_110
    | 0b00_011_110
    | 0b00_100_110
    | 0b00_101_110
    | 0b00_110_110
    | 0b00_111_110

export class LD_R8_IMM8 extends Instruction {
    execute(opcode: LD_R8_IMM8_OPCODES) {
        this.r8Dest(opcode).value = this.cpu.getImmediate8()

        this.cpu.goToNextInstruction(SKIP_IMMEDIATE_8)
    }

    toString(opcode: LD_R8_IMM8_OPCODES): string {
        return `LD ${this.r8Dest(opcode)}, ${this.cpu.imm8}`
    }
}
