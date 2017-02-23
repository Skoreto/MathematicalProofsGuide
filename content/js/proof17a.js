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
    physics: false,
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

// Promenne animaci
var intervalId;
var frame1Id;
var frame2Id;
var frame3Id;
var frame4Id;
var frame5Id;
var frame6Id;
var frame7Id;
var frame8Id;
var frame9Id;
var frame10Id;
var frame11Id;
var frame12Id;

function nextStep() {
    if (currentStep <= 3) {
        if (currentStep == 0) {
            $('#btnPreviousStep').prop('disabled', false);
            $('#divProofContainer').prop('hidden', false);
            step1();
        }

        if (currentStep == 1) {
            step2();
        }

        if (currentStep == 2) {
            $('#btnNextStep').prop('disabled', true);
            step3();
        }

        currentStep++;
        $("#spCurrentStep").text(currentStep);
    }
}

function previousStep() {
    if (currentStep > 0) {
        if (currentStep == 1) {
            $('#btnPreviousStep').prop('disabled', true);
            $('#divProofContainer').prop('hidden', true);
            stepReset();
        }

        if (currentStep == 2) {
            clearAllTimers();
            stepReset();
            step1();
        }

        if (currentStep == 3) {
            $('#btnNextStep').prop('disabled', false);
            clearAllTimers();
            stepReset();
            step1();
            step2();
        }

        currentStep--;
        $("#spCurrentStep").text(currentStep);
    }
}

function stepReset() {
    $("#proofBox").empty();
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);
}

