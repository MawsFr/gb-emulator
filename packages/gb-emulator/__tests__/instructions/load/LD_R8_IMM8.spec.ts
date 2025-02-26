import { beforeEach, describe, expect, it } from 'vitest'
import { LD_R8_IMM8, LD_R8_IMM8_OPCODES } from '@/instructions/ld/LD_R8_IMM8'
import { Cpu } from '@/cpu.ts'
import { R8Code, Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'

describe(LD_R8_IMM8, () => {
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

    it.each<{ opcode: LD_R8_IMM8_OPCODES; expectedRegister: R8Code }>([
        {
            opcode: 0b00_000_110,
            expectedRegister: 0b00,
        },
        {
            opcode: 0b00_001_110,
            expectedRegister: 0b01,
        },
        {
            opcode: 0b00_010_110,
            expectedRegister: 0b10,
        },
        {
            opcode: 0b00_011_110,
            expectedRegister: 0b11,
        },
        {
            opcode: 0b00_100_110,
            expectedRegister: 0b100,
        },
        {
            opcode: 0b00_101_110,
            expectedRegister: 0b101,
        },
        {
            opcode: 0b00_110_110,
            expectedRegister: 0b110,
        },
        {
            opcode: 0b00_111_110,
            expectedRegister: 0b111,
        },
    ])(
        'should load the next bytes into a 8 bits register',
        ({ opcode, expectedRegister }) => {
            // Given
            registers.PC.value = 0x0
            memory.addresses[0x0] = 0x01
            memory.addresses[0x1] = 0x12

            // When
            new LD_R8_IMM8(cpu).execute(opcode)

            // Then
            expect(registers.r8[expectedRegister].value).to.equal(0x12)
            expect(registers.PC.value).to.equal(0x2)
        }
    )
})
