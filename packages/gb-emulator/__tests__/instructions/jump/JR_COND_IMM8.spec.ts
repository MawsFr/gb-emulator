import { beforeEach, describe, expect, it } from 'vitest'
import { Cpu } from '@/cpu.ts'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import {
    JR_COND_IMM8,
    JR_COND_IMM8_OPCODE,
} from '@/instructions/jump/JR_COND_IMM8.ts'

describe(JR_COND_IMM8, () => {
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
        opcode: JR_COND_IMM8_OPCODE
        zeroFlag?: number
        carryFlag?: number
    }>([
        {
            opcode: 0b00100000,
            zeroFlag: 0,
        },
        {
            opcode: 0b00101000,
            zeroFlag: 1,
        },
        {
            opcode: 0b00110000,
            carryFlag: 0,
        },
        {
            opcode: 0b00111000,
            carryFlag: 1,
        },
    ])(
        'should jump to the address pointed by PC + 1 if the condition is met',
        ({ opcode, zeroFlag, carryFlag }) => {
            // Given
            registers.F.zeroFlag = zeroFlag ?? 0
            registers.F.carryFlag = carryFlag ?? 0
            registers.PC.value = 0x0
            memory.addresses[0x1] = 0x50

            // When
            new JR_COND_IMM8(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).toBe(0x51)
        }
    )

    it.each<{
        opcode: JR_COND_IMM8_OPCODE
        zeroFlag?: number
        carryFlag?: number
    }>([
        {
            opcode: 0b00100000,
            zeroFlag: 1,
        },
        {
            opcode: 0b00101000,
            zeroFlag: 0,
        },
        {
            opcode: 0b00110000,
            carryFlag: 1,
        },
        {
            opcode: 0b00111000,
            carryFlag: 0,
        },
    ])(
        'should not jump to the address pointed by PC + 1 if the condition is not met',
        ({ opcode, zeroFlag, carryFlag }) => {
            // Given
            registers.F.zeroFlag = zeroFlag ?? 0
            registers.F.carryFlag = carryFlag ?? 0
            registers.PC.value = 0x0
            memory.addresses[0x1] = 0x50

            // When
            new JR_COND_IMM8(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).toBe(0x2)
        }
    )
})
