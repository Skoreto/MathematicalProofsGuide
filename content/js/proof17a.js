var isFixed = true;

var nodes = new vis.DataSet([
]);

// create an array with edges
var edges = new vis.DataSet([
]);

// create a network
var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};
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
    physics: true,
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
        initiallyActive: false,
        addNode: true,
        addEdge: true,
        editNode: true,
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        controlNodeStyle:{

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

var currentStep = 0;
// var proofBox = document.getElementById("proofBox");

var containerContext = container.getContext("2d");
containerContext.font = "20px Georgia";
containerContext.fillText("Konstrukce grafu G-e", 10, 50);


var continueFrames;
var frame1Id;
var frame2Id;
var frame3Id;
var frame4Id;
var frame5Id;
var frame6Id;
var interval1Id;

function nextStep() {

    if (currentStep == 2) {
        currentStep++;
        $("#spCurrentStep").text(currentStep);

        continueFrames = false;
        clearInterval(interval1Id);
        clearTimeout(frame1Id);
        clearTimeout(frame2Id);
        clearTimeout(frame3Id);
        clearTimeout(frame4Id);
        clearTimeout(frame5Id);
        clearTimeout(frame6Id);

        nodes.update({ id: 1, color: { background: '#ffff08' } });
        edges.update({ id: 1, color: '#000000', width: 2, arrows: '' });
        nodes.update({ id: 2, color: { background: '#ffff08' } });
        edges.update({ id: 2, color: '#000000', width: 2, arrows: '' });
        nodes.update({ id: 3, color: { background: '#ffff08' } });

        $("#pCurrent").append(" a $S_2 = (u,e_1,w,e_1,u,e_1,w,e_2,v)$");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }

    if (currentStep == 1) {
        currentStep++;
        $("#spCurrentStep").text(currentStep);

        continueFrames = true;
        frames();

        // Spusti runFramesAgain() kazdych 7 sekund
        interval1Id = setInterval(runFramesAgain, 6000);
        function runFramesAgain() {
            if (continueFrames)
                frames()
        }

        function frames() {
            // Spusti frame1() jednorazove po uplynuti sekundy
            frame1Id = setTimeout(frame1, 1000);

            function frame1() {
                nodes.update({ id: 1, color: { background: '#FF22FF' } });
                frame2Id = setTimeout(frame2, 1000);
            }

            function frame2() {
                edges.update({ id: 1, color: '#FF22FF', width: 2, arrows: 'to' });
                frame3Id = setTimeout(frame3, 1000);
            }

            function frame3() {
                nodes.update({ id: 2, color: { background: '#FF22FF' } });
                frame4Id = setTimeout(frame4, 1000);
            }

            function frame4() {
                edges.update({ id: 2, color: '#FF22FF', width: 2, arrows: 'to' });
                frame5Id = setTimeout(frame5, 1000);
            }

            function frame5() {
                nodes.update({ id: 3, color: { background: '#FF22FF' } });
                frame6Id = setTimeout(frame6, 1000);
            }

            function frame6() {
                nodes.update({ id: 1, color: { background: '#ffff08' } });
                edges.update({ id: 1, color: '#000000', width: 2, arrows: '' });
                nodes.update({ id: 2, color: { background: '#ffff08' } });
                edges.update({ id: 2, color: '#000000', width: 2, arrows: '' });
                nodes.update({ id: 3, color: { background: '#ffff08' } });
            }
        }


        $("#proofBox").append("<br /><p>Existují dva různé $u$-$v$ sledy:</p>");
        $("#proofBox").append("<p id=\"pCurrent\">$S_1 = (u,e_1,w,e_2,v)$</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }

    if (currentStep == 0) {
        currentStep++;
        $("#spCurrentStep").text(currentStep);
        $('#btnPreviousStep').prop('disabled', false);

        nodes.add({ id: 1, label: 'u', x: -200, y: 0, fixed: isFixed,
            color: { background: '#ffff08', border: '#000000' } });
        nodes.add({ id: 2, label: 'w', x: 0, y: 0, fixed: isFixed,
            color: { background: '#ffff08', border: '#000000' } });
        nodes.add({ id: 3, label: 'v', x: 200, y: 0, fixed: isFixed,
            color: { background: '#ffff08', border: '#000000' } });

        edges.add({ id: 1, from: 1, to: 2, label: '           e1', font: { align: 'bottom' }});
        edges.add({ id: 2, from: 2, to: 3, label: '           e2', font: { align: 'bottom' }});

        $("#proofBox").empty();
        $("#proofBox").append("<p class=\"text-red\"><b>Tvrzení:<b></p>");
        $("#proofBox").append("<p>Když v grafu $G$ existují dva různé $u$-$v$ sledy, tak $G$ obsahuje kružnici.</p>");
        $("#proofBox").append("<p class=\"text-blue\">Neplatí, protože existuje kontrapříklad.</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }

}

function previousStep() {

    if (currentStep == 1) {
        currentStep--;
        $('#btnPreviousStep').prop('disabled', true);
    }

}
