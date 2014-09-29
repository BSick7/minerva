module minerva.controls.border.render.tapins.shim {
    export function createPattern (input: IInput, state: IShimState, output: layout.render.IOutput, ctx: layout.render.RenderContext, region: Rect, tree: layout.IUpdaterTree): boolean {
        if (!state.shouldRender || Thickness.isBalanced(input.borderThickness))
            return true;

        if (!state.pattern) {
            state.pattern = createBorderPattern(input.borderBrush, input.extents, state.fillExtents, state.outerCornerRadius, state.innerCornerRadius);
        }

        return true;
    }

    var tempCtx: layout.render.RenderContext;

    function createBorderPattern (borderBrush: IBrush, extents: Rect, fillExtents: Rect, oa: ICornerRadius, ia: ICornerRadius): CanvasPattern {
        tempCtx = tempCtx || new layout.render.RenderContext(document.createElement('canvas').getContext('2d'));
        var raw = tempCtx.raw;
        Size.copyTo(extents, raw.canvas);
        raw.beginPath();
        tempCtx.drawRectEx(extents, oa);
        tempCtx.fillEx(borderBrush, extents);
        raw.globalCompositeOperation = "xor";
        raw.beginPath();
        tempCtx.drawRectEx(fillExtents, ia);
        raw.fill();
        return raw.createPattern(raw.canvas, "no-repeat");
    }
}