// based on : https://gbdev.io/pandocs/CPU_Registers_and_Flags.html#the-flags-register-lower-8-bits-of-af-register

import { beforeEach, describe, expect, it } from "vitest";
import { Registers } from "@/registers";

describe(Registers, () => {
  let registers: Registers;

  beforeEach(() => {
    registers = new Registers();
  });

  describe("8 bit registers", () => {
    it("should have an A register", () => {
      registers.setA(0x01);
      expect(registers.aSlot)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have a B register", () => {
      registers.setB(0x01);
      expect(registers.bSlot)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have a C register", () => {
      registers.setC(0x01);
      expect(registers.cSlot)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have a D register", () => {
      registers.setD(0x01);
      expect(registers.dSlot)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have an E register", () => {
      registers.setE(0x01);
      expect(registers.eSlot)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have an H register", () => {
      registers.setH(0x01);
      expect(registers.hSlot)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have an L register", () => {
      registers.setL(0x01);
      expect(registers.lSlot)
          .to.be.a("number")
          .and.to.equal(0x01);
    });

    it("should have an F register", () => {
      registers.setF(0x01);
      expect(registers.fSlot)
          .to.be.a("number")
          .and.to.equal(0x01);
    });
  });

  describe("16 bits registers", () => {
    it("should have an AF register with A as high and F as low", () => {
      registers.setA(0x01);
      registers.setF(0x02);
      expect(registers.afSlot)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a BC register with B as high and C as low", () => {
      registers.setB(0x01);
      registers.setC(0x02);
      expect(registers.bcSlot)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a DE register with D as high and E as low", () => {
      registers.setD(0x01);
      registers.setE(0x02);
      expect(registers.deSlot)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a HL register with H as high and L as low", () => {
      registers.setH(0x01);
      registers.setL(0x02);
      expect(registers.hlSlot)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a SP register", () => {
      registers.setSP(0x0102);
      expect(registers.spSlot)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });

    it("should have a PC register", () => {
      registers.setPC(0x0102);
      expect(registers.pcSlot)
          .to.be.a("number")
          .and.to.equal(0x0102);
    });
  });
});
