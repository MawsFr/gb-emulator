import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type CALL_IMM16_OPCODE = 0b11001101

export class CALL_IMM16 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    execute() {
        const address = this.cpu.getImmediate16()
        this.registers.PC.value++

        this.registers.pushPCToStack()

        this.registers.PC.value = address
    }
}