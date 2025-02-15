import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { concatBytes } from "@mawsfr/binary-operations";
import { InstructionLoader } from "@/instructions/instruction-loader.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { LD_R16_IMM16_OPCODES } from "@/instructions/ld/LD_R16_IMM16.ts";
import { LD_R16MEM_A_OPCODES } from "@/instructions/ld/LD_R16MEM_A.ts";

export interface CpuConfig {
    registers: Registers,
    memory: Memory
}

export type Opcode =
    | LD_R16_IMM16_OPCODES
    | LD_R16MEM_A_OPCODES

export class Cpu {
    public readonly registers: Registers
    public readonly memory: Memory

    public readonly instructions: Record<Opcode, Instruction>

    constructor(config: CpuConfig) {
        this.registers = config.registers
        this.memory = config.memory

        this.instructions = InstructionLoader.loadInstructions(this)
    }

    getImmediateBytes({ count }: { count: 1 | 2 }) {
        const nextByte = () => {
            this.registers.PC.value++
            return this.memory.addresses[this.registers.PC.value]
        }

        return count === 1
            ? nextByte()
            : concatBytes(nextByte(), nextByte())
    }

    interpret(opcode: Opcode) {
        this.instructions[opcode].execute(opcode)
    }
}