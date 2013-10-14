iD.NotesLayer = function(context, dispatch) {
    var projection = context.projection,
        dimensions = [1, 1],
        notes = [],
        enable = true,
        svg;

    context.history()
        .on('change.notes', redraw);

    function render(selection) {

        svg = selection.selectAll('svg')
            .data([render]);

        svg.enter()
            .append('svg');

        svg.style('display', enable ? 'block' : 'none');

        var circles = svg
            .selectAll('circle')
            .data(notes);

        circles
            .enter()
            .append('notes')
            .attr('class', 'gpx');

        circles
            .attr('transform', iD.svg.PointTransform(projection));
    }

    function redraw() {
        context.connection().loadNotes(projection, dimensions);
    }

    render.projection = function(_) {
        if (!arguments.length) return projection;
        projection = _;
        return render;
    };

    render.enable = function(_) {
        if (!arguments.length) return enable;
        enable = _;
        return render;
    };

    render.geojson = function(_) {
        if (!arguments.length) return gj;
        gj = _;
        return render;
    };

    render.dimensions = function(_) {
        if (!arguments.length) return svg.dimensions();
        svg.dimensions(_);
        return render;
    };

    render.id = 'layer-notes';

    return render;
};