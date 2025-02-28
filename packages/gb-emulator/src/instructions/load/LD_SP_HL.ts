import { Instruction } from '@/instructions/instruction.ts'

export type LD_SP_HL_OPCODE = 0b11111001

export class LD_SP_HL extends Instruction {
    execute(): void {
        this.registers.SP.copyValueFrom(this.registers.HL)

        this.cpu.goToNextInstruction()
    }

    toString(): string {
        return `LD ${this.registers.SP}, ${this.registers.HL}`
    }
}
