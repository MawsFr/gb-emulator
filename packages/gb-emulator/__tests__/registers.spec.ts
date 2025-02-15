// based on : https://gbdev.io/pandocs/CPU_Registers_and_Flags.html#the-flags-register-lower-8-bits-of-af-register

import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers.ts";

describe(Registers, () => {
    let registers: Registers;

    beforeEach(() => {
        registers = new Registers();
    });

    describe("8 bit registers", () => {
        it("should have an A register", () => {
            registers.A.value = 0x01;
            expect(registers.A.value)
                .to.be.a("number")
                .and.to.equal(0x01);
        });

        it("should have a B register", () => {
            registers.B.value = 0x01;
            expect(registers.B.value)
                .to.be.a("number")
                .and.to.equal(0x01);
        });

        it("should have a C register", () => {
            registers.C.value = 0x01;
            expect(registers.C.value)
                .to.be.a("number")
                .and.to.equal(0x01);
        });

        it("should have a D register", () => {
            registers.D.value = 0x01;
            expect(registers.D.value)
                .to.be.a("number")
                .and.to.equal(0x01);
        });

        it("should have an E register", () => {
            registers.E.value = 0x01;
            expect(registers.E.value)
                .to.be.a("number")
                .and.to.equal(0x01);
        });

        it("should have an H register", () => {
            registers.H.value = 0x01;
            expect(registers.H.value)
                .to.be.a("number")
                .and.to.equal(0x01);
        });

        it("should have an L register", () => {
            registers.L.value = 0x01;
            expect(registers.L.value)
                .to.be.a("number")
                .and.to.equal(0x01);
        });

        it("should have an F register", () => {
            registers.F.value = 0x01;
            expect(registers.F.value)
                .to.be.a("number")
                .and.to.equal(0x01);
        });
    });

    describe("16 bits registers", () => {
        it("should have an AF register with A as high and F as low", () => {
            registers.A.value = 0x01;
            registers.F.value = 0x02;
            expect(registers.AF.value)
                .to.be.a("number")
                .and.to.equal(0x0102);
        });

        it("should have a BC register with B as high and C as low", () => {
            registers.B.value = 0x01;
            registers.C.value = 0x02;
            expect(registers.BC.value)
                .to.be.a("number")
                .and.to.equal(0x0102);
        });

        it("should have a DE register with D as high and E as low", () => {
            registers.D.value = 0x01;
            registers.E.value = 0x02;
            expect(registers.DE.value)
                .to.be.a("number")
                .and.to.equal(0x0102);
        });

        it("should have a HL register with H as high and L as low", () => {
            registers.H.value = 0x01;
            registers.L.value = 0x02;
            expect(registers.HL.value)
                .to.be.a("number")
                .and.to.equal(0x0102);
        });

        it("should have a SP register", () => {
            registers.SP.value = 0x0102;
            expect(registers.SP.value)
                .to.be.a("number")
                .and.to.equal(0x0102);
        });

        it("should have a PC register", () => {
            registers.PC.value = 0x0102;
            expect(registers.PC.value)
                .to.be.a("number")
                .and.to.equal(0x0102);
        });

        // setters
        it('should set A as High and F as Low when setting AF', () => {
            registers.AF.value = 0x0102

            expect(registers.A.value).to.equal(0x01)
            expect(registers.F.value).to.equal(0x02)
        });

        it('should set B as High and C as Low when setting BC', () => {
            registers.BC.value = 0x0102

            expect(registers.B.value).to.equal(0x01)
            expect(registers.C.value).to.equal(0x02)
        });

        it('should set D as High and E as Low when setting DE', () => {
            registers.DE.value = 0x0102

            expect(registers.D.value).to.equal(0x01)
            expect(registers.E.value).to.equal(0x02)
        });

        it('should set H as High and L as Low when setting HL', () => {
            registers.HL.value = 0x0102

            expect(registers.H.value).to.equal(0x01)
            expect(registers.L.value).to.equal(0x02)
        });
    });

    describe("Flag registers", () => {
        it("should have a Zero Flag (Z)", () => {
            registers.F.zeroFlag = 1;
            expect(registers.F.zeroFlag)
                .to.be.a("number")
                .and.to.equal(1);
        });

        it("should have a Subtraction Flag (N)", () => {
            registers.F.subtractionFlag = 1;
            expect(registers.F.subtractionFlag)
                .to.be.a("number")
                .and.to.equal(1);
        });

        it("should have a Half Carry Flag (H)", () => {
            registers.F.halfCarryFlag = 1;
            expect(registers.F.halfCarryFlag)
                .to.be.a("number")
                .and.to.equal(1);
        });

        it("should have a Carry Flag (CY)", () => {
            registers.F.carryFlag = 1;
            expect(registers.F.carryFlag)
                .to.be.a("number")
                .and.to.equal(1);
        });
    })
});
