import { Pointer, Pointer16, Registers } from '@/registers.ts'
import { Immediate16, Immediate8, Memory } from '@/memory.ts'
import { InstructionLoader } from '@/instructions/instruction-loader.ts'
import { Instruction } from '@/instructions/instruction.ts'
import { LD_R16_IMM16_OPCODES } from '@/instructions/load/LD_R16_IMM16.ts'
import { LD_R16MEM_A_OPCODES } from '@/instructions/load/LD_R16MEM_A.ts'
import { LD_A_R16MEM_OPCODES } from '@/instructions/load/LD_A_R16MEM.ts'
import { LD_IMM16_SP_OPCODE } from '@/instructions/load/LD_IMM16_SP.ts'
import { INC_R16_OPCODES } from '@/instructions/inc/INC_R16.ts'
import { DEC_R16_OPCODES } from '@/instructions/dec/DEC_R16.ts'
import { ADD_HL_R16_OPCODES } from '@/instructions/add/ADD_HL_R16.ts'
import { INC_R8_OPCODES } from '@/instructions/inc/INC_R8.ts'
import { DEC_R8_OPCODES } from '@/instructions/dec/DEC_R8.ts'
import { LD_R8_IMM8_OPCODES } from '@/instructions/load/LD_R8_IMM8.ts'
import { RLCA_OPCODE } from '@/instructions/rotate/RLCA.ts'
import { RRCA_OPCODE } from '@/instructions/rotate/RRCA.ts'
import { RLA_OPCODE } from '@/instructions/rotate/RLA.ts'
import { RRA_OPCODE } from '@/instructions/rotate/RRA.ts'
import { DAA_OPCODE } from '@/instructions/misc/DAA.ts'
import { CPL_OPCODE } from '@/instructions/misc/CPL.ts'
import { SCF_OPCODE } from '@/instructions/misc/SCF.ts'
import { CCF_OPCODE } from '@/instructions/misc/CCF.ts'
import { JR_IMM8_OPCODE } from '@/instructions/jump/JR_IMM8.ts'
import { JR_COND_IMM8_OPCODE } from '@/instructions/jump/JR_COND_IMM8.ts'
import { STOP_OPCODE } from '@/instructions/misc/STOP.ts'
import { LD_R8_R8_OPCODES } from '@/instructions/load/LD_R8_R8.ts'
import { HALT_OPCODE } from '@/instructions/misc/HALT.ts'
import {
    ADD_A_IMM8_OPCODE,
    ADD_A_R8_OPCODES,
} from '@/instructions/add/ADD_A_8_SOURCE.ts'
import {
    ADC_A_IMM8_OPCODE,
    ADC_A_R8_OPCODES,
} from '@/instructions/add/ADC_A_8_SOURCE.ts'
import {
    SUB_A_IMM8_OPCODE,
    SUB_A_R8_OPCODES,
} from '@/instructions/sub/SUB_A_8_SOURCE.ts'
import {
    SBC_A_IMM8_OPCODE,
    SBC_A_R8_OPCODES,
} from '@/instructions/sub/SBC_A_8_SOURCE.ts'
import {
    AND_A_IMM8_OPCODE,
    AND_A_R8_OPCODES,
} from '@/instructions/bitwise/AND_A_8_SOURCE.ts'
import {
    XOR_A_IMM8_OPCODE,
    XOR_A_R8_OPCODES,
} from '@/instructions/bitwise/XOR_A_8_SOURCE.ts'
import {
    OR_A_IMM8_OPCODE,
    OR_A_R8_OPCODES,
} from '@/instructions/bitwise/OR_A_8_SOURCE.ts'
import {
    CP_A_IMM8_OPCODE,
    CP_A_R8_OPCODES,
} from '@/instructions/sub/CP_A_8_SOURCE.ts'
import { RET_OPCODE } from '@/instructions/ret/RET.ts'
import { RET_COND_OPCODES } from '@/instructions/ret/RET_COND.ts'
import { JP_IMM16_OPCODE } from '@/instructions/jump/JP_IMM16.ts'
import { JP_COND_IMM16_OPCODE } from '@/instructions/jump/JP_COND_IMM16.ts'
import { JP_HL_OPCODE } from '@/instructions/jump/JP_HL.ts'
import { CALL_IMM16_OPCODE } from '@/instructions/call/CALL_IMM16.ts'
import { CALL_COND_IMM16_OPCODES } from '@/instructions/call/CALL_COND_IMM16.ts'
import { RST_TGT3_OPCODES } from '@/instructions/misc/RST_TGT3.ts'
import { POP_R16STK_OPCODES } from '@/instructions/stack/POP_R16STK.ts'
import { PUSH_R16STK_OPCODES } from '@/instructions/stack/PUSH_R16STK.ts'
import { LDH_C_A_OPCODE } from '@/instructions/load/LDH_C_A.ts'
import { LDH_IMM8_A_OPCODE } from '@/instructions/load/LDH_IMM8_A.ts'
import { LD_IMM16_A_OPCODE } from '@/instructions/load/LD_IMM16_A.ts'
import { LDH_A_C_OPCODE } from '@/instructions/load/LDH_A_C.ts'
import { LDH_A_IMM8_OPCODE } from '@/instructions/load/LDH_A_IMM8.ts'
import { LD_A_IMM16_OPCODE } from '@/instructions/load/LD_A_IMM16.ts'
import { ADD_SP_IMM8_OPCODE } from '@/instructions/add/ADD_SP_IMM8.ts'
import { LD_HL_SP_PLUS_IMM8_OPCODE } from '@/instructions/load/LD_HL_SP_PLUS_IMM8.ts'
import { LD_SP_HL_OPCODE } from '@/instructions/load/LD_SP_HL.ts'
import { RETI_OPCODE } from '@/instructions/ret/RETI.ts'
import { EI_OPCODE } from '@/instructions/interrupts/EI.ts'
import { DI_OPCODE } from '@/instructions/interrupts/DI.ts'
import { HARD_LOCK_OPCODES } from '@/instructions/hard-lock/HARD_LOCK.ts'
import { RLC_R8_OPCODES } from '@/instructions/prefixed-instructions/RLC_R8.ts'
import { RRC_R8_OPCODES } from '@/instructions/prefixed-instructions/RRC_R8.ts'
import { RL_R8_OPCODES } from '@/instructions/prefixed-instructions/RL_R8.ts'
import { RR_R8_OPCODES } from '@/instructions/prefixed-instructions/RR_R8.ts'
import { SLA_R8_OPCODES } from '@/instructions/prefixed-instructions/SLA_R8.ts'
import { SRA_R8_OPCODES } from '@/instructions/prefixed-instructions/SRA_R8.ts'
import { SWAP_R8_OPCODES } from '@/instructions/prefixed-instructions/SWAP_R8.ts'
import { SRL_R8_OPCODES } from '@/instructions/prefixed-instructions/SRL_R8.ts'
import { BIT_B3_R8_OPCODES } from './instructions/prefixed-instructions/BIT_B3_R8'
import { RES_B3_R8_OPCODES } from './instructions/prefixed-instructions/RES_B3_R8'
import { SET_B3_R8_OPCODES } from './instructions/prefixed-instructions/SET_B3_R8'
import { CB_OPCODE } from '@/instructions/prefixed-instructions/CB.ts'
import { NOP_OPCODE } from '@/instructions/misc/NOP.ts'

