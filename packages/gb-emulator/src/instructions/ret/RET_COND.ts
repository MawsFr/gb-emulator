import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type RET_COND_OPCODES =
    | 0b11000000
    | 0b11001000
    | 0b11010000
    | 0b11011000

export class RET_COND extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    execute(opcode: RET_COND_OPCODES) {
        if (!this.conditionIsMet(opcode)) {
            this.registers.PC.value++
            return
        }

        this.cpu.instructions[0b11001001].execute(opcode)
    }
}