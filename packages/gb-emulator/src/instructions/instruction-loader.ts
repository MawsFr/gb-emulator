import { Cpu, Opcode, PrefixedOpcode } from '@/cpu.ts'
import { LD_R16_IMM16 } from '@/instructions/load/LD_R16_IMM16.ts'
import { Instruction } from '@/instructions/instruction.ts'
import { LD_R16MEM_A } from '@/instructions/load/LD_R16MEM_A.ts'
import { LD_A_R16MEM } from '@/instructions/load/LD_A_R16MEM.ts'
import { LD_IMM16_SP } from '@/instructions/load/LD_IMM16_SP.ts'
import { INC_R16 } from '@/instructions/inc/INC_R16.ts'
import { DEC_R16 } from '@/instructions/dec/DEC_R16.ts'
import { ADD_HL_R16 } from '@/instructions/add/ADD_HL_R16.ts'
import { INC_R8 } from '@/instructions/inc/INC_R8.ts'
import { DEC_R8 } from '@/instructions/dec/DEC_R8.ts'
import { LD_R8_IMM8 } from '@/instructions/load/LD_R8_IMM8.ts'
import { RLCA } from '@/instructions/rotate/RLCA.ts'
import { RRCA } from '@/instructions/rotate/RRCA.ts'
import { RLA } from '@/instructions/rotate/RLA.ts'
import { RRA } from '@/instructions/rotate/RRA.ts'
import { DAA } from '@/instructions/misc/DAA.ts'
import { CPL } from '@/instructions/misc/CPL.ts'
import { SCF } from '@/instructions/misc/SCF.ts'
import { CCF } from '@/instructions/misc/CCF.ts'
import { JR_IMM8 } from '@/instructions/jump/JR_IMM8.ts'
import { JR_COND_IMM8 } from '@/instructions/jump/JR_COND_IMM8.ts'
import { STOP } from '@/instructions/misc/STOP.ts'
import { LD_R8_R8 } from '@/instructions/load/LD_R8_R8.ts'
import { HALT } from '@/instructions/misc/HALT.ts'
import { ADD_A_IMM8, ADD_A_R8 } from '@/instructions/add/ADD_A_8_SOURCE.ts'
import { ADC_A_IMM8, ADC_A_R8 } from '@/instructions/add/ADC_A_8_SOURCE.ts'
import { SUB_A_IMM8, SUB_A_R8 } from '@/instructions/sub/SUB_A_8_SOURCE.ts'
import { SBC_A_IMM8, SBC_A_R8 } from '@/instructions/sub/SBC_A_8_SOURCE.ts'
import { AND_A_IMM8, AND_A_R8 } from '@/instructions/bitwise/AND_A_8_SOURCE.ts'
import { XOR_A_IMM8, XOR_A_R8 } from '@/instructions/bitwise/XOR_A_8_SOURCE.ts'
import { OR_A_IMM8, OR_A_R8 } from '@/instructions/bitwise/OR_A_8_SOURCE.ts'
import { CP_A_IMM8, CP_A_R8 } from '@/instructions/sub/CP_A_8_SOURCE.ts'
import { RET } from '@/instructions/ret/RET.ts'
import { RET_COND } from '@/instructions/ret/RET_COND.ts'
import { JP_IMM16 } from '@/instructions/jump/JP_IMM16.ts'
import { JP_COND_IMM16 } from '@/instructions/jump/JP_COND_IMM16.ts'
import { JP_HL } from '@/instructions/jump/JP_HL.ts'
import { CALL_IMM16 } from '@/instructions/call/CALL_IMM16.ts'
import { CALL_COND_IMM16 } from '@/instructions/call/CALL_COND_IMM16.ts'
import { RST_TGT3 } from '@/instructions/misc/RST_TGT3.ts'
import { POP_R16STK } from '@/instructions/stack/POP_R16STK.ts'
import { PUSH_R16STK } from '@/instructions/stack/PUSH_R16STK.ts'
import { LDH_C_A } from '@/instructions/load/LDH_C_A.ts'
import { LDH_IMM8_A } from '@/instructions/load/LDH_IMM8_A.ts'
import { LD_IMM16_A } from '@/instructions/load/LD_IMM16_A.ts'
import { LDH_A_C } from '@/instructions/load/LDH_A_C.ts'
import { LDH_A_IMM8 } from '@/instructions/load/LDH_A_IMM8.ts'
import { LD_A_IMM16 } from '@/instructions/load/LD_A_IMM16.ts'
import { ADD_SP_IMM8 } from '@/instructions/add/ADD_SP_IMM8.ts'
import { LD_HL_SP_PLUS_IMM8 } from '@/instructions/load/LD_HL_SP_PLUS_IMM8.ts'
import { LD_SP_HL } from '@/instructions/load/LD_SP_HL.ts'
import { RETI } from '@/instructions/ret/RETI.ts'
import { EI } from '@/instructions/interrupts/EI.ts'
import { DI } from '@/instructions/interrupts/DI.ts'
import { HARD_LOCK } from '@/instructions/hard-lock/HARD_LOCK.ts'
import { RLC_R8 } from '@/instructions/prefixed-instructions/RLC_R8.ts'
import { RRC_R8 } from '@/instructions/prefixed-instructions/RRC_R8.ts'
import { RR_R8 } from '@/instructions/prefixed-instructions/RR_R8.ts'
import { RL_R8 } from '@/instructions/prefixed-instructions/RL_R8.ts'
import { SLA_R8 } from '@/instructions/prefixed-instructions/SLA_R8.ts'
import { SRA_R8 } from '@/instructions/prefixed-instructions/SRA_R8.ts'
import { SWAP_R8 } from '@/instructions/prefixed-instructions/SWAP_R8.ts'
import { SRL_R8 } from '@/instructions/prefixed-instructions/SRL_R8.ts'
import { BIT_B3_R8 } from './prefixed-instructions/BIT_B3_R8'
import { RES_B3_R8 } from './prefixed-instructions/RES_B3_R8'
import { SET_B3_R8 } from './prefixed-instructions/SET_B3_R8'
import { CB } from '@/instructions/prefixed-instructions/CB.ts'
import { NOP } from '@/instructions/misc/NOP.ts'

