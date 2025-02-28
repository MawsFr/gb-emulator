import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Cpu, Opcode, PrefixedOpcode } from '@/cpu.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(Cpu, () => {
    beforeEach<GbEmulatorTestContext>((context) => {
        for (const instruction of Object.values(context.cpu.instructions)) {
            vi.spyOn(instruction, 'execute').mockReturnValue()
        }

        for (const instruction of Object.values(
            context.cpu.prefixedInstructions
        )) {
            vi.spyOn(instruction, 'execute').mockReturnValue()
        }
    })

    describe(Cpu.prototype.getImmediateBytes, () => {
        it<GbEmulatorTestContext>('should return the concatenation of the next 2 bytes and skip them', ({
            registers,
            memory,
            cpu,
        }) => {
            registers.PC.value = 0x0
            memory.addresses[0x0] = 0x01
            memory.addresses[0x1] = 0x34
            memory.addresses[0x2] = 0x12

            const value = cpu.getImmediateBytes({ count: 2 })

            expect(value).to.equal(0x1234)
            expect(registers.PC.value).to.equal(0x02)
        })
    })

    describe(Cpu.prototype.execute, () => {
        it.for<Opcode>([
            // NOP
            0x00000000,
            // LD R16, IMM16
            0b00000001, 0b00010001, 0b00100001, 0b00110001,
            // LD R16MEM, A
            0b00000010, 0b00010010, 0b00100010, 0b00110010,
            // LD A, R16MEM
            0b00001010, 0b00011010, 0b00101010, 0b00111010,
            // LD IMM16, SP
            0b00001000,
            // INC R16
            0b00000011, 0b00010011, 0b00100011, 0b00110011,
            // DEC R16
            0b00001011, 0b00011011, 0b00101011, 0b00111011,
            // ADD HL, R16
            0b00001001, 0b00011001, 0b00101001, 0b00111001,
            // INC R8
            0b00000100, 0b00001100, 0b00010100, 0b00011100, 0b00100100,
            0b00101100, 0b00110100, 0b00111100,
            // DEC R8
            0b00000101, 0b00001101, 0b00010101, 0b00011101, 0b00100101,
            0b00101101, 0b00110101, 0b00111101,
            // LD R8, IMM8
            0b00000110, 0b00001110, 0b00010110, 0b00011110, 0b00100110,
            0b00101110, 0b00110110, 0b00111110,
            // RLCA
            0b00000111,
            // RRCA
            0b00001111,
            // RLA
            0b00010111,
            // RRA
            0b00011111,
            // DAA
            0b00100111,
            // CPL
            0b00101111,
            // SCF
            0b00110111,
            // CCF
            0b00111111,
            // JR IMM8
            0b00011000,
            // JR CC, IMM8
            0b00100000, 0b00101000, 0b00110000, 0b00111000,
            // STOP
            0b00010000,
            // LD R8, R8
            0b01_000_000, 0b01_001_000, 0b01_010_000, 0b01_011_000,
            0b01_100_000, 0b01_101_000, 0b01_110_000, 0b01_111_000,
            0b01_000_001, 0b01_001_001, 0b01_010_001, 0b01_011_001,
            0b01_100_001, 0b01_101_001, 0b01_110_001, 0b01_111_001,
            0b01_000_010, 0b01_001_010, 0b01_010_010, 0b01_011_010,
            0b01_100_010, 0b01_101_010, 0b01_110_010, 0b01_111_010,
            0b01_000_011, 0b01_001_011, 0b01_010_011, 0b01_011_011,
            0b01_100_011, 0b01_101_011, 0b01_110_011, 0b01_111_011,
            0b01_000_100, 0b01_001_100, 0b01_010_100, 0b01_011_100,
            0b01_100_100, 0b01_101_100, 0b01_110_100, 0b01_111_100,
            0b01_000_101, 0b01_001_101, 0b01_010_101, 0b01_011_101,
            0b01_100_101, 0b01_101_101, 0b01_110_101, 0b01_111_101,
            0b01_000_110, 0b01_001_110, 0b01_010_110, 0b01_011_110,
            0b01_100_110, 0b01_101_110, 0b01_111_110, 0b01_000_111,
            0b01_001_111, 0b01_010_111, 0b01_011_111, 0b01_100_111,
            0b01_101_111, 0b01_110_111, 0b01_111_111,
            // ADD A, R8
            0b10000000, 0b10000001, 0b10000010, 0b10000011, 0b10000100,
            0b10000101, 0b10000110, 0b10000111,
            // ADD A, IMM8
            0b11000110,
            // ADC A, R8
            0b10001000, 0b10001001, 0b10001010, 0b10001011, 0b10001100,
            0b10001101, 0b10001110, 0b10001111,
            // ADC A, IMM8
            0b11001110,
            // SUB A, R8
            0b10010000, 0b10010001, 0b10010010, 0b10010011, 0b10010100,
            0b10010101, 0b10010110, 0b10010111,
            // SUB A, IMM8
            0b11010110,
            // SBC A, R8
            0b10011000, 0b10011001, 0b10011010, 0b10011011, 0b10011100,
            0b10011101, 0b10011110, 0b10011111,
            // SBC A, IMM8
            0b11011110,
            // AND A, R8
            0b10100000, 0b10100001, 0b10100010, 0b10100011, 0b10100100,
            0b10100101, 0b10100110, 0b10100111,
            // AND A, IMM8
            0b11100110,
            // XOR A, R8
            0b10101000, 0b10101001, 0b10101010, 0b10101011, 0b10101100,
            0b10101101, 0b10101110, 0b10101111,
            // XOR A, IMM8
            0b11101110,
            // CP A, R8
            0b10111000, 0b10111001, 0b10111010, 0b10111011, 0b10111100,
            0b10111101, 0b10111110, 0b10111111,
            // CP A, IMM8
            0b11111110,
            // RET COND
            0b11000000, 0b11001000, 0b11010000, 0b11011000,
            // RET
            0b11001001,
            // RETI
            0b11011001,
            // JP IMM16
            0b11000011,
            // JP COND IMM16
            0b11000010, 0b11001010, 0b11010010, 0b11011010,
            // JP HL
            0b11101001,
            // CALL IMM16
            0b11001101,
            // CALL COND IMM16
            0b11000100, 0b11001100, 0b11010100, 0b11011100,
            // RST TGT3
            0b11000111, 0b11001111, 0b11010111, 0b11011111, 0b11100111,
            0b11101111, 0b11110111, 0b11111111,
            // POP R16STK
            0b11000001, 0b11010001, 0b11100001, 0b11110001,
            // PUSH R16STK
            0b11000101, 0b11010101, 0b11100101, 0b11110101,
            // LDH (C), A
            0b11100010,
            // LDH (IMM8), A
            0b11100000,
            // LD (IMM16), A
            0b11101010,
            // LDH A, (C)
            0b11110010,
            // LDH A, (IMM8)
            0b11110000,
            // LD A, [IMM16]
            0b11111010,
            // ADD SP, IMM8
            0b11101000,
            // LD HL, SP + IMM8
            0b11111000,
            // LD SP, HL
            0b11111001,
            // EI
            0b11111011,
            // DI
            0b11110011,
            // Hard lock
            0xD3, 0xDB, 0xDD, 0xE3, 0xE4, 0xEB, 0xEC, 0xED, 0xF4, 0xFC, 0xFD,
            // CB (prefixed)
            0b11001011,
        ])('should call the right instruction', (opcode, { cpu }) => {
            // Given
            const instruction = cpu.instructions[opcode]

            // When
            cpu.execute(opcode)

            // Then
            expect(instruction.execute).toHaveBeenCalledWith(opcode)
        })
    })

    describe(Cpu.prototype.executePrefixed, () => {
        it.for<PrefixedOpcode>([
            // RLC_R8
            0b00000_000, 0b00000_001, 0b00000_010, 0b00000_011, 0b00000_100,
            0b00000_101, 0b00000_110, 0b00000_111,
            // RRC_R8
            0b00001_000, 0b00001_001, 0b00001_010, 0b00001_011, 0b00001_100,
            0b00001_101, 0b00001_110, 0b00001_111,
            // RL_R8
            0b00010_000, 0b00010_001, 0b00010_010, 0b00010_011, 0b00010_100,
            0b00010_101, 0b00010_110, 0b00010_111,
            // RR_R8
            0b00011_000, 0b00011_001, 0b00011_010, 0b00011_011, 0b00011_100,
            0b00011_101, 0b00011_110, 0b00011_111,
            // SLA_R8
            0b00100_000, 0b00100_001, 0b00100_010, 0b00100_011, 0b00100_100,
            0b00100_101, 0b00100_110, 0b00100_111,
            // SRA_R8
            0b00101_000, 0b00101_001, 0b00101_010, 0b00101_011, 0b00101_100,
            0b00101_101, 0b00101_110, 0b00101_111,
            // SWAP_R8
            0b00110_000, 0b00110_001, 0b00110_010, 0b00110_011, 0b00110_100,
            0b00110_101, 0b00110_110, 0b00110_111,
            // SRL_R8
            0b00111_000, 0b00111_001, 0b00111_010, 0b00111_011, 0b00111_100,
            0b00111_101, 0b00111_110, 0b00111_111,
            // BIT_B3_R8
            0b01_000_000, 0b01_001_000, 0b01_010_000, 0b01_011_000,
            0b01_100_000, 0b01_101_000, 0b01_110_000, 0b01_111_000,
            0b01_000_001, 0b01_001_001, 0b01_010_001, 0b01_011_001,
            0b01_100_001, 0b01_101_001, 0b01_110_001, 0b01_111_001,
            0b01_000_010, 0b01_001_010, 0b01_010_010, 0b01_011_010,
            0b01_100_010, 0b01_101_010, 0b01_110_010, 0b01_111_010,
            0b01_000_011, 0b01_001_011, 0b01_010_011, 0b01_011_011,
            0b01_100_011, 0b01_101_011, 0b01_110_011, 0b01_111_011,
            0b01_000_100, 0b01_001_100, 0b01_010_100, 0b01_011_100,
            0b01_100_100, 0b01_101_100, 0b01_110_100, 0b01_111_100,
            0b01_000_101, 0b01_001_101, 0b01_010_101, 0b01_011_101,
            0b01_100_101, 0b01_101_101, 0b01_110_101, 0b01_111_101,
            0b01_000_110, 0b01_001_110, 0b01_010_110, 0b01_011_110,
            0b01_100_110, 0b01_101_110, 0b01_110_110, 0b01_111_110,
            0b01_000_111, 0b01_001_111, 0b01_010_111, 0b01_011_111,
            0b01_100_111, 0b01_101_111, 0b01_110_111, 0b01_111_111,
            // RES_B3_R8
            0b10_000_000, 0b10_001_000, 0b10_010_000, 0b10_011_000,
            0b10_100_000, 0b10_101_000, 0b10_110_000, 0b10_111_000,
            0b10_000_001, 0b10_001_001, 0b10_010_001, 0b10_011_001,
            0b10_100_001, 0b10_101_001, 0b10_110_001, 0b10_111_001,
            0b10_000_010, 0b10_001_010, 0b10_010_010, 0b10_011_010,
            0b10_100_010, 0b10_101_010, 0b10_110_010, 0b10_111_010,
            0b10_000_011, 0b10_001_011, 0b10_010_011, 0b10_011_011,
            0b10_100_011, 0b10_101_011, 0b10_110_011, 0b10_111_011,
            0b10_000_100, 0b10_001_100, 0b10_010_100, 0b10_011_100,
            0b10_100_100, 0b10_101_100, 0b10_110_100, 0b10_111_100,
            0b10_000_101, 0b10_001_101, 0b10_010_101, 0b10_011_101,
            0b10_100_101, 0b10_101_101, 0b10_110_101, 0b10_111_101,
            0b10_000_110, 0b10_001_110, 0b10_010_110, 0b10_011_110,
            0b10_100_110, 0b10_101_110, 0b10_110_110, 0b10_111_110,
            0b10_000_111, 0b10_001_111, 0b10_010_111, 0b10_011_111,
            0b10_100_111, 0b10_101_111, 0b10_110_111, 0b10_111_111,
            // SET_B3_R8
            0b11_000_000, 0b11_001_000, 0b11_010_000, 0b11_011_000,
            0b11_100_000, 0b11_101_000, 0b11_110_000, 0b11_111_000,
            0b11_000_001, 0b11_001_001, 0b11_010_001, 0b11_011_001,
            0b11_100_001, 0b11_101_001, 0b11_110_001, 0b11_111_001,
            0b11_000_010, 0b11_001_010, 0b11_010_010, 0b11_011_010,
            0b11_100_010, 0b11_101_010, 0b11_110_010, 0b11_111_010,
            0b11_000_011, 0b11_001_011, 0b11_010_011, 0b11_011_011,
            0b11_100_011, 0b11_101_011, 0b11_110_011, 0b11_111_011,
            0b11_000_100, 0b11_001_100, 0b11_010_100, 0b11_011_100,
            0b11_100_100, 0b11_101_100, 0b11_110_100, 0b11_111_100,
            0b11_000_101, 0b11_001_101, 0b11_010_101, 0b11_011_101,
            0b11_100_101, 0b11_101_101, 0b11_110_101, 0b11_111_101,
            0b11_000_110, 0b11_001_110, 0b11_010_110, 0b11_011_110,
            0b11_100_110, 0b11_101_110, 0b11_110_110, 0b11_111_110,
            0b11_000_111, 0b11_001_111, 0b11_010_111, 0b11_011_111,
            0b11_100_111, 0b11_101_111, 0b11_110_111, 0b11_111_111,
        ])('should call the right prefixed instruction', (opcode, { cpu }) => {
            // Given
            const instruction = cpu.prefixedInstructions[opcode]

            // When
            cpu.executePrefixed(opcode)

            // Then
            expect(instruction.execute).toHaveBeenCalledWith(opcode)
        })
    })

    describe(Cpu.prototype.fetchNextByte, () => {
        it<GbEmulatorTestContext>('should return a normal opcode', ({
            memory,
            cpu,
        }) => {
            // Given
            memory.addresses[0x0100] = 0b10100000

            // When
            const opcode = cpu.fetchNextByte()

            // Then
            expect(opcode).to.equal(0b10100000)
        })
    })

    describe(Cpu.prototype.decode, () => {
        it<GbEmulatorTestContext>('should return the opcode if exists', ({
            cpu,
        }) => {
            const byte: number = 0b10100000

            const opcode = cpu.decode(byte)

            expect(opcode).toBeDefined()
        })

        it<GbEmulatorTestContext>('should fail if opcode is unknown', ({
            cpu,
        }) => {
            const byte: number = 0b111111111

            expect(() => cpu.decode(byte)).toThrow(
                'Unknown instruction 1FF | 111111111'
            )
        })
    })

    describe(Cpu.prototype.decodePrefixed, () => {
        it<GbEmulatorTestContext>('should return the prefixed opcode if exists', ({
            cpu,
        }) => {
            const byte: number = 0b10100000

            const opcode = cpu.decodePrefixed(byte)

            expect(opcode).toBeDefined()
        })

        it<GbEmulatorTestContext>('should fail if the prefixed opcode is unknown', ({
            cpu,
        }) => {
            const byte: number = 0b111111111

            expect(() => cpu.decodePrefixed(byte)).toThrow(
                'Unknown prefixed instruction'
            )
        })
    })

    describe(Cpu.prototype.dispatch, () => {
        it<GbEmulatorTestContext>('should fetch, decode and execute next opcode', ({
            cpu,
        }) => {
            // Given
            vi.spyOn(cpu, 'fetchNextByte').mockReturnValue(0b10100000)
            vi.spyOn(cpu, 'decode').mockReturnValue(0b10100000)
            vi.spyOn(cpu.instructions[0b10100000], 'execute')

            // When
            cpu.dispatch()

            // Then
            expect(cpu.fetchNextByte).toHaveBeenCalledOnce()
            expect(cpu.decode).toHaveBeenCalledExactlyOnceWith(0b10100000)
            expect(cpu.instructions[0b10100000].execute).toHaveBeenCalledOnce()
        })
    })

    describe(Cpu.prototype.startDispatchLoop, () => {
        it<GbEmulatorTestContext>('should periodically dispatch opcodes', ({
            cpu,
        }) => {
            // Given
            vi.spyOn(cpu, 'dispatch').mockImplementation(vi.fn())

            // When
            cpu.startDispatchLoop()
            vi.advanceTimersByTime(1000 / 60)

            // Then
            expect(cpu.dispatch).toHaveBeenCalledOnce()
        })
    })

    describe(Cpu.prototype.loadROM, () => {
        it<GbEmulatorTestContext>('should load the ROM at address 0000', ({
            cpu,
            memory,
        }) => {
            cpu.loadROM(Uint8Array.from([0x11, 0x22, 0x33]))

            expect(memory.addresses[0x0]).to.equal(0x11)
            expect(memory.addresses[0x1]).to.equal(0x22)
            expect(memory.addresses[0x2]).to.equal(0x33)
        })
    })
})
