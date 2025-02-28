import { Instruction } from '@/instructions/instruction.ts'

export type LD_A_R16MEM_OPCODES =
    | 0b00_00_1010
    | 0b00_01_1010
    | 0b00_10_1010
    | 0b00_11_1010

export class LD_A_R16MEM extends Instruction {
    execute(opcode: LD_A_R16MEM_OPCODES) {
        const source = this['[r16mem]'](opcode)

        this.registers.A.copyValueFrom(source)
        this.r16mem(opcode).incrementOrDecrementIfNeeded()

        this.cpu.goToNextInstruction()
    }

    toString(opcode: LD_A_R16MEM_OPCODES): string {
        return `LD ${this.registers.A}, ${this['[r16mem]'](this.extractR16(opcode))}`
    }
}
