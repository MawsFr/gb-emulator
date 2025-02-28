import { Instruction } from '@/instructions/instruction.ts'

export type LD_R16MEM_A_OPCODES =
    | 0b00_00_0010
    | 0b00_01_0010
    | 0b00_10_0010
    | 0b00_11_0010

export class LD_R16MEM_A extends Instruction {
    execute(opcode: LD_R16MEM_A_OPCODES) {
        this.registers.A.copyValueInto(this['[r16mem]'](opcode))

        this.r16mem(opcode).incrementOrDecrementIfNeeded()

        this.cpu.goToNextInstruction()
    }

    toString(opcode: LD_R16MEM_A_OPCODES): string {
        return `LD ${this['[r16mem]'](opcode)}, ${this.registers.A}`
    }
}
