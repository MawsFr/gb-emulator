import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_8 } from '$/src'

export type LD_R8_IMM8_OPCODES =
    | 0b00000110
    | 0b00001110
    | 0b00010110
    | 0b00011110
    | 0b00100110
    | 0b00101110
    | 0b00110110
    | 0b00111110

export class LD_R8_IMM8 extends Instruction {
    execute(opcode: LD_R8_IMM8_OPCODES) {
        this.r8Dest(opcode).value = this.cpu.getImmediate8()

        this.cpu.goToNextInstruction(SKIP_IMMEDIATE_8)
    }

    toString(opcode: LD_R8_IMM8_OPCODES): string {
        return `LD ${this.r8Dest(opcode)}, ${this.cpu.imm8}`
    }
}
