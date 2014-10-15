module minerva.controls.textblock.tests {
    QUnit.module("TextBlock Updater Tests");

    var mock = {
        textUpdater: function (): text.TextUpdater {
            return new text.TextUpdater();
        },
        run: function (text: string, start: number, assets: text.ITextAssets): minerva.text.layout.Run {
            var run = new minerva.text.layout.Run();
            run.text = text;
            run.start = start;
            run.width = mock.measure(text, assets.font, true);
            run.length = text.length;
            return run;
        },
        measure: function (text: string, font: Font, full?: boolean): number {
            if (full === true)
                return engine.Surface.measureWidth(text, font);
            var width = 0;
            for (var i = 0; i < text.length; i++) {
                width += engine.Surface.measureWidth(text[i], font);
            }
            return width;
        }
    };

    QUnit.test("NoWrap", (assert) => {
        var updater = new TextBlockUpdater();
        updater.assets.textWrapping = TextWrapping.NoWrap;
        updater.assets.maxWidth = 99;
        var run = mock.textUpdater();
        updater.tree.onTextAttached(run);
        var docassets = updater.tree.doc.assets;

        run.assets.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur nunc lobortis varius dignissim. Sed sed sem non orci laoreet tempus. Nullam a nisi consequat, dignissim diam volutpat, blandit augue. Praesent et nulla nec ante consectetur varius et condimentum leo. Nam ornare odio neque, ut lobortis purus volutpat eu. In hac habitasse platea dictumst. Etiam accumsan bibendum vehicula.";
        updater.invalidateTextMetrics();
        updater.tree.layout(new Size(99, Number.POSITIVE_INFINITY), updater.assets);
        assert.strictEqual(docassets.lines.length, 1);
        assert.strictEqual(docassets.lines[0].runs.length, 1);
        assert.strictEqual(docassets.lines[0].runs[0].text, "Lorem ipsum do");
        assert.strictEqual(docassets.actualWidth, mock.measure("Lorem ipsum do", run.assets.font));
        assert.strictEqual(docassets.actualHeight, 19);

        run.assets.text = "Lorem";
        updater.invalidateTextMetrics();
        updater.tree.layout(new Size(99, Number.POSITIVE_INFINITY), updater.assets);
        assert.strictEqual(docassets.lines.length, 1);
        assert.strictEqual(docassets.lines[0].runs.length, 1);
        assert.strictEqual(docassets.lines[0].runs[0].text, "Lorem");
        assert.strictEqual(docassets.actualWidth, mock.measure("Lorem", run.assets.font));
        assert.strictEqual(docassets.actualHeight, 19);
    });

    QUnit.test("Wrap", (assert) => {
        var updater = new TextBlockUpdater();
        updater.assets.textWrapping = TextWrapping.Wrap;
        updater.assets.maxWidth = 99;
        var run = mock.textUpdater();
        updater.tree.onTextAttached(run);
        var docassets = updater.tree.doc.assets;

        run.assets.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur nunc lobortis varius dignissim. Sed sed sem non orci laoreet tempus. Nullam a nisi consequat, dignissim diam volutpat, blandit augue.";
        updater.invalidateTextMetrics();
        updater.tree.layout(new Size(99, Number.POSITIVE_INFINITY), updater.assets);
        assert.strictEqual(docassets.lines.length, 16);
        docassets.lines.forEach(line => assert.strictEqual(line.width, line.runs.reduce<number>((agg, run) => agg + run.width, 0), "Line Width === Run Widths"));
        var runs = docassets.lines.reduce<minerva.text.layout.Run[]>((agg, line) => agg.concat(line.runs), []);
        runs.forEach(run => delete run.attrs);
        var expectedRuns = [
            mock.run("Lorem ipsum ", 0, run.assets),
            mock.run("dolor sit amet, ", 0, run.assets),
            mock.run("consectetur ", 0, run.assets),
            mock.run("adipiscing elit. ", 0, run.assets),
            mock.run("Mauris efficitur ", 0, run.assets),
            mock.run("nunc lobortis ", 0, run.assets),
            mock.run("varius ", 0, run.assets),
            mock.run("dignissim. Sed ", 0, run.assets),
            mock.run("sed sem non ", 0, run.assets),
            mock.run("orci laoreet ", 0, run.assets),
            mock.run("tempus. ", 0, run.assets),
            mock.run("Nullam a nisi ", 0, run.assets),
            mock.run("consequat, ", 0, run.assets),
            mock.run("dignissim diam ", 0, run.assets),
            mock.run("volutpat, ", 0, run.assets),
            mock.run("blandit augue.", 0, run.assets)
        ];
        runs.forEach((run, i?) => assert.deepEqual(run, expectedRuns[i]));
    });
}