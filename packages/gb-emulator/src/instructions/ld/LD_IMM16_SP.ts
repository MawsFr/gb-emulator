import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { isolate2FirstDigits, isolate2LastDigits } from "@mawsfr/binary-operations";

export type LD_IMM16_SP_OPCODE = 0b00001000

export class LD_IMM16_SP extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute() {
        const address = this.cpu.getImmediateBytes({ count: 2 })

        this.memory.addresses[address] = isolate2LastDigits(this.registers.SP.value)
        this.memory.addresses[address + 1] = isolate2FirstDigits(this.registers.SP.value)

        this.registers.PC.value++
    }
}