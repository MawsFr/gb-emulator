import { beforeEach, describe, expect, it } from 'vitest'
import { Cpu } from '@/cpu.ts'
import { R16Code, Registers } from '@/registers.ts'
import { Memory } from '@/memory.ts'
import { INC_R16, INC_R16_OPCODES } from '@/instructions/inc/INC_R16.ts'

describe(INC_R16, () => {
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

    it.each<{ opcode: INC_R16_OPCODES; expectedRegister: R16Code }>([
        {
            opcode: 0b00_00_0011,
            expectedRegister: 0b00,
        },
        {
            opcode: 0b00_01_0011,
            expectedRegister: 0b01,
        },
        {
            opcode: 0b00_10_0011,
            expectedRegister: 0b10,
        },
        {
            opcode: 0b00_11_0011,
            expectedRegister: 0b11,
        },
    ])(
        'should increment the value in register $expectedRegister',
        ({ opcode, expectedRegister }) => {
            // Given
            registers.PC.value = 0x0
            registers.r16[expectedRegister].value = 0x50

            // When
            new INC_R16(cpu).execute(opcode)

            // Then
            expect(registers.r16[expectedRegister].value).to.equal(0x51)
            expect(registers.PC.value).to.equal(0x1)
        }
    )
})