export interface CpuConfig {
    registers: Registers
    memory: Memory
}

export type Opcode =
    | NOP_OPCODE
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
    | HALT_OPCODE
    | LD_R8_R8_OPCODES
    | ADD_A_R8_OPCODES
    | ADD_A_IMM8_OPCODE
    | ADC_A_R8_OPCODES
    | ADC_A_IMM8_OPCODE
    | SUB_A_R8_OPCODES
    | SUB_A_IMM8_OPCODE
    | SBC_A_R8_OPCODES
    | SBC_A_IMM8_OPCODE
    | AND_A_R8_OPCODES
    | AND_A_IMM8_OPCODE
    | XOR_A_R8_OPCODES
    | XOR_A_IMM8_OPCODE
    | OR_A_R8_OPCODES
    | OR_A_IMM8_OPCODE
    | CP_A_R8_OPCODES
    | CP_A_IMM8_OPCODE
    | RET_COND_OPCODES
    | RET_OPCODE
    | RETI_OPCODE
    | JP_IMM16_OPCODE
    | JP_COND_IMM16_OPCODE
    | JP_HL_OPCODE
    | CALL_IMM16_OPCODE
    | CALL_COND_IMM16_OPCODES
    | RST_TGT3_OPCODES
    | POP_R16STK_OPCODES
    | PUSH_R16STK_OPCODES
    | LDH_C_A_OPCODE
    | LDH_IMM8_A_OPCODE
    | LD_IMM16_A_OPCODE
    | LDH_A_C_OPCODE
    | LDH_A_IMM8_OPCODE
    | LD_A_IMM16_OPCODE
    | ADD_SP_IMM8_OPCODE
    | LD_HL_SP_PLUS_IMM8_OPCODE
    | LD_SP_HL_OPCODE
    | EI_OPCODE
    | DI_OPCODE
    | HARD_LOCK_OPCODES
    | CB_OPCODE

