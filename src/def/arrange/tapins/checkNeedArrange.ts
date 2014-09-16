module minerva.def.arrange.tapins {
    export var checkNeedArrange: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        if ((input.dirtyFlags & layout.DirtyFlags.Arrange) > 0)
            return true;
        if (!Rect.isEqual(output.layoutSlot, state.finalRect))
            return true;
        return false;
    };
}