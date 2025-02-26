import { describe, expect, it } from 'vitest'
import { HARD_LOCK } from '@/instructions/hard-lock/HARD_LOCK.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(HARD_LOCK, () => {
    it<GbEmulatorTestContext>('should lock the game boy', ({ cpu }) => {
        // When
        new HARD_LOCK(cpu).execute()
        // Then
        expect(cpu.isHardLocked()).toBeTruthy()
    })
})
