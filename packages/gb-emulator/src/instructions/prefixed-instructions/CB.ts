import { Instruction } from '@/instructions/instruction.ts'
import { PrefixedOpcode } from '@/cpu.ts'

export type CB_OPCODE = 0b11001011

export class CB extends Instruction {
    execute() {
        this.registers.PC.value++

        const opcode = this.memory.addresses[
            this.registers.PC.value
        ] as PrefixedOpcode

        this.cpu.executePrefixed(opcode)
    }
}
