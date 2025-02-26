import { Instruction } from '../instruction'

export type LDH_A_IMM8_OPCODE = 0b11110000

export class LDH_A_IMM8 extends Instruction {
    execute(): void {
        this.registers.A.value =
            this.memory.addresses[0xFF00 + this.cpu.getImmediate8()]
    }
}
