import { describe, it } from 'vitest'
import { STOP } from '@/instructions/misc/STOP.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(STOP, () => {
    // Let registers: Registers
    // Let memory: Memory
    // Let cpu: Cpu
    //
    // BeforeEach(() => {
    //     Memory = new Memory()
    //     Registers = new Registers(memory)
    //     Cpu = new Cpu({
    //         Registers,
    //         Memory
    //     })
    // })

    // eslint-disable-next-line no-empty-function
    it.todo<GbEmulatorTestContext>('should stop the CPU', () => {})
})
