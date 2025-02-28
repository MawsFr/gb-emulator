import { Instruction } from '../instruction'

export type LDH_A_IMM8_OPCODE = 0b11110000

export class LDH_A_IMM8 extends Instruction {
    execute(): void {
        this.registers.A.copyValueFrom(this.cpu['[FF00+imm8]'])

        this.cpu.goToNextInstruction()
    }

    toString(): string {
        return `LD ${this.registers.A}, ${this.cpu['[FF00+imm8]']}`
    }
}
