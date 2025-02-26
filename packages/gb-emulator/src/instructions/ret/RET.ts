import { Instruction } from '@/instructions/instruction.ts'
import { concatBytes } from '@mawsfr/binary-operations'

export type RET_OPCODE = 0b11001001

export class RET extends Instruction {
    execute() {
        const high = this.memory.addresses[this.registers.SP.value]
        this.registers.SP.value++

        const low = this.memory.addresses[this.registers.SP.value]
        this.registers.SP.value++

        this.registers.PC.value = concatBytes(high, low)

        this.registers.PC.value++
    }
}
