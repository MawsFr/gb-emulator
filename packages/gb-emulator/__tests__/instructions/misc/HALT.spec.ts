import { describe, it } from 'vitest'
import { HALT } from '@/instructions/misc/HALT.ts'
import { GbEmulatorTestContext } from '../../../../../test.setup.ts'

describe(HALT, () => {
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
    it.todo<GbEmulatorTestContext>('should halt the CPU', () => {})
})
