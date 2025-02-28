import { Instruction } from '../instruction'

export type LDH_A_C_OPCODE = 0b11110010

export class LDH_A_C extends Instruction {
    execute(): void {
        this.registers.A.copyValueFrom(this.cpu['[FF00+C]'])

        this.cpu.goToNextInstruction()
    }

    toString(): string {
        return `LD ${this.registers.A}, ${this.cpu['[FF00+C]']}`
    }
}
