import { Instruction } from '@/instructions/instruction.ts'

export type LD_HL_SP_PLUS_IMM8_OPCODE = 0b11111000

export class LD_HL_SP_PLUS_IMM8 extends Instruction {
    execute(): void {
        const augend = this.registers.SP.value
        const addend = this.cpu.getImmediate8()
        const result = augend + addend

        this.registers.HL.value = result

        this.updateFlagsAfterAddition(augend, addend, result, {
            zeroFlag: 0,
        })

        this.registers.PC.value++
    }
}
