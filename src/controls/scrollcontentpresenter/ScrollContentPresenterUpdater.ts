module minerva.controls.scrollcontentpresenter {
    export interface IScrollContentPresenterUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput {

    }

    export class ScrollContentPresenterUpdaterTree extends contentpresenter.ContentPresenterUpdaterTree {
    }

    export class ScrollContentPresenterUpdater extends core.Updater {
        assets: IScrollContentPresenterUpdaterAssets;
        tree: contentpresenter.ContentPresenterUpdaterTree;

        init () {
            this.setTree(new ScrollContentPresenterUpdaterTree())
                .setMeasurePipe(singleton(measure.ScrollContentPresenterMeasurePipeDef))
                .setArrangePipe(singleton(arrange.ScrollContentPresenterArrangePipeDef));

            var assets = this.assets;
            assets.scrollData = {
                canHorizontallyScroll: false,
                canVerticallyScroll: false,
                offsetX: 0,
                offsetY: 0,
                cachedOffsetX: 0,
                cachedOffsetY: 0,
                viewportWidth: 0,
                viewportHeight: 0,
                extentWidth: 0,
                extentHeight: 0,
                maxDesiredWidth: 0,
                maxDesiredHeight: 0
            };

            super.init();
        }
    }
}