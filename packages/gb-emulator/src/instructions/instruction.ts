import { Registers } from "@/registers.ts";
import { Cpu, Opcode } from "@/cpu.ts";

export abstract class Instruction {
    protected readonly cpu: Cpu
    protected readonly registers: Registers

    protected constructor(cpu: Cpu) {
        this.cpu = cpu
        this.registers = cpu.registers
    }

    abstract execute(opcode: Opcode): void
}