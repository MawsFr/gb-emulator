import { Instruction } from '@/instructions/instruction.ts'

export type LD_A_IMM16_OPCODE = 0b11111010

export class LD_A_IMM16 extends Instruction {
    execute() {
        this.registers.A.value =
            this.memory.addresses[this.cpu.getImmediate16()]

        this.registers.PC.value += 1
    }
}
