import { Instruction } from '../instruction'

export type LDH_IMM8_A_OPCODE = 0b11100000

export class LDH_IMM8_A extends Instruction {
    execute(): void {
        this.registers.A.copyValueInto(this.cpu['[FF00+imm8]'])

        this.cpu.goToNextInstruction()
    }

    toString(): string {
        return `LD ${this.cpu['[FF00+imm8]']}, ${this.registers.A}`
    }
}
