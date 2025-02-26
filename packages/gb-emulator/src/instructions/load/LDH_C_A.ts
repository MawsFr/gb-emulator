import { Instruction } from '../instruction'

export type LDH_C_A_OPCODE = 0b11100010

export class LDH_C_A extends Instruction {
    execute(): void {
        this.memory.addresses[0xFF00 + this.registers.C.value] =
            this.registers.A.value

        this.registers.PC.value++
    }
}
