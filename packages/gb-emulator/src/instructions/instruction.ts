import { Registers } from "@/registers.ts";
import { Cpu } from "@/cpu.ts";

export abstract class Instruction<T> {
    protected readonly cpu: Cpu
    protected readonly registers: Registers

    protected constructor(cpu: Cpu) {
        this.cpu = cpu
        this.registers = cpu.registers
    }

    abstract execute(params: T): void
}