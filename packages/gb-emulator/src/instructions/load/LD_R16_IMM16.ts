import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_16 } from '$/src'

export type LD_R16_IMM16_OPCODES =
    | 0b00_00_0001
    | 0b00_01_0001
    | 0b00_10_0001
    | 0b00_11_0001

export class LD_R16_IMM16 extends Instruction {
    execute(opcode: LD_R16_IMM16_OPCODES) {
        this.r16(opcode).value = this.cpu.getImmediate16()

        this.cpu.goToNextInstruction(SKIP_IMMEDIATE_16)
    }

    toString(opcode: LD_R16_IMM16_OPCODES): string {
        return `LD ${this.r16(opcode)}, ${this.cpu.imm16}`
    }
}
