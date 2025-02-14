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
      registers.A = 0x01;
      expect(registers.A)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have a B register", () => {
      registers.B = 0x01;
      expect(registers.B)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have a C register", () => {
      registers.C = 0x01;
      expect(registers.C)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have a D register", () => {
      registers.D = 0x01;
      expect(registers.D)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have an E register", () => {
      registers.E = 0x01;
      expect(registers.E)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have an H register", () => {
      registers.H = 0x01;
      expect(registers.H)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have an L register", () => {
      registers.L = 0x01;
      expect(registers.L)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have an F register", () => {
      registers.F = 0x01;
      expect(registers.F)
          .to.be.a("number")
          .and.to.equal(0x01);
    });
  });

  describe("16 bits registers", () => {
    it("should have an AF register with A as high and F as low", () => {
      registers.A = 0x01;
      registers.F = 0x02;
      expect(registers.AF)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a BC register with B as high and C as low", () => {
      registers.B = 0x01;
      registers.C = 0x02;
      expect(registers.BC)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a DE register with D as high and E as low", () => {
      registers.D = 0x01;
      registers.E = 0x02;
      expect(registers.DE)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a HL register with H as high and L as low", () => {
      registers.H = 0x01;
      registers.L = 0x02;
      expect(registers.HL)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a SP register", () => {
      registers.SP = 0x0102;
      expect(registers.SP)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a PC register", () => {
      registers.PC = 0x0102;
      expect(registers.PC)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });
    
    // setters
    it('should set A as High and F as Low when setting AF', () => {
      registers.AF = 0x0102

      expect(registers.A).to.equal(0x01)
      expect(registers.F).to.equal(0x02)
    });

    it('should set B as High and C as Low when setting BC', () => {
      registers.BC = 0x0102

      expect(registers.B).to.equal(0x01)
      expect(registers.C).to.equal(0x02)
    });

    it('should set D as High and E as Low when setting DE', () => {
      registers.DE = 0x0102

      expect(registers.D).to.equal(0x01)
      expect(registers.E).to.equal(0x02)
    });

    it('should set H as High and L as Low when setting HL', () => {
      registers.HL = 0x0102

      expect(registers.H).to.equal(0x01)
      expect(registers.L).to.equal(0x02)
    });
  });

  describe("Flag registers", () => {
    it("should have a Zero Flag", () => {
      registers.zeroFlag = 1;
      expect(registers.zeroFlag)
          .to.be.a("number")
          .and.to.equal(1);
    });

    it("should have a Subtraction Flag", () => {
      registers.subtractionFlag = 1;
      expect(registers.subtractionFlag)
          .to.be.a("number")
          .and.to.equal(1);
    });

    it("should have a Half Carry Flag", () => {
      registers.halfCarryFlag = 1;
      expect(registers.halfCarryFlag)
          .to.be.a("number")
          .and.to.equal(1);
    });

    it("should have a Carry Flag", () => {
      registers.carryFlag = 1;
      expect(registers.carryFlag)
          .to.be.a("number")
          .and.to.equal(1);
    });
  })

});
