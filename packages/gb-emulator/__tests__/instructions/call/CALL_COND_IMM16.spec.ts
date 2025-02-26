import { beforeEach, describe, expect, it } from 'vitest'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { Cpu } from '@/cpu.ts'
import {
    CALL_COND_IMM16,
    CALL_COND_IMM16_OPCODES,
} from '@/instructions/call/CALL_COND_IMM16.ts'

describe(CALL_COND_IMM16, () => {
    let registers: Registers
    let memory: Memory
    let cpu: Cpu

    beforeEach(() => {
        memory = new Memory()
        registers = new Registers(memory)
        cpu = new Cpu({
            registers,
            memory,
        })
    })

    it.each<{
        opcode: CALL_COND_IMM16_OPCODES
        zeroFlag?: number
        carryFlag?: number
    }>([
        {
            opcode: 0b110_00_100,
            zeroFlag: 0,
        },
        {
            opcode: 0b110_01_100,
            zeroFlag: 1,
        },
        {
            opcode: 0b110_10_100,
            carryFlag: 0,
        },
        {
            opcode: 0b110_11_100,
            carryFlag: 1,
        },
    ])(
        'should call the address specified by the immediate 16 bits if the condition is met',
        ({ opcode, zeroFlag, carryFlag }) => {
            // Given
            registers.F.zeroFlag = zeroFlag ?? 0
            registers.F.carryFlag = carryFlag ?? 0
            memory.addresses[0x1] = 0x51
            memory.addresses[0x2] = 0x50

            registers.PC.value = 0x0
            registers.SP.value = 0xFFFE

            // When
            new CALL_COND_IMM16(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).toBe(0x5051)
            expect(registers.SP.value).toBe(0xFFFC)
            expect(memory.addresses[0xFFFD]).toBe(0x3)
            expect(memory.addresses[0xFFFC]).toBe(0x0)
        }
    )

    it.each<{
        opcode: CALL_COND_IMM16_OPCODES
        zeroFlag?: number
        carryFlag?: number
    }>([
        {
            opcode: 0b110_00_100,
            zeroFlag: 1,
        },
        {
            opcode: 0b110_01_100,
            zeroFlag: 0,
        },
        {
            opcode: 0b110_10_100,
            carryFlag: 1,
        },
        {
            opcode: 0b110_11_100,
            carryFlag: 0,
        },
    ])(
        'should not call the address specified by the immediate 16 bits if the condition is not met',
        ({ opcode, zeroFlag, carryFlag }) => {
            // Given
            registers.F.zeroFlag = zeroFlag ?? 0
            registers.F.carryFlag = carryFlag ?? 0
            memory.addresses[0x1] = 0x50
            memory.addresses[0x2] = 0x51

            registers.PC.value = 0x0
            registers.SP.value = 0xFFFE

            // When
            new CALL_COND_IMM16(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).toBe(0x3)
            expect(registers.SP.value).toBe(0xFFFE)
        }
    )
})
