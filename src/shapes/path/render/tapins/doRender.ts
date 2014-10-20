module minerva.shapes.path.render.tapins {
    export function doRender (input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        var nb = input.naturalBounds;
        ctx.translate(-nb.x, -nb.y);
        input.data.Draw(ctx);
        return true;
    }
}