function step1() {
    // Vytvoreni vychoziho grafu
    nodes.add({ id: 1, label: 'u', x: -200, y: 0, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 2, label: 'w', x: 0, y: 0, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 3, label: 'v', x: 200, y: 0, color: { background: '#ffff08', border: '#000000' } });

    edges.add({ id: 1, from: 1, to: 2, label: '                     e1', font: { align: 'bottom' }});
    edges.add({ id: 2, from: 2, to: 3, label: '                     e2', font: { align: 'bottom' }});

    $("#proofBox").empty();
    $("#proofBox").append("<p class=\"text-red\"><b>Tvrzení:<b></p>");
    $("#proofBox").append("<p>Když v grafu $G$ existují dva různé $u$-$v$ sledy, tak $G$ obsahuje kružnici.</p>");
    $("#proofBox").append("<p class=\"text-blue\">Neplatí, protože existuje kontrapříklad.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").append("<p>Příklad grafu $G$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step2() {
    clearAllTimers();
    framesA1();
    // Opakovane spusti framesA1() kazdych 7 sekund
    intervalId = setInterval(framesA1, 7000);

    function framesA1() {
        // Spusti frame1() jednorazove po uplynuti sekundy
        frame1Id = setTimeout(frame1, 1000);

        function frame1() {
            nodes.update({ id: 1, color: { background: '#9575CD' } });
            frame2Id = setTimeout(frame2, 1000);
        }

        function frame2() {
            edges.update({ id: 1, color: '#9575CD', width: 2, arrows: 'to' });
            frame3Id = setTimeout(frame3, 1000);
        }

        function frame3() {
            nodes.update({ id: 2, color: { background: '#9575CD' } });
            edges.update({ id: 1, arrows: '' });
            frame4Id = setTimeout(frame4, 1000);
        }

        function frame4() {
            edges.update({ id: 2, color: '#9575CD', width: 2, arrows: 'to' });
            frame5Id = setTimeout(frame5, 1000);
        }

        function frame5() {
            nodes.update({ id: 3, color: { background: '#9575CD' } });
            edges.update({ id: 2, arrows: '' });
            frame6Id = setTimeout(frame6, 2000);
        }

        function frame6() {
            updateToDefaultGraph()
        }
    }

    $("#proofBox").append("<br /><p>Existují dva různé $u$-$v$ sledy:</p>");
    $("#proofBox").append("<p id=\"pCurrent\">$S_1 = (u,e_1,w,e_2,v)$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Konstrukce sledu $S_1 = (u,e_1,w,e_2,v)$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step3() {
    clearAllTimers();
    updateToDefaultGraph();
    framesA2();
    // Opakovane spusti framesA2() kazdych 13 sekund
    intervalId = setInterval(framesA2, 13000);

    function framesA2() {
        // Spusti frame1() jednorazove po uplynuti sekundy
        frame1Id = setTimeout(frame1, 1000);

        function frame1() {
            nodes.update({ id: 1, color: { background: '#D1C4E9' } });
            frame2Id = setTimeout(frame2, 1000);
        }

        function frame2() {
            edges.update({ id: 1, color: '#D1C4E9', width: 2, arrows: 'to' });
            frame3Id = setTimeout(frame3, 1000);
        }

        function frame3() {
            nodes.update({ id: 2, color: { background: '#D1C4E9' } });
            edges.update({ id: 1, arrows: '' });
            frame4Id = setTimeout(frame4, 1000);
        }

        // Znovu obarvit prostredni uzel W tmaveji
        function frame4() {
            nodes.update({ id: 2, color: { background: '#B39DDB' } });
            frame5Id = setTimeout(frame5, 1000);
        }

        function frame5() {
            edges.update({ id: 1, color: '#B39DDB', width: 2, arrows: 'from' });
            frame6Id = setTimeout(frame6, 1000);
        }

        function frame6() {
            nodes.update({ id: 1, color: { background: '#B39DDB' } });
            edges.update({ id: 1, arrows: '' });
            frame7Id = setTimeout(frame7, 1000);
        }

        // Znovu obarvit uzel U tmaveji
        function frame7() {
            nodes.update({ id: 1, color: { background: '#9575CD' } });
            frame8Id = setTimeout(frame8, 1000);
        }

        function frame8() {
            edges.update({ id: 1, color: '#9575CD', width: 2, arrows: 'to' });
            frame9Id = setTimeout(frame9, 1000);
        }

        function frame9() {
            nodes.update({ id: 2, color: { background: '#9575CD' } });
            edges.update({ id: 1, arrows: '' });
            frame10Id = setTimeout(frame10, 1000);
        }

        function frame10() {
            edges.update({ id: 2, color: '#9575CD', width: 2, arrows: 'to' });
            frame11Id = setTimeout(frame11, 1000);
        }

        function frame11() {
            nodes.update({ id: 3, color: { background: '#9575CD' } });
            edges.update({ id: 2, arrows: '' });
            frame12Id = setTimeout(frame12, 2000);
        }

        function frame12() {
            updateToDefaultGraph()
        }
    }

    $("#pCurrent").append(" a $S_2 = (u,e_1,w,e_1,u,e_1,w,e_2,v)$");
    $("#proofBox").append("<p>a přitom graf $G$ neobsahuje kružnici.</p>");
    $("#proofBox").append("<br /><p class=\"text-center\">$\\dagger$ Tím je vyvráceno stanovené tvrzení.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Konstrukce sledu $S_2 = (u,e_1,w,e_1,u,e_1,w,e_2,v)$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

/**
 * Metoda pro update grafu do vychoziho stavu.
 */
function updateToDefaultGraph() {
    nodes.update({ id: 1, color: { background: '#ffff08' } });
    edges.update({ id: 1, color: '#000000', width: 1, arrows: '' });
    nodes.update({ id: 2, color: { background: '#ffff08' } });
    edges.update({ id: 2, color: '#000000', width: 1, arrows: '' });
    nodes.update({ id: 3, color: { background: '#ffff08' } });
}

/**
 * Metoda pro zastaveni vsech casovacu spousteni framu animaci.
 * Zastavi veskere bezici animace.
 */
function clearAllTimers() {
    clearInterval(intervalId);
    clearTimeout(frame1Id);
    clearTimeout(frame2Id);
    clearTimeout(frame3Id);
    clearTimeout(frame4Id);
    clearTimeout(frame5Id);
    clearTimeout(frame6Id);
    clearTimeout(frame7Id);
    clearTimeout(frame8Id);
    clearTimeout(frame9Id);
    clearTimeout(frame10Id);
    clearTimeout(frame11Id);
    clearTimeout(frame12Id);
}