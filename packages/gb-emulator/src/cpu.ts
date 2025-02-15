import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { concatBytes } from "@mawsfr/binary-operations";

export interface CpuConfig {
    registers: Registers,
    memory: Memory
}

export class Cpu {
    public readonly registers: Registers
    public readonly memory: Memory

    constructor(config: CpuConfig) {
        this.registers = config.registers
        this.memory = config.memory
    }

    getImmediateBytes({ count }: { count: 1 | 2 }) {
        const nextByte = () => {
            this.registers.PC.value++
            return this.memory.addresses[this.registers.PC.value]
        }

        if (count === 1) {
            return nextByte()
        }

        return concatBytes(nextByte(), nextByte())
    }

    interpret() {

    }
}