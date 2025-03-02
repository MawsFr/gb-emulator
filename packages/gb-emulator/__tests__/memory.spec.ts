import { describe, expect, it } from 'vitest'
import { Memory } from '@/memory.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(Memory, () => {
    it<GbEmulatorTestContext>('should have a 64KB of 8 bits addresses from 0x0 to 0xFFFF', ({
        memory,
    }) => {
        expect(memory.addresses)
            .to.be.an.instanceof(Uint8Array)
            .and.have.length(0x10000)
    })

    it<GbEmulatorTestContext>('should init memory with default values', ({
        memory,
    }) => {
        expect(memory.addresses[0xFF05]).toBe(0x00)
        expect(memory.addresses[0xFF06]).toBe(0x00)
        expect(memory.addresses[0xFF07]).toBe(0x00)
        expect(memory.addresses[0xFF10]).toBe(0x80)
        expect(memory.addresses[0xFF11]).toBe(0xBF)
        expect(memory.addresses[0xFF12]).toBe(0xF3)
        expect(memory.addresses[0xFF14]).toBe(0xBF)
        expect(memory.addresses[0xFF16]).toBe(0x3F)
        expect(memory.addresses[0xFF17]).toBe(0x00)
        expect(memory.addresses[0xFF19]).toBe(0xBF)
        expect(memory.addresses[0xFF1A]).toBe(0x7F)
        expect(memory.addresses[0xFF1B]).toBe(0xFF)
        expect(memory.addresses[0xFF1C]).toBe(0x9F)
        expect(memory.addresses[0xFF1E]).toBe(0xBF)
        expect(memory.addresses[0xFF20]).toBe(0xFF)
        expect(memory.addresses[0xFF21]).toBe(0x00)
        expect(memory.addresses[0xFF22]).toBe(0x00)
        expect(memory.addresses[0xFF23]).toBe(0xBF)
        expect(memory.addresses[0xFF24]).toBe(0x77)
        expect(memory.addresses[0xFF25]).toBe(0xF3)
        expect(memory.addresses[0xFF26]).toBe(0xF1)
        expect(memory.addresses[0xFF40]).toBe(0x91)
        expect(memory.addresses[0xFF42]).toBe(0x00)
        expect(memory.addresses[0xFF43]).toBe(0x00)
        expect(memory.addresses[0xFF45]).toBe(0x00)
        expect(memory.addresses[0xFF47]).toBe(0xFC)
        expect(memory.addresses[0xFF48]).toBe(0xFF)
        expect(memory.addresses[0xFF49]).toBe(0xFF)
        expect(memory.addresses[0xFF4A]).toBe(0x00)
        expect(memory.addresses[0xFF4B]).toBe(0x00)
        expect(memory.addresses[0xFFFF]).toBe(0x00)
    })
})
