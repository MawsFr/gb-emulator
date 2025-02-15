import { Cpu, Opcode } from "@/cpu.ts";
import { LD_R16_IMM16 } from "@/instructions/ld/LD_R16_IMM16.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { LD_R16MEM_A } from "@/instructions/ld/LD_R16MEM_A.ts";
import { LD_A_R16MEM } from "@/instructions/ld/LD_A_R16MEM.ts";

export abstract class InstructionLoader {
    static loadInstructions = (cpu: Cpu): Record<Opcode, Instruction> => {
        const ld_r16_imm16 = new LD_R16_IMM16(cpu)
        const ld_r16mem_a = new LD_R16MEM_A(cpu)
        const ld_a_r16mem = new LD_A_R16MEM(cpu)

        return {
            0b00000001: ld_r16_imm16,
            0b00010001: ld_r16_imm16,
            0b00100001: ld_r16_imm16,
            0b00110001: ld_r16_imm16,

            0b00000010: ld_r16mem_a,
            0b00010010: ld_r16mem_a,
            0b00100010: ld_r16mem_a,
            0b00110010: ld_r16mem_a,

            0b00001010: ld_a_r16mem,
            0b00011010: ld_a_r16mem,
            0b00101010: ld_a_r16mem,
            0b00111010: ld_a_r16mem,
        }
    }
}