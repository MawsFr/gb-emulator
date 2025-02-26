import { beforeEach, describe, expect, it } from 'vitest'
import { Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { Cpu } from '@/cpu.ts'
import { RET_COND, RET_COND_OPCODES } from '@/instructions/ret/RET_COND.ts'

describe(RET_COND, () => {
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
        opcode: RET_COND_OPCODES
        zeroFlag?: number
        carryFlag?: number
    }>([
        {
            opcode: 0b11000000,
            zeroFlag: 0,
        },
        {
            opcode: 0b11001000,
            zeroFlag: 1,
        },
        {
            opcode: 0b11010000,
            carryFlag: 0,
        },
        {
            opcode: 0b11011000,
            carryFlag: 1,
        },
    ])(
        'should return if the condition is met',
        ({ opcode, zeroFlag, carryFlag }) => {
            // Given
            registers.F.zeroFlag = zeroFlag ?? 0
            registers.F.carryFlag = carryFlag ?? 0
            registers.PC.value = 0x50
            registers.SP.value = 0xFFFC
            memory.addresses[0xFFFC] = 0x34
            memory.addresses[0xFFFD] = 0x12

            // When
            new RET_COND(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).to.equal(0x1235)
            expect(registers.SP.value).to.equal(0xFFFE)
        }
    )

    it.each<{
        opcode: RET_COND_OPCODES
        zeroFlag?: number
        carryFlag?: number
    }>([
        {
            opcode: 0b11000000,
            zeroFlag: 1,
        },
        {
            opcode: 0b11001000,
            zeroFlag: 0,
        },
        {
            opcode: 0b11010000,
            carryFlag: 1,
        },
        {
            opcode: 0b11011000,
            carryFlag: 0,
        },
    ])(
        'should not return if the condition is not met',
        ({ opcode, zeroFlag, carryFlag }) => {
            // Given
            registers.F.zeroFlag = zeroFlag ?? 0
            registers.F.carryFlag = carryFlag ?? 0
            registers.PC.value = 0x50
            registers.SP.value = 0xFFFC
            memory.addresses[0xFFFC] = 0x34
            memory.addresses[0xFFFD] = 0x12

            // When
            new RET_COND(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).to.equal(0x51)
            expect(registers.SP.value).to.equal(0xFFFC)
        }
    )
})