export type PrefixedOpcode =
    | RLC_R8_OPCODES
    | RRC_R8_OPCODES
    | RL_R8_OPCODES
    | RR_R8_OPCODES
    | SLA_R8_OPCODES
    | SRA_R8_OPCODES
    | SWAP_R8_OPCODES
    | SRL_R8_OPCODES
    | BIT_B3_R8_OPCODES
    | RES_B3_R8_OPCODES
    | SET_B3_R8_OPCODES

export class Cpu {
    public readonly registers: Registers
    public readonly memory: Memory

    public readonly instructions: Record<Opcode, Instruction>
    public readonly prefixedInstructions: Record<PrefixedOpcode, Instruction>

    private hardLocked: boolean = false

    public readonly imm8: Immediate8
    public readonly imm16: Immediate16
    public readonly '[imm8]': Pointer
    public readonly '[imm16]': Pointer16
    public readonly '[FF00+C]': Pointer
    public readonly '[FF00+imm8]': Pointer

    constructor(config: CpuConfig) {
        this.registers = config.registers
        this.memory = config.memory

        this.imm8 = new Immediate8(this.memory, this.registers.PC)
        this.imm16 = new Immediate16(this.memory, this.registers.PC)

        this['[imm8]'] = new Pointer(this.imm8, this.memory)
        this['[imm16]'] = new Pointer16(this.imm16, this.memory)
        this['[FF00+C]'] = new Pointer(this.registers.C, this.memory, 0xFF00)
        this['[FF00+imm8]'] = new Pointer(this.imm8, this.memory, 0xFF00)

        this.instructions = InstructionLoader.loadInstructions(this)
        this.prefixedInstructions
            = InstructionLoader.loadPrefixedInstructions(this)
    }

    getImmediate8() {
        return this.imm8.value
    }

    getImmediate16() {
        return this.imm16.value
    }

    getCurrentAddress() {
        return this.registers.PC.value
    }

    goToAddress(address: number) {
        this.registers.PC.value = address
    }

    goToRelativeAddress(addend: number) {
        this.registers.PC.value += addend
    }

    goToNextInstruction(additionalBytes: number = 0) {
        this.goToRelativeAddress(1 + additionalBytes)
    }

    getValuePointedByImmediate18() {
        return this['[imm8]'].value
    }

    getValuePointedByImmediate16() {
        return this['[imm16]'].value
    }

    setValuePointedByImmediate16(value: number) {
        this['[imm16]'].value = value
    }

    execute(opcode: Opcode) {
        this.instructions[opcode].execute(opcode)
    }

    executePrefixed(opcode: PrefixedOpcode) {
        this.prefixedInstructions[opcode].execute(opcode)
    }

    hardLock() {
        this.hardLocked = true
    }

    isHardLocked() {
        return this.hardLocked
    }

    loadROM(rom: Uint8Array) {
        for (const [address, byte] of [...rom].entries()) {
            this.memory.write(address, byte)
        }
    }

    startDispatchLoop() {
        setInterval(() => {
            this.dispatch()
        }, 1000 / 60)
    }

    dispatch() {
        const opcode = this.decode(this.fetchNextByte())
        const instruction = this.instructions[opcode]

        // eslint-disable-next-line no-console
        console.log(
            `Executing opcode : ${opcode.toString(16).toUpperCase()} | ${opcode.toString(2)} | ${instruction.toString(opcode)}`
        )

        instruction.execute(opcode)
    }

    fetchNextByte(): number {
        const byte = this.memory.addresses[this.registers.PC.value]
        // eslint-disable-next-line no-console
        console.log(
            `Fetching byte : ${byte.toString(16).toUpperCase()} | ${byte.toString(2)}`
        )
        return byte
    }

    decode(byte: number): Opcode {
        const opcode = byte

        if (!this.isValidOpcode(opcode)) {
            throw new Error(
                `Unknown instruction ${opcode.toString(16).toUpperCase()} | ${opcode.toString(2)}`
            )
        }

        return opcode as Opcode
    }

    isValidOpcode(opcode: number) {
        return Object.keys(this.instructions).includes(String(opcode))
    }

    decodePrefixed(byte: number): PrefixedOpcode {
        const opcode = byte

        if (!Object.keys(this.prefixedInstructions).includes(String(opcode))) {
            throw new Error('Unknown prefixed instruction')
        }

        return opcode as PrefixedOpcode
    }
}
