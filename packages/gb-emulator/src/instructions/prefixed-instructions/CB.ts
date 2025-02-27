import { Instruction } from '@/instructions/instruction.ts'

export type CB_OPCODE = 0b11001011

export class CB extends Instruction {
    execute() {
        this.registers.PC.value++

        const opcode = this.cpu.decodePrefixed(
            this.memory.addresses[this.registers.PC.value]
        )

        this.cpu.executePrefixed(opcode)
    }
}
