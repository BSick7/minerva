/// <reference path="../../shape/hittest/ShapeHitTestPipeDef" />

module minerva.shapes.rectangle.hittest {
    export interface IHitTestData extends shape.hittest.IHitTestData {
        assets: IRectangleUpdaterAssets;
    }

    export class RectangleHitTestPipeDef extends shape.hittest.ShapeHitTestPipeDef {
        constructor () {
            super();
            this.replaceTapin('insideShape', tapins.insideShape);
        }
    }

    export module tapins {
        export function insideShape (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
            var assets = data.assets;
            ctx.save();
            ctx.pretransformMatrix(assets.stretchXform);
            helpers.draw(ctx.raw, 0, 0, assets.actualWidth, assets.actualHeight, assets.radiusX, assets.radiusY);
            var inside = (!!assets.fill && ctx.raw.isPointInPath(pos.x, pos.y))
                || (!!assets.stroke && ctx.isPointInStrokeEx(assets, pos.x, pos.y));
            ctx.restore();

            if (!inside) {
                hitList.shift();
                return false;
            }

            return true;
        }
    }
}