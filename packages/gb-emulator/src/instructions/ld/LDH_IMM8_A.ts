import { Instruction } from '../instruction'

export type LDH_IMM8_A_OPCODE = 0b11100000

export class LDH_IMM8_A extends Instruction {
    execute(): void {
        this.memory.addresses[0xFF00 + this.cpu.getImmediate8()] =
            this.registers.A.value
    }
}
