module minerva.layout.draft.tapins {
    export var prepareMeasure: IDraftTapin = function (data: IDraftPipeData): boolean {
        if (data.flag !== UIFlags.MeasureHint)
            return true;

        var last = data.assets.previousConstraint;
        if (data.assets.isContainer && (!last || (!Size.isEqual(last, data.surfaceSize)))) {
            data.assets.dirtyFlags |= DirtyFlags.Measure;
            Size.copyTo(data.surfaceSize, data.assets.previousConstraint);
        }

        for (var walker = Updater.walkDeep(data.updater); walker.step();) {
            var assets = walker.current.assets;
            if (assets.visibility !== Visibility.Visible) {
                walker.skipBranch();
                continue;
            }
            if ((assets.uiFlags & UIFlags.MeasureHint) === 0) {
                walker.skipBranch();
                continue;
            }

            assets.uiFlags &= ~UIFlags.MeasureHint;
            if ((assets.dirtyFlags & DirtyFlags.Measure) > 0)
                data.measureList.push(walker.current);
        }

        return true;
    };
}