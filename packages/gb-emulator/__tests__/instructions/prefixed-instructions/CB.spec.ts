import { describe, expect, it, vi } from 'vitest'
import { GbEmulatorTestContext } from '$/test.setup.ts'
import { CB } from '@/instructions/prefixed-instructions/CB.ts'

describe(CB, () => {
    it<GbEmulatorTestContext>('should execute a prefixed instruction', ({
        registers,
        cpu,
        memory,
    }) => {
        vi.spyOn(cpu, 'decodePrefixed')
        vi.spyOn(cpu, 'executePrefixed')
        registers.PC.value = 0x0
        memory.write(0x1, 0b01_000_000)

        // When
        new CB(cpu).execute()

        // Then
        expect(cpu.decodePrefixed).toHaveBeenCalledWith(0b01_000_000)
        expect(cpu.executePrefixed).toHaveBeenCalledWith(0b01_000_000)
        expect(registers.PC.value).to.equal(0x02)
    })
})
