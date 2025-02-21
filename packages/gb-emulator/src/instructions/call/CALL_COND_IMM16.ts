import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type CALL_COND_IMM16_OPCODES =
    | 0b110_00_100
    | 0b110_01_100
    | 0b110_10_100
    | 0b110_11_100

export class CALL_COND_IMM16 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    execute(opcode: CALL_COND_IMM16_OPCODES) {
        if (!this.conditionIsMet(opcode)) {
            this.registers.PC.value += 3
            return
        }

        this.cpu.instructions[0b11001101].execute(opcode)
    }
}