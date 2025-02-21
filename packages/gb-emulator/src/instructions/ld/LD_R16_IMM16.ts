import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";

export type LD_R16_IMM16_OPCODES =
    | 0b00_00_0001
    | 0b00_01_0001
    | 0b00_10_0001
    | 0b00_11_0001

export class LD_R16_IMM16 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute(opcode: LD_R16_IMM16_OPCODES) {
        const destination = this.extractDestinationR16(opcode);

        this.registers.r16[destination].value = this.cpu.getImmediate16()

        this.registers.PC.value++
    }
}