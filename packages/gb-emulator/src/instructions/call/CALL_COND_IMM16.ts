import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_16 } from '$/src'

export type CALL_COND_IMM16_OPCODES =
    | 0b110_00_100
    | 0b110_01_100
    | 0b110_10_100
    | 0b110_11_100

export class CALL_COND_IMM16 extends Instruction {
    execute(opcode: CALL_COND_IMM16_OPCODES) {
        if (!this.condition(opcode).isMet()) {
            this.cpu.goToNextInstruction(SKIP_IMMEDIATE_16)
            return
        }

        this.executeCALL_IMM16(opcode)
    }

    private executeCALL_IMM16(opcode: CALL_COND_IMM16_OPCODES) {
        this.cpu.instructions[0b11001101].execute(opcode)
    }

    toString(opcode: CALL_COND_IMM16_OPCODES): string {
        return `CALL ${this.condition(opcode)}, ${this.cpu.imm16}`
    }
}
