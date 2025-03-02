import { Memory, Memory8Value } from '@/memory.ts'
import {
    Bit,
    bitwiseOr,
    getNthBit,
    shiftLeftBy,
} from '@mawsfr/binary-operations'
import { IntRange } from '@/utils.ts'

export const TILE_DATA_BYTE_SIZE = 16
export const TILE_DATA_WIDTH = 8
export const COLOR_DEPTH = 2

export type ColorId = IntRange<0, 4>
export type TileDataLine = Array<ColorId>

export class TileData extends Memory8Value<Bit> {
    public readonly lines: Array<TileDataLine> = []
    public readonly height: number

    constructor(
        memory: Memory,
        address: number,
        options?: {
            height?: number
        }
    ) {
        super(memory, address)
        this.height = options?.height ?? TILE_DATA_BYTE_SIZE
        this.lines = this.readBytes()
    }

    readBytes() {
        const tempLines = []

        for (
            let i = this.address;
            i < this.address + this.height;
            i += COLOR_DEPTH
        ) {
            const byte1 = this.memory.addresses[i]
            const byte2 = this.memory.addresses[i + 1]

            const line: TileDataLine = []

            for (let bitIndex = 0; bitIndex < TILE_DATA_WIDTH; bitIndex++) {
                const bit1 = getNthBit(byte1, bitIndex, { endianness: 'big' })
                const bit2 = getNthBit(byte2, bitIndex, { endianness: 'big' })

                const colorId = bitwiseOr(shiftLeftBy(1)(bit2), bit1) as ColorId

                line.push(colorId)
            }

            tempLines.push(line)
        }

        return tempLines
    }
}

export interface Renderable {
    render(tileRenderer: TileRenderer): void
}

export class TileDataTable implements Renderable {
    private readonly graphics: Graphics
    private readonly memory: Memory
    public readonly tiles: TileData[]

    constructor(graphics: Graphics, memory: Memory) {
        this.graphics = graphics
        this.memory = memory
        this.tiles = this.readTiles()
    }

    readTiles() {
        const tiles: TileData[] = []

        for (
            let address = 0x8000;
            address <= 0x97FF;
            address += TILE_DATA_BYTE_SIZE
        ) {
            tiles.push(new TileData(this.memory, address))
        }

        return tiles
    }

    render(tileRenderer: TileRenderer) {
        for (const [index, tile] of this.tiles.entries()) {
            const position = {
                x: (index % 16) * TILE_DATA_WIDTH,
                y: Math.floor(index / 16) * TILE_DATA_WIDTH,
            }

            tileRenderer.drawTile(tile, position, this.graphics.palettes.BGP)
        }
    }
}

export type Red = IntRange<0, 256>
export type Green = IntRange<0, 256>
export type Blue = IntRange<0, 256>
export type Alpha = IntRange<0, 2>
export type Color = [Red, Green, Blue, Alpha]

export type Palette = Record<ColorId, Color>
export type PaletteId = 'BGP'

export class Graphics implements Renderable {
    private readonly memory: Memory
    public readonly tileDataTable: TileDataTable
    public readonly palettes: Record<PaletteId, Palette> = {
        BGP: {
            '0': [255, 255, 255, 1],
            '1': [192, 192, 192, 1],
            '2': [96, 96, 96, 1],
            '3': [0, 0, 0, 1],
        },
    } as const

    constructor(memory: Memory) {
        this.memory = memory
        this.tileDataTable = new TileDataTable(this, this.memory)
    }

    render() {
        throw new Error('Method not implemented.')
    }
}

export type Position = {
    x: number
    y: number
}

export interface TileRenderer {
    render(): void

    drawTile(tile: TileData, position: Position, palette: Palette): void
}
