import { Instruction } from '@/instructions/instruction.ts'

export type LD_IMM16_A_OPCODE = 0b11101010

export class LD_IMM16_A extends Instruction {
    execute() {
        const address = this.cpu.getImmediate16()

        this.memory.addresses[address] = this.registers.A.value

        this.registers.PC.value++
    }
}
