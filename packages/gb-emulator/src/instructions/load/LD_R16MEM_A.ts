import { Instruction } from '@/instructions/instruction.ts'

export type LD_R16MEM_A_OPCODES =
    | 0b00_00_0010
    | 0b00_01_0010
    | 0b00_10_0010
    | 0b00_11_0010

export class LD_R16MEM_A extends Instruction {
    execute(opcode: LD_R16MEM_A_OPCODES) {
        const destination = this.extractDestinationR16(opcode)

        const register = this.registers.r16mem[destination]
        const address = register.value

        this.memory.addresses[address] = this.registers.A.value
        register.incrementOrDecrementIfNeeded()

        this.registers.PC.value++
    }
}
