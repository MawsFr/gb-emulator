import { describe, expect, it } from 'vitest'
import { Cpu } from '@/cpu.ts'
import { Registers } from '@/registers/registers.ts'
import {
    Immediate8SourceStrategy,
    RegisterSourceStrategy,
} from '@/instructions/source-strategies.ts'

describe(Immediate8SourceStrategy, () => {
    it('should return the immediate value', () => {
        // Given
        const cpu: Cpu = {
            getImmediate8: () => 0x1,
        } as Cpu

        // When
        const strategy = new Immediate8SourceStrategy(cpu)

        // Then
        expect(strategy.getValue()).to.equal(0x1)
    })
})

describe(RegisterSourceStrategy, () => {
    it('should return the register value', () => {
        // Given
        const registers = {
            r8: {
                0b000: { value: 0x1 },
            },
        } as Registers

        // When
        const strategy = new RegisterSourceStrategy(0b000, registers)

        // Then
        expect(strategy.getValue()).to.equal(0x1)
    })
})
