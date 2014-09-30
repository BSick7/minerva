module minerva.controls.border.render.tapins {
    export function calcShouldRender (input: IInput, state: IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean {
        state.shouldRender = false;
        if (!input.backgroundBrush && !input.borderBrush)
            return true;
        if (Rect.isEmpty(input.extents))
            return true;
        var fillOnly = !input.borderBrush || !input.borderThickness || Thickness.isEmpty(input.borderThickness);
        if (fillOnly && !input.backgroundBrush)
            return true;
        state.shouldRender = true;
        return true;
    }
}