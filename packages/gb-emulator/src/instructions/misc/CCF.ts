import { Instruction } from '@/instructions/instruction.ts'

export type CCF_OPCODE = 0b00111111

export class CCF extends Instruction {
    execute() {
        this.registers.F.carryFlag = this.registers.F.carryFlag === 0 ? 1 : 0
        this.registers.F.subtractionFlag = 0
        this.registers.F.halfCarryFlag = 0

        this.registers.PC.value++
    }
}
