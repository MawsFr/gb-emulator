import { Instruction } from '@/instructions/instruction.ts'

export type LD_A_R16MEM_OPCODES =
    | 0b00001010
    | 0b00011010
    | 0b00101010
    | 0b00111010

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
