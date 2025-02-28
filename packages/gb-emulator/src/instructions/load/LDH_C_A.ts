import { Instruction } from '../instruction'

export type LDH_C_A_OPCODE = 0b11100010

export class LDH_C_A extends Instruction {
    execute(): void {
        this.cpu['[FF00+C]'].copyValueFrom(this.registers.A)

        this.cpu.goToNextInstruction()
    }

    toString(): string {
        return `LD ${this.cpu['[FF00+C]']}, ${this.registers.A}`
    }
}
