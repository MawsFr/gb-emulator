import { Instruction } from '../instruction'

export type LDH_A_C_OPCODE = 0b11110010

export class LDH_A_C extends Instruction {
    execute(): void {
        this.registers.A.value =
            this.memory.addresses[0xFF00 + this.registers.C.value]

        this.registers.PC.value++
    }
}
