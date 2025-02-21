import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";
import { isolate2FirstDigits, isolate2LastDigits } from "@mawsfr/binary-operations";

export type CALL_IMM16_OPCODE = 0b11001101

export class CALL_IMM16 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    execute() {
        const address = this.cpu.getImmediate16()
        this.registers.PC.value++

        this.registers.SP.value--
        this.memory.addresses[this.registers.SP.value] = isolate2LastDigits(this.registers.PC.value)
        this.registers.SP.value--
        this.memory.addresses[this.registers.SP.value] = isolate2FirstDigits(this.registers.PC.value)

        this.registers.PC.value = address
    }
}