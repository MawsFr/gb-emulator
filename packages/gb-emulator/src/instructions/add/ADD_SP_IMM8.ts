import { Instruction } from '@/instructions/instruction.ts'
import { SKIP_IMMEDIATE_8 } from '$/src'

export type ADD_SP_IMM8_OPCODE = 0b11101000

export class ADD_SP_IMM8 extends Instruction {
    execute() {
        const augend = this.registers.SP.value
        const addend = this.cpu.getImmediate8()
        const result = augend + addend

        this.registers.SP.value = result

        this.updateFlagsAfterAddition(augend, addend, result, {
            zeroFlag: 0,
        })

        this.cpu.goToNextInstruction(SKIP_IMMEDIATE_8)
    }

    toString(): string {
        return `ADD ${this.registers.SP}, ${this.cpu.imm8}`
    }
}
