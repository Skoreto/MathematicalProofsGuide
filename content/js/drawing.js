var isFixed = true;
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
        edgeDescription: 'Klikněte na vrchol a táhnutím hrany ji spojte s jiným vrcholem.',
        editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
        createEdgeError: 'Cannot link edges to a cluster.',
        deleteClusterError: 'Clusters cannot be deleted.',
        editClusterError: 'Clusters cannot be edited.'
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
            nodeData.shape = 'circle';
            nodeData.size = 50;
            nodeData.label = '';
            nodeData.color = '#FFFF00';
            nodeData.border = '#000000';
            nodeData.borderWidth = 5;
            callback(nodeData);
        },
        addEdge: true,
        editNode: true,
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        controlNodeStyle: {
            // shape:'dot',
            // size:6,
            // color: {
            //     background: '#00FF00',
            //     border: '#3c3c3c',
            //     highlight: {
            //         background: '#07f968',
            //         border: '#3c3c3c'
            //     }
            // },
            // borderWidth: 2,
            // borderWidthSelected: 2
        }
    },
    interaction: {
        dragNodes: true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: false,
            speed: { x: 10, y: 10, zoom: 0.02 },
            bindToWindow: true
        },
        multiselect: false,
        navigationButtons: true,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 0,
        zoomView: true
    }

};
var network = new vis.Network(container, data, options);

/**
 * Metoda pro smazani aktualne pouzivaneho grafu z pameti.
 */
function eraseGraph() {
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);
}