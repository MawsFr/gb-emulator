import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type LD_A_R16MEM_OPCODES =
    | 0b00_00_1010
    | 0b00_01_1010
    | 0b00_10_1010
    | 0b00_11_1010

export class LD_A_R16MEM extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute(opcode: LD_A_R16MEM_OPCODES) {
        const destination = this.extractDestinationR16(opcode);

        const register = this.registers.r16[destination]
        const address = register.value

        this.registers.A.value = this.memory.addresses[address]

        this.registers.PC.value++
    }

}