import { Instruction } from '@/instructions/instruction.ts'

export type LD_SP_HL_OPCODE = 0b11111001

export class LD_SP_HL extends Instruction {
    execute(): void {
        this.registers.SP.value = this.registers.HL.value

        this.registers.PC.value++
    }
}
