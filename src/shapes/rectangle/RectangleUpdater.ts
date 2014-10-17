/// <reference path="../shape/ShapeUpdater" />

module minerva.shapes.rectangle {
    export interface IRectangleUpdaterAssets extends shape.IShapeUpdaterAssets, measure.IInput {
        radiusX: number;
        radiusY: number;
    }

    export class RectangleUpdater extends shape.ShapeUpdater {
        assets: IRectangleUpdaterAssets;

        init () {
            this.setMeasurePipe(singleton(measure.RectangleMeasurePipeDef));

            var assets = this.assets;
            assets.radiusX = 0;
            assets.radiusY = 0;

            super.init();
        }
    }
}