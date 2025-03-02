import { Memory, Memory8Value } from '@/memory.ts'

export const TILE_DATA_BYTE_SIZE = 16

export class TileData extends Memory8Value {}

export class TileDataTable {
    private readonly memory: Memory
    private readonly tiles: TileData[]

    constructor(memory: Memory) {
        this.memory = memory
        this.tiles = this.readTiles()
        console.log(this.tiles)
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
}

export class Graphics {
    private readonly memory: Memory
    private readonly tileDataTable: TileDataTable

    constructor(memory: Memory) {
        this.memory = memory
        this.tileDataTable = new TileDataTable(memory)
        console.log(this.memory, this.tileDataTable)
    }
}
