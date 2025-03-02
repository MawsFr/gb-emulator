import {
    type Palette,
    type Position,
    type Renderable,
    TileData,
    type TileRenderer,
} from '@mawsfr/gb-emulator'

export class TileRendererImpl implements TileRenderer {
    private readonly ctx: CanvasRenderingContext2D
    private readonly renderable: Renderable

    constructor(ctx: CanvasRenderingContext2D, renderable: Renderable) {
        this.ctx = ctx
        this.renderable = renderable
    }

    render() {
        this.renderable.render(this)
    }

    drawTile(tile: TileData, position: Position, palette: Palette): void {
        for (const [lIndex, line] of tile.lines.entries()) {
            for (const [pIndex, pixel] of line.entries()) {
                this.ctx.beginPath()
                this.ctx.fillStyle = `rgba(${palette[pixel][0]},${palette[pixel][1]},${palette[pixel][2]}, ${palette[pixel][3]})`
                this.ctx.fillRect(
                    position.x + pIndex,
                    position.y + lIndex,
                    1,
                    1
                )
                // this.ctx.fillText(
                //     `${  lIndex  }-${  pIndex}`,
                //     position.x,
                //     position.y
                // )
            }
        }
    }
}
