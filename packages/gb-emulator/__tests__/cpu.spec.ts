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
            0b01000000, 0b01001000, 0b01010000, 0b01011000, 0b01100000,
            0b01101000, 0b01110000, 0b01111000, 0b01000001, 0b01001001,
            0b01010001, 0b01011001, 0b01100001, 0b01101001, 0b01110001,
            0b01111001, 0b01000010, 0b01001010, 0b01010010, 0b01011010,
            0b01100010, 0b01101010, 0b01110010, 0b01111010, 0b01000011,
            0b01001011, 0b01010011, 0b01011011, 0b01100011, 0b01101011,
            0b01110011, 0b01111011, 0b01000100, 0b01001100, 0b01010100,
            0b01011100, 0b01100100, 0b01101100, 0b01110100, 0b01111100,
            0b01000101, 0b01001101, 0b01010101, 0b01011101, 0b01100101,
            0b01101101, 0b01110101, 0b01111101, 0b01000110, 0b01001110,
            0b01010110, 0b01011110, 0b01100110, 0b01101110, 0b01111110,
            0b01000111, 0b01001111, 0b01010111, 0b01011111, 0b01100111,
            0b01101111, 0b01110111, 0b01111111,
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
            0b00000000, 0b00000001, 0b00000010, 0b00000011, 0b00000100,
            0b00000101, 0b00000110, 0b00000111,
            // RRC_R8
            0b00001000, 0b00001001, 0b00001010, 0b00001011, 0b00001100,
            0b00001101, 0b00001110, 0b00001111,
            // RL_R8
            0b00010000, 0b00010001, 0b00010010, 0b00010011, 0b00010100,
            0b00010101, 0b00010110, 0b00010111,
            // RR_R8
            0b00011000, 0b00011001, 0b00011010, 0b00011011, 0b00011100,
            0b00011101, 0b00011110, 0b00011111,
            // SLA_R8
            0b00100000, 0b00100001, 0b00100010, 0b00100011, 0b00100100,
            0b00100101, 0b00100110, 0b00100111,
            // SRA_R8
            0b00101000, 0b00101001, 0b00101010, 0b00101011, 0b00101100,
            0b00101101, 0b00101110, 0b00101111,
            // SWAP_R8
            0b00110000, 0b00110001, 0b00110010, 0b00110011, 0b00110100,
            0b00110101, 0b00110110, 0b00110111,
            // SRL_R8
            0b00111000, 0b00111001, 0b00111010, 0b00111011, 0b00111100,
            0b00111101, 0b00111110, 0b00111111,
            // BIT_B3_R8
            0b01000000, 0b01001000, 0b01010000, 0b01011000, 0b01100000,
            0b01101000, 0b01110000, 0b01111000, 0b01000001, 0b01001001,
            0b01010001, 0b01011001, 0b01100001, 0b01101001, 0b01110001,
            0b01111001, 0b01000010, 0b01001010, 0b01010010, 0b01011010,
            0b01100010, 0b01101010, 0b01110010, 0b01111010, 0b01000011,
            0b01001011, 0b01010011, 0b01011011, 0b01100011, 0b01101011,
            0b01110011, 0b01111011, 0b01000100, 0b01001100, 0b01010100,
            0b01011100, 0b01100100, 0b01101100, 0b01110100, 0b01111100,
            0b01000101, 0b01001101, 0b01010101, 0b01011101, 0b01100101,
            0b01101101, 0b01110101, 0b01111101, 0b01000110, 0b01001110,
            0b01010110, 0b01011110, 0b01100110, 0b01101110, 0b01110110,
            0b01111110, 0b01000111, 0b01001111, 0b01010111, 0b01011111,
            0b01100111, 0b01101111, 0b01110111, 0b01111111,
            // RES_B3_R8
            0b10000000, 0b10001000, 0b10010000, 0b10011000, 0b10100000,
            0b10101000, 0b10110000, 0b10111000, 0b10000001, 0b10001001,
            0b10010001, 0b10011001, 0b10100001, 0b10101001, 0b10110001,
            0b10111001, 0b10000010, 0b10001010, 0b10010010, 0b10011010,
            0b10100010, 0b10101010, 0b10110010, 0b10111010, 0b10000011,
            0b10001011, 0b10010011, 0b10011011, 0b10100011, 0b10101011,
            0b10110011, 0b10111011, 0b10000100, 0b10001100, 0b10010100,
            0b10011100, 0b10100100, 0b10101100, 0b10110100, 0b10111100,
            0b10000101, 0b10001101, 0b10010101, 0b10011101, 0b10100101,
            0b10101101, 0b10110101, 0b10111101, 0b10000110, 0b10001110,
            0b10010110, 0b10011110, 0b10100110, 0b10101110, 0b10110110,
            0b10111110, 0b10000111, 0b10001111, 0b10010111, 0b10011111,
            0b10100111, 0b10101111, 0b10110111, 0b10111111,
            // SET_B3_R8
            0b11000000, 0b11001000, 0b11010000, 0b11011000, 0b11100000,
            0b11101000, 0b11110000, 0b11111000, 0b11000001, 0b11001001,
            0b11010001, 0b11011001, 0b11100001, 0b11101001, 0b11110001,
            0b11111001, 0b11000010, 0b11001010, 0b11010010, 0b11011010,
            0b11100010, 0b11101010, 0b11110010, 0b11111010, 0b11000011,
            0b11001011, 0b11010011, 0b11011011, 0b11100011, 0b11101011,
            0b11110011, 0b11111011, 0b11000100, 0b11001100, 0b11010100,
            0b11011100, 0b11100100, 0b11101100, 0b11110100, 0b11111100,
            0b11000101, 0b11001101, 0b11010101, 0b11011101, 0b11100101,
            0b11101101, 0b11110101, 0b11111101, 0b11000110, 0b11001110,
            0b11010110, 0b11011110, 0b11100110, 0b11101110, 0b11110110,
            0b11111110, 0b11000111, 0b11001111, 0b11010111, 0b11011111,
            0b11100111, 0b11101111, 0b11110111, 0b11111111,
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
            memory.write(0x0100, 0b10100000)

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