// eslint-disable-next-line unicorn/no-static-only-class
export abstract class InstructionLoader {
    static loadInstructions = (cpu: Cpu): Record<Opcode, Instruction> => {
        const nop = new NOP(cpu)
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
        const rra = new RRA(cpu)
        const daa = new DAA(cpu)
        const cpl = new CPL(cpu)
        const scf = new SCF(cpu)
        const ccf = new CCF(cpu)
        const jr_imm8 = new JR_IMM8(cpu)
        const jr_cond_imm8 = new JR_COND_IMM8(cpu)
        const stop = new STOP(cpu)
        const halt = new HALT(cpu)
        const ld_r8_r8 = new LD_R8_R8(cpu)
        const add_a_b = new ADD_A_R8(cpu, 0b000)
        const add_a_c = new ADD_A_R8(cpu, 0b001)
        const add_a_d = new ADD_A_R8(cpu, 0b010)
        const add_a_e = new ADD_A_R8(cpu, 0b011)
        const add_a_h = new ADD_A_R8(cpu, 0b100)
        const add_a_l = new ADD_A_R8(cpu, 0b101)
        const add_a_hl = new ADD_A_R8(cpu, 0b110)
        const add_a_a = new ADD_A_R8(cpu, 0b111)
        const add_a_imm8 = new ADD_A_IMM8(cpu)
        const adc_a_b = new ADC_A_R8(cpu, 0b000)
        const adc_a_c = new ADC_A_R8(cpu, 0b001)
        const adc_a_d = new ADC_A_R8(cpu, 0b010)
        const adc_a_e = new ADC_A_R8(cpu, 0b011)
        const adc_a_h = new ADC_A_R8(cpu, 0b100)
        const adc_a_l = new ADC_A_R8(cpu, 0b101)
        const adc_a_hl = new ADC_A_R8(cpu, 0b110)
        const adc_a_a = new ADC_A_R8(cpu, 0b111)
        const adc_a_imm8 = new ADC_A_IMM8(cpu)
        const sub_a_b = new SUB_A_R8(cpu, 0b000)
        const sub_a_c = new SUB_A_R8(cpu, 0b001)
        const sub_a_d = new SUB_A_R8(cpu, 0b010)
        const sub_a_e = new SUB_A_R8(cpu, 0b011)
        const sub_a_h = new SUB_A_R8(cpu, 0b100)
        const sub_a_l = new SUB_A_R8(cpu, 0b101)
        const sub_a_hl = new SUB_A_R8(cpu, 0b110)
        const sub_a_a = new SUB_A_R8(cpu, 0b111)
        const sub_a_imm8 = new SUB_A_IMM8(cpu)
        const sbc_a_b = new SBC_A_R8(cpu, 0b000)
        const sbc_a_c = new SBC_A_R8(cpu, 0b001)
        const sbc_a_d = new SBC_A_R8(cpu, 0b010)
        const sbc_a_e = new SBC_A_R8(cpu, 0b011)
        const sbc_a_h = new SBC_A_R8(cpu, 0b100)
        const sbc_a_l = new SBC_A_R8(cpu, 0b101)
        const sbc_a_hl = new SBC_A_R8(cpu, 0b110)
        const sbc_a_a = new SBC_A_R8(cpu, 0b111)
        const sbc_a_imm8 = new SBC_A_IMM8(cpu)
        const and_a_b = new AND_A_R8(cpu, 0b000)
        const and_a_c = new AND_A_R8(cpu, 0b001)
        const and_a_d = new AND_A_R8(cpu, 0b010)
        const and_a_e = new AND_A_R8(cpu, 0b011)
        const and_a_h = new AND_A_R8(cpu, 0b100)
        const and_a_l = new AND_A_R8(cpu, 0b101)
        const and_a_hl = new AND_A_R8(cpu, 0b110)
        const and_a_a = new AND_A_R8(cpu, 0b111)
        const and_a_imm8 = new AND_A_IMM8(cpu)
        const xor_a_b = new XOR_A_R8(cpu, 0b000)
        const xor_a_c = new XOR_A_R8(cpu, 0b001)
        const xor_a_d = new XOR_A_R8(cpu, 0b010)
        const xor_a_e = new XOR_A_R8(cpu, 0b011)
        const xor_a_h = new XOR_A_R8(cpu, 0b100)
        const xor_a_l = new XOR_A_R8(cpu, 0b101)
        const xor_a_hl = new XOR_A_R8(cpu, 0b110)
        const xor_a_a = new XOR_A_R8(cpu, 0b111)
        const xor_a_imm8 = new XOR_A_IMM8(cpu)
        const or_a_b = new OR_A_R8(cpu, 0b000)
        const or_a_c = new OR_A_R8(cpu, 0b001)
        const or_a_d = new OR_A_R8(cpu, 0b010)
        const or_a_e = new OR_A_R8(cpu, 0b011)
        const or_a_h = new OR_A_R8(cpu, 0b100)
        const or_a_l = new OR_A_R8(cpu, 0b101)
        const or_a_hl = new OR_A_R8(cpu, 0b110)
        const or_a_a = new OR_A_R8(cpu, 0b111)
        const or_a_imm8 = new OR_A_IMM8(cpu)
        const cp_a_b = new CP_A_R8(cpu, 0b000)
        const cp_a_c = new CP_A_R8(cpu, 0b001)
        const cp_a_d = new CP_A_R8(cpu, 0b010)
        const cp_a_e = new CP_A_R8(cpu, 0b011)
        const cp_a_h = new CP_A_R8(cpu, 0b100)
        const cp_a_l = new CP_A_R8(cpu, 0b101)
        const cp_a_hl = new CP_A_R8(cpu, 0b110)
        const cp_a_a = new CP_A_R8(cpu, 0b111)
        const cp_a_imm8 = new CP_A_IMM8(cpu)
        const ret_cond = new RET_COND(cpu)
        const ret = new RET(cpu)
        const reti = new RETI(cpu)
        const jp_imm16 = new JP_IMM16(cpu)
        const jp_cond_imm16 = new JP_COND_IMM16(cpu)
        const jp_hl = new JP_HL(cpu)
        const call_imm16 = new CALL_IMM16(cpu)
        const call_cond_imm16 = new CALL_COND_IMM16(cpu)
        const rst_tgt3 = new RST_TGT3(cpu)
        const pop_r16stk = new POP_R16STK(cpu)
        const push_r16stk = new PUSH_R16STK(cpu)
        const ldh_c_a = new LDH_C_A(cpu)
        const ldh_imm8_a = new LDH_IMM8_A(cpu)
        const ld_imm16_a = new LD_IMM16_A(cpu)
        const ldh_a_c = new LDH_A_C(cpu)
        const ldh_a_imm8 = new LDH_A_IMM8(cpu)
        const ld_a_imm16 = new LD_A_IMM16(cpu)
        const add_sp_imm8 = new ADD_SP_IMM8(cpu)
        const ld_hl_sp_plus_imm8 = new LD_HL_SP_PLUS_IMM8(cpu)
        const ld_sp_hl = new LD_SP_HL(cpu)
        const ei = new EI(cpu)
        const di = new DI(cpu)
        const hard_lock = new HARD_LOCK(cpu)
        const cb = new CB(cpu)

        return {
            0b00000000: nop,

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

            0b00000110: ld_r8_imm8,
            0b00001110: ld_r8_imm8,
            0b00010110: ld_r8_imm8,
            0b00011110: ld_r8_imm8,
            0b00100110: ld_r8_imm8,
            0b00101110: ld_r8_imm8,
            0b00110110: ld_r8_imm8,
            0b00111110: ld_r8_imm8,

            0b00000111: rlca,
            0b00001111: rrca,
            0b00010111: rla,
            0b00011111: rra,
            0b00100111: daa,
            0b00101111: cpl,
            0b00110111: scf,
            0b00111111: ccf,

            0b00011000: jr_imm8,
            0b00100000: jr_cond_imm8,
            0b00101000: jr_cond_imm8,
            0b00110000: jr_cond_imm8,
            0b00111000: jr_cond_imm8,

            0b00010000: stop,
            0b01110110: halt,

            0b01000000: ld_r8_r8,
            0b01001000: ld_r8_r8,
            0b01010000: ld_r8_r8,
            0b01011000: ld_r8_r8,
            0b01100000: ld_r8_r8,
            0b01101000: ld_r8_r8,
            0b01110000: ld_r8_r8,
            0b01111000: ld_r8_r8,
            0b01000001: ld_r8_r8,
            0b01001001: ld_r8_r8,
            0b01010001: ld_r8_r8,
            0b01011001: ld_r8_r8,
            0b01100001: ld_r8_r8,
            0b01101001: ld_r8_r8,
            0b01110001: ld_r8_r8,
            0b01111001: ld_r8_r8,
            0b01000010: ld_r8_r8,
            0b01001010: ld_r8_r8,
            0b01010010: ld_r8_r8,
            0b01011010: ld_r8_r8,
            0b01100010: ld_r8_r8,
            0b01101010: ld_r8_r8,
            0b01110010: ld_r8_r8,
            0b01111010: ld_r8_r8,
            0b01000011: ld_r8_r8,
            0b01001011: ld_r8_r8,
            0b01010011: ld_r8_r8,
            0b01011011: ld_r8_r8,
            0b01100011: ld_r8_r8,
            0b01101011: ld_r8_r8,
            0b01110011: ld_r8_r8,
            0b01111011: ld_r8_r8,
            0b01000100: ld_r8_r8,
            0b01001100: ld_r8_r8,
            0b01010100: ld_r8_r8,
            0b01011100: ld_r8_r8,
            0b01100100: ld_r8_r8,
            0b01101100: ld_r8_r8,
            0b01110100: ld_r8_r8,
            0b01111100: ld_r8_r8,
            0b01000101: ld_r8_r8,
            0b01001101: ld_r8_r8,
            0b01010101: ld_r8_r8,
            0b01011101: ld_r8_r8,
            0b01100101: ld_r8_r8,
            0b01101101: ld_r8_r8,
            0b01110101: ld_r8_r8,
            0b01111101: ld_r8_r8,
            0b01000110: ld_r8_r8,
            0b01001110: ld_r8_r8,
            0b01010110: ld_r8_r8,
            0b01011110: ld_r8_r8,
            0b01100110: ld_r8_r8,
            0b01101110: ld_r8_r8,
            0b01111110: ld_r8_r8,
            0b01000111: ld_r8_r8,
            0b01001111: ld_r8_r8,
            0b01010111: ld_r8_r8,
            0b01011111: ld_r8_r8,
            0b01100111: ld_r8_r8,
            0b01101111: ld_r8_r8,
            0b01110111: ld_r8_r8,
            0b01111111: ld_r8_r8,

            0b10000000: add_a_b,
            0b10000001: add_a_c,
            0b10000010: add_a_d,
            0b10000011: add_a_e,
            0b10000100: add_a_h,
            0b10000101: add_a_l,
            0b10000110: add_a_hl,
            0b10000111: add_a_a,

            0b11000110: add_a_imm8,

            0b10001000: adc_a_b,
            0b10001001: adc_a_c,
            0b10001010: adc_a_d,
            0b10001011: adc_a_e,
            0b10001100: adc_a_h,
            0b10001101: adc_a_l,
            0b10001110: adc_a_hl,
            0b10001111: adc_a_a,

            0b11001110: adc_a_imm8,

            0b10010000: sub_a_b,
            0b10010001: sub_a_c,
            0b10010010: sub_a_d,
            0b10010011: sub_a_e,
            0b10010100: sub_a_h,
            0b10010101: sub_a_l,
            0b10010110: sub_a_hl,
            0b10010111: sub_a_a,

            0b11010110: sub_a_imm8,

            0b10011000: sbc_a_b,
            0b10011001: sbc_a_c,
            0b10011010: sbc_a_d,
            0b10011011: sbc_a_e,
            0b10011100: sbc_a_h,
            0b10011101: sbc_a_l,
            0b10011110: sbc_a_hl,
            0b10011111: sbc_a_a,

            0b11011110: sbc_a_imm8,

            0b10100000: and_a_b,
            0b10100001: and_a_c,
            0b10100010: and_a_d,
            0b10100011: and_a_e,
            0b10100100: and_a_h,
            0b10100101: and_a_l,
            0b10100110: and_a_hl,
            0b10100111: and_a_a,

            0b11100110: and_a_imm8,

            0b10101000: xor_a_b,
            0b10101001: xor_a_c,
            0b10101010: xor_a_d,
            0b10101011: xor_a_e,
            0b10101100: xor_a_h,
            0b10101101: xor_a_l,
            0b10101110: xor_a_hl,
            0b10101111: xor_a_a,

            0b11101110: xor_a_imm8,

            0b10110000: or_a_b,
            0b10110001: or_a_c,
            0b10110010: or_a_d,
            0b10110011: or_a_e,
            0b10110100: or_a_h,
            0b10110101: or_a_l,
            0b10110110: or_a_hl,
            0b10110111: or_a_a,

            0b11110110: or_a_imm8,

            0b10111000: cp_a_b,
            0b10111001: cp_a_c,
            0b10111010: cp_a_d,
            0b10111011: cp_a_e,
            0b10111100: cp_a_h,
            0b10111101: cp_a_l,
            0b10111110: cp_a_hl,
            0b10111111: cp_a_a,

            0b11111110: cp_a_imm8,

            0b11000000: ret_cond,
            0b11001000: ret_cond,
            0b11010000: ret_cond,
            0b11011000: ret_cond,
            0b11001001: ret,
            0b11011001: reti,

            0b11000011: jp_imm16,
            0b11000010: jp_cond_imm16,
            0b11001010: jp_cond_imm16,
            0b11010010: jp_cond_imm16,
            0b11011010: jp_cond_imm16,
            0b11101001: jp_hl,

            0b11001101: call_imm16,
            0b11000100: call_cond_imm16,
            0b11001100: call_cond_imm16,
            0b11010100: call_cond_imm16,
            0b11011100: call_cond_imm16,

            0b11000111: rst_tgt3,
            0b11001111: rst_tgt3,
            0b11010111: rst_tgt3,
            0b11011111: rst_tgt3,
            0b11100111: rst_tgt3,
            0b11101111: rst_tgt3,
            0b11110111: rst_tgt3,
            0b11111111: rst_tgt3,

            0b11000001: pop_r16stk,
            0b11010001: pop_r16stk,
            0b11100001: pop_r16stk,
            0b11110001: pop_r16stk,
            0b11000101: push_r16stk,
            0b11010101: push_r16stk,
            0b11100101: push_r16stk,
            0b11110101: push_r16stk,

            0b11100010: ldh_c_a,
            0b11100000: ldh_imm8_a,
            0b11101010: ld_imm16_a,
            0b11110010: ldh_a_c,
            0b11110000: ldh_a_imm8,
            0b11111010: ld_a_imm16,
            0b11101000: add_sp_imm8,
            0b11111000: ld_hl_sp_plus_imm8,
            0b11111001: ld_sp_hl,

            0b11111011: ei,
            0b11110011: di,
            0xD3: hard_lock,
            0xDB: hard_lock,
            0xDD: hard_lock,
            0xE3: hard_lock,
            0xE4: hard_lock,
            0xEB: hard_lock,
            0xEC: hard_lock,
            0xED: hard_lock,
            0xF4: hard_lock,
            0xFC: hard_lock,
            0xFD: hard_lock,

            0b11001011: cb,
        }
    }

