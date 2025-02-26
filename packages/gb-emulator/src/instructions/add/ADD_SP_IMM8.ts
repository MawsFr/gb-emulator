import { Instruction } from '@/instructions/instruction.ts'

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

        this.registers.PC.value += 1
    }
}
