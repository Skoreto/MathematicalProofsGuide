var isPhysics = false;

var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);

// Vytvori network
var container = document.getElementById('mynetwork');
var data = { nodes: nodes, edges: edges };
var locales = {
    cs: {
        edit: 'Upravit',
        del: 'Smazat vybrané',
        back: 'Zpět',
        addNode: 'Přidat vrchol',
        addEdge: 'Přidat hranu',
        editNode: 'Upravit vrchol',
        editEdge: 'Upravit hranu',
        addDescription: 'Klikněte do prázdného prostoru pro umístění nového vrcholu.',
        edgeDescription: 'Táhnutím hrany od vybraného vrcholu ji spojte s jiným vrcholem.',
        editEdgeDescription: 'Přetáhněte konec hrany na vrchol, se kterým ji chcete spojit.',
        createEdgeError: 'Nelze připojit hrany ke clusteru.',
        deleteClusterError: 'Clustery nemohou být smazány.',
        editClusterError: 'Clustery nemohou být upraveny.'
    }
};

var options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'cs',
    locales: locales,
    clickToUse: false,
    physics: isPhysics,
    layout: {},
    "edges": {
        "smooth": {
            "type": "continuous",
            "forceDirection": "none",
            "roundness": 0
        }
    },
    configure: {
        enabled: false,
        filter: 'nodes,edges',
        container: undefined,
        showButton: true
    },
    manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: function(nodeData, callback) {
            // Nastaveni parametru noveho vrcholu
            var color = { background:'#FFFF00', border:'#000000' };
            var shadow = { enabled: false };
            nodeData.shape = 'dot';
            nodeData.size = 18;
            nodeData.label = null;
            nodeData.color = color;
            nodeData.borderWidth = 1;
            nodeData.shadow = shadow;
            callback(nodeData);
        },
        addEdge: function (data, callback) {
            data.color = '#000000';

            if (data.from == data.to) {
                var r = confirm("Opravdu chcete propojit vrchol se sebou samým?");
                if (r == true) {
                    callback(data);
                }
            }
            else {
                callback(data);
            }
        },
        editNode: function (nodeData, callback) {
            // Predvyplneni dialog upravy vrcholu aktualnimi daty
            document.getElementById('inpNodeLabel').value = nodeData.label;
            document.getElementById('inpColorBackground').value = nodeData.color.background;
            document.getElementById('inpNodeSize').value = nodeData.size;
            document.getElementById('btnSave').onclick = saveNode.bind(this, nodeData, callback);
            document.getElementById('btnCancel').onclick = cancelNodeEdit.bind(this, callback);
            document.getElementById('editNodeDialog').style.display = 'block';
        },
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        controlNodeStyle: {

        }
    },
    interaction: {
        dragNodes: true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: false,
        keyboard: {
            enabled: false,
            speed: { x: 10, y: 10, zoom: 0.02 },
            bindToWindow: true
        },
        multiselect: true,
        navigationButtons: true,
        selectable: true,
        selectConnectedEdges: false,
        tooltipDelay: 0,
        zoomView: true
    }
};
var network = new vis.Network(container, data, options);

/**
 * Metoda pro shovani dialogu pro upravu vrcholu.
 */
function clearNodeDialog() {
    document.getElementById('btnSave').onclick = null;
    document.getElementById('btnCancel').onclick = null;
    document.getElementById('editNodeDialog').style.display = 'none';
}

/**
 * Metoda pro zruseni uprav vrcholu.
 */
function cancelNodeEdit(callback) {
    clearNodeDialog();
    callback(null);
}

/**
 * Metoda pro ulozeni uprav vrcholu z dialogu.
 */
function saveNode(nodeData, callback) {
    var shadow = { enabled: false };
    nodeData.shadow = shadow;
    nodeData.label = document.getElementById('inpNodeLabel').value;
    nodeData.color.background = document.getElementById('inpColorBackground').value;
    // nodeData.size = document.getElementById('inpNodeSize').value;
    clearNodeDialog();
    callback(nodeData);
}

// network.on("initRedraw", function () {
//     // do something like move some custom elements?
// });
// network.on("beforeDrawing", function (ctx) {
//     ctx.strokeStyle = '#A6D5F7';
//     ctx.fillStyle = '#294475';
//     ctx.circle(100, 100,50);
//     ctx.fill();
//     ctx.stroke();
// });
// network.on("afterDrawing", function (ctx) {
//     ctx.strokeStyle = '#294475';
//     ctx.lineWidth = 4;
//     ctx.fillStyle = '#A6D5F7';
//     ctx.circle(20,20 ,20);
//     ctx.fill();
//     ctx.stroke();
//
//     ctx.font="20px Georgia";
//     ctx.fillText("Hello World! $G$",10,80);
// });

var isPenDrawActive = false;
$("#chbPenDraw").on("click", function () {
    if (!isPenDrawActive) {
        isPenDrawActive = true;

        var newOptions = {
            interaction: {
                dragNodes: true,
                dragView: false
            }
        };
        network.setOptions(newOptions);
    } else {
        isPenDrawActive = false;

        var newOptions = {
            interaction: {
                dragNodes: true,
                dragView: true
            }
        };
        network.setOptions(newOptions);
    }
});

network.on("click", function (params) {
    if (isPenDrawActive) {
        // {"nodes":[],"edges":[],"pointer":{"DOM":{"x": 364,"y": 305},"canvas":{"x": 1.3..,"y": 1.1..}},"event":"..."}
        var paramsObject = JSON.parse(JSON.stringify(params, null, 4));
        var x = paramsObject.pointer.canvas.x;
        var y = paramsObject.pointer.canvas.y;

        network.on("afterDrawing", function (context) {
            context.fillStyle = '#294475';
            context.lineJoin = "round";
            context.lineWidth = 5;
            context.circle(x ,y ,1);
            context.fill();
        });
    }
});
