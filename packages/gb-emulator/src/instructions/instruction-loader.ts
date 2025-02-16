import { Cpu, Opcode } from "@/cpu.ts";
import { LD_R16_IMM16 } from "@/instructions/ld/LD_R16_IMM16.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { LD_R16MEM_A } from "@/instructions/ld/LD_R16MEM_A.ts";
import { LD_A_R16MEM } from "@/instructions/ld/LD_A_R16MEM.ts";
import { LD_IMM16_SP } from "@/instructions/ld/LD_IMM16_SP.ts";
import { INC_R16 } from "@/instructions/inc/INC_R16.ts";
import { DEC_R16 } from "@/instructions/dec/DEC_R16.ts";
import { ADD_HL_R16 } from "@/instructions/add/ADD_HL_R16.ts";
import { INC_R8 } from "@/instructions/inc/INC_R8.ts";
import { DEC_R8 } from "@/instructions/dec/DEC_R8.ts";
import { LD_R8_IMM8 } from "@/instructions/ld/LD_R8_IMM8.ts";
import { RLCA } from "@/instructions/rotate/RLCA.ts";
import { RRCA } from "@/instructions/rotate/RRCA.ts";
import { RLA } from "@/instructions/rotate/RLA.ts";

export abstract class InstructionLoader {
    static loadInstructions = (cpu: Cpu): Record<Opcode, Instruction> => {
        const ld_r16_imm16 = new LD_R16_IMM16(cpu)
        const ld_r16mem_a = new LD_R16MEM_A(cpu)
        const ld_a_r16mem = new LD_A_R16MEM(cpu)
        const ld_imm16_sp = new LD_IMM16_SP(cpu)
        const inc_r16 = new INC_R16(cpu)
        const dec_r16 = new DEC_R16(cpu)
        const add_hl_r16 = new ADD_HL_R16(cpu)
        const inc_r8 = new INC_R8(cpu)
        const dec_r8 = new DEC_R8(cpu)
        const ld_r8_imm8 = new LD_R8_IMM8(cpu)
        const rlca = new RLCA(cpu)
        const rrca = new RRCA(cpu)
        const rla = new RLA(cpu)

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

            0b00001000: ld_imm16_sp,

            0b00000011: inc_r16,
            0b00010011: inc_r16,
            0b00100011: inc_r16,
            0b00110011: inc_r16,

            0b00001011: dec_r16,
            0b00011011: dec_r16,
            0b00101011: dec_r16,
            0b00111011: dec_r16,

            0b00001001: add_hl_r16,
            0b00011001: add_hl_r16,
            0b00101001: add_hl_r16,
            0b00111001: add_hl_r16,

            0b00000100: inc_r8,
            0b00001100: inc_r8,
            0b00010100: inc_r8,
            0b00011100: inc_r8,
            0b00100100: inc_r8,
            0b00101100: inc_r8,
            0b00110100: inc_r8,
            0b00111100: inc_r8,

            0b00000101: dec_r8,
            0b00001101: dec_r8,
            0b00010101: dec_r8,
            0b00011101: dec_r8,
            0b00100101: dec_r8,
            0b00101101: dec_r8,
            0b00110101: dec_r8,
            0b00111101: dec_r8,

            0b00_000_110: ld_r8_imm8,
            0b00_001_110: ld_r8_imm8,
            0b00_010_110: ld_r8_imm8,
            0b00_011_110: ld_r8_imm8,
            0b00_100_110: ld_r8_imm8,
            0b00_101_110: ld_r8_imm8,
            0b00_110_110: ld_r8_imm8,
            0b00_111_110: ld_r8_imm8,

            0b00000111: rlca,
            0b00001111: rrca,
            0b00010111: rla,
        }
    }
}