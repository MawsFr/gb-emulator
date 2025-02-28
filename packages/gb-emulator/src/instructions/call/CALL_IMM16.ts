import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_16 } from '$/src'

export type CALL_IMM16_OPCODE = 0b11001101

export class CALL_IMM16 extends Instruction {
    execute() {
        const address = this.cpu.getImmediate16()
        this.cpu.goToNextInstruction(SKIP_IMMEDIATE_16) // Must be done before pushing PC to stack

        this.registers.pushPCToStack()

        this.cpu.goToAddress(address)
    }

    toString(): string {
        return `CALL ${this.cpu.imm16}`
    }
}
