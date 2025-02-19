import { Registers } from "@/registers.ts";
import { Memory } from "@/memory.ts";
import { concatBytes } from "@mawsfr/binary-operations";
import { InstructionLoader } from "@/instructions/instruction-loader.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { LD_R16_IMM16_OPCODES } from "@/instructions/ld/LD_R16_IMM16.ts";
import { LD_R16MEM_A_OPCODES } from "@/instructions/ld/LD_R16MEM_A.ts";
import { LD_A_R16MEM_OPCODES } from "@/instructions/ld/LD_A_R16MEM.ts";
import { LD_IMM16_SP_OPCODE } from "@/instructions/ld/LD_IMM16_SP.ts";
import { INC_R16_OPCODES } from "@/instructions/inc/INC_R16.ts";
import { DEC_R16_OPCODES } from "@/instructions/dec/DEC_R16.ts";
import { ADD_HL_R16_OPCODES } from "@/instructions/add/ADD_HL_R16.ts";
import { INC_R8_OPCODES } from "@/instructions/inc/INC_R8.ts";
import { DEC_R8_OPCODES } from "@/instructions/dec/DEC_R8.ts";
import { LD_R8_IMM8_OPCODES } from "@/instructions/ld/LD_R8_IMM8.ts";
import { RLCA_OPCODE } from "@/instructions/rotate/RLCA.ts";
import { RRCA_OPCODE } from "@/instructions/rotate/RRCA.ts";
import { RLA_OPCODE } from "@/instructions/rotate/RLA.ts";
import { RRA_OPCODE } from "@/instructions/rotate/RRA.ts";
import { DAA_OPCODE } from "@/instructions/misc/DAA.ts";
import { CPL_OPCODE } from "@/instructions/misc/CPL.ts";
import { SCF_OPCODE } from "@/instructions/misc/SCF.ts";
import { CCF_OPCODE } from "@/instructions/misc/CCF.ts";
import { JR_IMM8_OPCODE } from "@/instructions/jump/JR_IMM8.ts";
import { JR_COND_IMM8_OPCODE } from "@/instructions/jump/JR_COND_IMM8.ts";
import { STOP_OPCODE } from "@/instructions/misc/STOP.ts";

export interface CpuConfig {
    registers: Registers,
    memory: Memory
}

export type Opcode =
    | LD_R16_IMM16_OPCODES
    | LD_R16MEM_A_OPCODES
    | LD_A_R16MEM_OPCODES
    | LD_IMM16_SP_OPCODE
    | INC_R16_OPCODES
    | DEC_R16_OPCODES
    | ADD_HL_R16_OPCODES
    | INC_R8_OPCODES
    | DEC_R8_OPCODES
    | LD_R8_IMM8_OPCODES
    | RLCA_OPCODE
    | RRCA_OPCODE
    | RLA_OPCODE
    | RRA_OPCODE
    | DAA_OPCODE
    | CPL_OPCODE
    | SCF_OPCODE
    | CCF_OPCODE
    | JR_IMM8_OPCODE
    | JR_COND_IMM8_OPCODE
    | STOP_OPCODE

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

    getImmediate8() {
        return this.getImmediateBytes({ count: 1 })
    }

    getImmediate16() {
        return this.getImmediateBytes({ count: 2 })
    }

    interpret(opcode: Opcode) {
        this.instructions[opcode].execute(opcode)
    }
}