    static loadPrefixedInstructions(
        cpu: Cpu
    ): Record<PrefixedOpcode, Instruction> {
        const rlc_r8 = new RLC_R8(cpu)
        const rrc_r8 = new RRC_R8(cpu)
        const rl_r8 = new RL_R8(cpu)
        const rr_r8 = new RR_R8(cpu)
        const sla_r8 = new SLA_R8(cpu)
        const sra_r8 = new SRA_R8(cpu)
        const swap_r8 = new SWAP_R8(cpu)
        const srl_r8 = new SRL_R8(cpu)
        const bit_b3_r8 = new BIT_B3_R8(cpu)
        const res_b3_r8 = new RES_B3_R8(cpu)
        const set_b3_r8 = new SET_B3_R8(cpu)

        return {
            0b00000000: rlc_r8,
            0b00000001: rlc_r8,
            0b00000010: rlc_r8,
            0b00000011: rlc_r8,
            0b00000100: rlc_r8,
            0b00000101: rlc_r8,
            0b00000110: rlc_r8,
            0b00000111: rlc_r8,

            0b00001000: rrc_r8,
            0b00001001: rrc_r8,
            0b00001010: rrc_r8,
            0b00001011: rrc_r8,
            0b00001100: rrc_r8,
            0b00001101: rrc_r8,
            0b00001110: rrc_r8,
            0b00001111: rrc_r8,

            0b00010000: rl_r8,
            0b00010001: rl_r8,
            0b00010010: rl_r8,
            0b00010011: rl_r8,
            0b00010100: rl_r8,
            0b00010101: rl_r8,
            0b00010110: rl_r8,
            0b00010111: rl_r8,

            0b00011000: rr_r8,
            0b00011001: rr_r8,
            0b00011010: rr_r8,
            0b00011011: rr_r8,
            0b00011100: rr_r8,
            0b00011101: rr_r8,
            0b00011110: rr_r8,
            0b00011111: rr_r8,

            0b00100000: sla_r8,
            0b00100001: sla_r8,
            0b00100010: sla_r8,
            0b00100011: sla_r8,
            0b00100100: sla_r8,
            0b00100101: sla_r8,
            0b00100110: sla_r8,
            0b00100111: sla_r8,

            0b00101000: sra_r8,
            0b00101001: sra_r8,
            0b00101010: sra_r8,
            0b00101011: sra_r8,
            0b00101100: sra_r8,
            0b00101101: sra_r8,
            0b00101110: sra_r8,
            0b00101111: sra_r8,

            0b00110000: swap_r8,
            0b00110001: swap_r8,
            0b00110010: swap_r8,
            0b00110011: swap_r8,
            0b00110100: swap_r8,
            0b00110101: swap_r8,
            0b00110110: swap_r8,
            0b00110111: swap_r8,

            0b00111000: srl_r8,
            0b00111001: srl_r8,
            0b00111010: srl_r8,
            0b00111011: srl_r8,
            0b00111100: srl_r8,
            0b00111101: srl_r8,
            0b00111110: srl_r8,
            0b00111111: srl_r8,

            0b01000000: bit_b3_r8,
            0b01001000: bit_b3_r8,
            0b01010000: bit_b3_r8,
            0b01011000: bit_b3_r8,
            0b01100000: bit_b3_r8,
            0b01101000: bit_b3_r8,
            0b01110000: bit_b3_r8,
            0b01111000: bit_b3_r8,
            0b01000001: bit_b3_r8,
            0b01001001: bit_b3_r8,
            0b01010001: bit_b3_r8,
            0b01011001: bit_b3_r8,
            0b01100001: bit_b3_r8,
            0b01101001: bit_b3_r8,
            0b01110001: bit_b3_r8,
            0b01111001: bit_b3_r8,
            0b01000010: bit_b3_r8,
            0b01001010: bit_b3_r8,
            0b01010010: bit_b3_r8,
            0b01011010: bit_b3_r8,
            0b01100010: bit_b3_r8,
            0b01101010: bit_b3_r8,
            0b01110010: bit_b3_r8,
            0b01111010: bit_b3_r8,
            0b01000011: bit_b3_r8,
            0b01001011: bit_b3_r8,
            0b01010011: bit_b3_r8,
            0b01011011: bit_b3_r8,
            0b01100011: bit_b3_r8,
            0b01101011: bit_b3_r8,
            0b01110011: bit_b3_r8,
            0b01111011: bit_b3_r8,
            0b01000100: bit_b3_r8,
            0b01001100: bit_b3_r8,
            0b01010100: bit_b3_r8,
            0b01011100: bit_b3_r8,
            0b01100100: bit_b3_r8,
            0b01101100: bit_b3_r8,
            0b01110100: bit_b3_r8,
            0b01111100: bit_b3_r8,
            0b01000101: bit_b3_r8,
            0b01001101: bit_b3_r8,
            0b01010101: bit_b3_r8,
            0b01011101: bit_b3_r8,
            0b01100101: bit_b3_r8,
            0b01101101: bit_b3_r8,
            0b01110101: bit_b3_r8,
            0b01111101: bit_b3_r8,
            0b01000110: bit_b3_r8,
            0b01001110: bit_b3_r8,
            0b01010110: bit_b3_r8,
            0b01011110: bit_b3_r8,
            0b01100110: bit_b3_r8,
            0b01101110: bit_b3_r8,
            0b01110110: bit_b3_r8,
            0b01111110: bit_b3_r8,
            0b01000111: bit_b3_r8,
            0b01001111: bit_b3_r8,
            0b01010111: bit_b3_r8,
            0b01011111: bit_b3_r8,
            0b01100111: bit_b3_r8,
            0b01101111: bit_b3_r8,
            0b01110111: bit_b3_r8,
            0b01111111: bit_b3_r8,

            0b10000000: res_b3_r8,
            0b10001000: res_b3_r8,
            0b10010000: res_b3_r8,
            0b10011000: res_b3_r8,
            0b10100000: res_b3_r8,
            0b10101000: res_b3_r8,
            0b10110000: res_b3_r8,
            0b10111000: res_b3_r8,
            0b10000001: res_b3_r8,
            0b10001001: res_b3_r8,
            0b10010001: res_b3_r8,
            0b10011001: res_b3_r8,
            0b10100001: res_b3_r8,
            0b10101001: res_b3_r8,
            0b10110001: res_b3_r8,
            0b10111001: res_b3_r8,
            0b10000010: res_b3_r8,
            0b10001010: res_b3_r8,
            0b10010010: res_b3_r8,
            0b10011010: res_b3_r8,
            0b10100010: res_b3_r8,
            0b10101010: res_b3_r8,
            0b10110010: res_b3_r8,
            0b10111010: res_b3_r8,
            0b10000011: res_b3_r8,
            0b10001011: res_b3_r8,
            0b10010011: res_b3_r8,
            0b10011011: res_b3_r8,
            0b10100011: res_b3_r8,
            0b10101011: res_b3_r8,
            0b10110011: res_b3_r8,
            0b10111011: res_b3_r8,
            0b10000100: res_b3_r8,
            0b10001100: res_b3_r8,
            0b10010100: res_b3_r8,
            0b10011100: res_b3_r8,
            0b10100100: res_b3_r8,
            0b10101100: res_b3_r8,
            0b10110100: res_b3_r8,
            0b10111100: res_b3_r8,
            0b10000101: res_b3_r8,
            0b10001101: res_b3_r8,
            0b10010101: res_b3_r8,
            0b10011101: res_b3_r8,
            0b10100101: res_b3_r8,
            0b10101101: res_b3_r8,
            0b10110101: res_b3_r8,
            0b10111101: res_b3_r8,
            0b10000110: res_b3_r8,
            0b10001110: res_b3_r8,
            0b10010110: res_b3_r8,
            0b10011110: res_b3_r8,
            0b10100110: res_b3_r8,
            0b10101110: res_b3_r8,
            0b10110110: res_b3_r8,
            0b10111110: res_b3_r8,
            0b10000111: res_b3_r8,
            0b10001111: res_b3_r8,
            0b10010111: res_b3_r8,
            0b10011111: res_b3_r8,
            0b10100111: res_b3_r8,
            0b10101111: res_b3_r8,
            0b10110111: res_b3_r8,
            0b10111111: res_b3_r8,

            0b11000000: set_b3_r8,
            0b11001000: set_b3_r8,
            0b11010000: set_b3_r8,
            0b11011000: set_b3_r8,
            0b11100000: set_b3_r8,
            0b11101000: set_b3_r8,
            0b11110000: set_b3_r8,
            0b11111000: set_b3_r8,
            0b11000001: set_b3_r8,
            0b11001001: set_b3_r8,
            0b11010001: set_b3_r8,
            0b11011001: set_b3_r8,
            0b11100001: set_b3_r8,
            0b11101001: set_b3_r8,
            0b11110001: set_b3_r8,
            0b11111001: set_b3_r8,
            0b11000010: set_b3_r8,
            0b11001010: set_b3_r8,
            0b11010010: set_b3_r8,
            0b11011010: set_b3_r8,
            0b11100010: set_b3_r8,
            0b11101010: set_b3_r8,
            0b11110010: set_b3_r8,
            0b11111010: set_b3_r8,
            0b11000011: set_b3_r8,
            0b11001011: set_b3_r8,
            0b11010011: set_b3_r8,
            0b11011011: set_b3_r8,
            0b11100011: set_b3_r8,
            0b11101011: set_b3_r8,
            0b11110011: set_b3_r8,
            0b11111011: set_b3_r8,
            0b11000100: set_b3_r8,
            0b11001100: set_b3_r8,
            0b11010100: set_b3_r8,
            0b11011100: set_b3_r8,
            0b11100100: set_b3_r8,
            0b11101100: set_b3_r8,
            0b11110100: set_b3_r8,
            0b11111100: set_b3_r8,
            0b11000101: set_b3_r8,
            0b11001101: set_b3_r8,
            0b11010101: set_b3_r8,
            0b11011101: set_b3_r8,
            0b11100101: set_b3_r8,
            0b11101101: set_b3_r8,
            0b11110101: set_b3_r8,
            0b11111101: set_b3_r8,
            0b11000110: set_b3_r8,
            0b11001110: set_b3_r8,
            0b11010110: set_b3_r8,
            0b11011110: set_b3_r8,
            0b11100110: set_b3_r8,
            0b11101110: set_b3_r8,
            0b11110110: set_b3_r8,
            0b11111110: set_b3_r8,
            0b11000111: set_b3_r8,
            0b11001111: set_b3_r8,
            0b11010111: set_b3_r8,
            0b11011111: set_b3_r8,
            0b11100111: set_b3_r8,
            0b11101111: set_b3_r8,
            0b11110111: set_b3_r8,
            0b11111111: set_b3_r8,
        }
    }
}
