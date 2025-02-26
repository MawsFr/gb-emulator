import { Instruction } from '@/instructions/instruction.ts'

export type CPL_OPCODE = 0b00101111

export class CPL extends Instruction {
    execute() {
        // eslint-disable-next-line no-bitwise
        this.registers.A.value = ~this.registers.A.value
        this.registers.F.subtractionFlag = 1
        this.registers.F.halfCarryFlag = 1

        this.registers.PC.value++
    }
}
