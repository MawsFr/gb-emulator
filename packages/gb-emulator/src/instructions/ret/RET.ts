import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";
import { concatBytes } from "@mawsfr/binary-operations";

export type RET_OPCODE = 0b11001001

export class RET extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    execute() {
        const low = this.memory.addresses[this.registers.SP.value]
        this.registers.SP.value++

        const high = this.memory.addresses[this.registers.SP.value]
        this.registers.SP.value++

        this.registers.PC.value = concatBytes(high, low)

        this.registers.PC.value++
    }
}