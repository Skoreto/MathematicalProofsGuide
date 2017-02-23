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

var currentStep = 0;
// Promenne animace
var intervalId;
var frame1Id;
var frame2Id;

function nextStep() {
    if (currentStep <= 5) {
        if (currentStep == 0) {
            $('#btnPreviousStep').prop('disabled', false);
            $('#divProofContainer').prop('hidden', false);
            step1();
        }

        if (currentStep == 1) {
            step2();
        }

        if (currentStep == 2) {
            step3();
        }

        if (currentStep == 3) {
            step4();
        }

        if (currentStep == 4) {
            step5();
        }

        if (currentStep == 5) {
            $('#btnNextStep').prop('disabled', true);
            step6();
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
            stepReset();
            step1();
        }

        if (currentStep == 3) {
            stepReset();
            step1();
            step2();
        }

        if (currentStep == 4) {
            stepReset();
            step1();
            step2();
            step3();
        }

        if (currentStep == 5) {
            stepReset();
            step1();
            step2();
            step3();
            step4();
        }

        if (currentStep == 6) {
            $('#btnNextStep').prop('disabled', false);
            clearAllTimers();
            stepReset();
            step1();
            step2();
            step3();
            step4();
            step5();
        }

        currentStep--;
        $("#spCurrentStep").text(currentStep);
    }
}

function stepReset() {
    $("#proofBox").empty();
    $("#divNetworkDescription").empty();
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);
}

function step1() {
    // Vytvoreni grafu G
    nodes.add({ id: 1, x: -180, y: -40, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 2, x: -40, y: -100, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 3, x: -30, y: 50, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 4, x: 110, y: -50, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 5, x: 120, y: 80, color: { background: '#ffff08', border: '#000000' } });

    edges.add({ id: 1, from: 1, to: 2 });
    edges.add({ id: 2, from: 2, to: 3 });
    edges.add({ id: 3, from: 2, to: 4 });
    edges.add({ id: 4, from: 3, to: 5 });
    edges.add({ id: 5, from: 4, to: 5 });

    // Priblizeni kamery
    var options = {
        position: { x: 0, y: -10 },
        scale: 1.3,
        offset: { x: 0, y: 0 },
        animation: {
            duration: 0,
            easingFunction: "easeInOutQuad"
        }
    };
    network.moveTo(options);

    $("#proofBox").append("<p>Pokud $e=\\{x,y\\}$ není most v $G$, poté z definice mostu platí, že graf $G-e$ má " +
        "stejný počet komponent jako $G$ a platí:</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").append("<p>Sestrojení příkladu grafu $G$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step2() {
    // Zvoleni hrany E a vrcholu U a V
    nodes.update({ id: 1, label: 'u' });
    nodes.update({ id: 2, label: 'x' });
    nodes.update({ id: 4, label: 'y' });
    nodes.update({ id: 5, label: 'v' });
    edges.update({ id: 3, label: '                  e', font: { align: 'top', size: 18 } });

    $("#proofBox").append("<p>$\\forall u,v \\in V(G):$ Když existuje $u-v$ cesta $P$ v $G$, tak existuje " +
        "$u-v$ cesta $P'$ v $G-e$ (pozn.: $P'$ se nemusí nutně $=P$)</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Zvolení hrany $e$ a libovolných vrcholů $u$ a $v$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step3() {
    // Vyznaceni cesty P mezi U-V v G
    nodes.update({ id: 1, color: { background: '#B39DDB' } });
    nodes.update({ id: 2, color: { background: '#B39DDB' } });
    nodes.update({ id: 4, color: { background: '#B39DDB' } });
    nodes.update({ id: 5, color: { background: '#B39DDB' } });
    edges.update({ id: 1, color: '#B39DDB', width: 2 });
    edges.update({ id: 3, color: '#B39DDB', width: 2 });
    edges.update({ id: 5, color: '#B39DDB', width: 2 });

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Sestrojení cesty $P$ mezi $u-v$ v grafu $G$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step4() {
    // Vytvoreni grafu G-e
    nodes.add({ id: 6, x: 200, y: -40, label: 'u', color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 7, x: 340, y: -100, label: 'x', color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 8, x: 350, y: 50, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 9, x: 490, y: -50, label: 'y', color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 10, x: 500, y: 80, label: 'v', color: { background: '#ffff08', border: '#000000' } });

    edges.add({ id: 6, from: 6, to: 7 });
    edges.add({ id: 7, from: 7, to: 8 });
    edges.add({ id: 8, from: 7, to: 9, label: '                  e', font: { align: 'top', size: 18 },
        color: '#FF0000', dashes: [5, 5] });
    edges.add({ id: 9, from: 8, to: 10 });
    edges.add({ id: 10, from: 9, to: 10 });

    // Prizpusobeni kamery
    var options = {
        position: { x: 165, y: -10 },
        scale: 0.85,
        offset: { x: 0, y: 0 },
        animation: {
            duration: 1000,
            easingFunction: "easeInOutQuad"
        }
    };
    network.moveTo(options);

    // Vyznaceni cesty P mezi U-V v G-e
    nodes.update({ id: 6, color: { background: '#B39DDB' } });
    nodes.update({ id: 7, color: { background: '#B39DDB' } });
    nodes.update({ id: 8, color: { background: '#B39DDB' } });
    nodes.update({ id: 10, color: { background: '#B39DDB' } });
    edges.update({ id: 6, color: '#B39DDB', width: 2 });
    edges.update({ id: 7, color: '#B39DDB', width: 2 });
    edges.update({ id: 9, color: '#B39DDB', width: 2 });

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Když existuje $u-v$ cesta $P$ v $G$, tak existuje " +
        "$u-v$ cesta $P'$ v $G-e$ (pozn.: nemusí platit $P'=P$)</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step5() {
    resetGToDefault();
    // Vyznaceni cesty X-Y v grafu G
    nodes.update({ id: 2, label: 'x', color: { background: '#81C784' } });
    nodes.update({ id: 3, color: { background: '#81C784' } });
    nodes.update({ id: 4, label: 'y', color: { background: '#81C784' } });
    nodes.update({ id: 5, color: { background: '#81C784' } });
    edges.update({ id: 2, color: '#81C784', width: 2 });
    edges.update({ id: 3, label: '                  e', font: { align: 'top', size: 18 } });
    edges.update({ id: 4, color: '#81C784', width: 2 });
    edges.update({ id: 5, color: '#81C784', width: 2 });

    resetGeToDefault();
    nodes.update({ id: 7, label: 'x', color: { background: '#81C784' } });
    nodes.update({ id: 8, color: { background: '#81C784' } });
    nodes.update({ id: 9, label: 'y', color: { background: '#81C784' } });
    nodes.update({ id: 10, color: { background: '#81C784' } });
    edges.update({ id: 7, color: '#81C784', width: 2 });
    edges.update({ id: 8, label: '                  e', font: { align: 'top', size: 18 } });
    edges.update({ id: 9, color: '#81C784', width: 2 });
    edges.update({ id: 10, color: '#81C784', width: 2 });


    $("#proofBox").append("<br /><p>$\\implies \\exists$ $x-y$ cesta $P_{xy}$ v $G-e$</p>");
    $("#proofBox").append("<p>$\\implies x-y$ cesta $P_{xy}$ se nachází i v $G$ (protože $G$ vznikne z $G-e$ " +
        "přidáním hrany $e$)</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Protože existence cesty platí pro libovolná $u$ a $v$, " +
        "platí také, že $\\exists$ $x-y$ cesta $P_{xy}$ v $G$ i v $G-e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step6() {
    // Animace dokonceni kruznice na hrane e
    frame1Id = setTimeout(frame1, 1000);

    function frame1() {
        edges.update({ id: 3, color: '#81C784', width: 2 });
        frame2Id = setTimeout(frame2, 1500);
    }

    function frame2() {
        edges.update({ id: 3, color: '#000000', width: 1 });
        frame2Id = setTimeout(frame1, 1000);
    }

    // Priblizeni kamery
    var options = {
        position: { x: 0, y: -10 },
        scale: 1.4,
        offset: { x: 0, y: 0 },
        animation: {
            duration: 1500,
            easingFunction: "easeInOutQuad"
        }
    };
    network.moveTo(options);

    $("#proofBox").append("<br /><p>$\\implies$ Poté z definice kružnice platí, že $x-y$ cesta $P_{xy}$ spolu s hranou " +
        "$e=\\{x,y\\}$ tvoří kružnici v $G$ obsahující hranu $e$.</p>");
    $("#proofBox").append("<br /><p class=\"text-center\">$\\dagger$ Tím je dokázáno stanovené tvrzení.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Cesta $P_{xy}$ spolu s hranou $e=\\{x,y\\}$ tvoří kružnici " +
        "v $G$ obsahující hranu $e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

/**
 * Metoda pro reset grafu G do vychozi podoby.
 */
function resetGToDefault() {
    nodes.update({ id: 1, x: -180, y: -40, label: '', color: { background: '#ffff08', border: '#000000' } });
    nodes.update({ id: 2, x: -40, y: -100, label: '', color: { background: '#ffff08', border: '#000000' } });
    nodes.update({ id: 3, x: -30, y: 50, label: '', color: { background: '#ffff08', border: '#000000' } });
    nodes.update({ id: 4, x: 110, y: -50, label: '', color: { background: '#ffff08', border: '#000000' } });
    nodes.update({ id: 5, x: 120, y: 80, label: '', color: { background: '#ffff08', border: '#000000' } });

    edges.update({ id: 1, from: 1, to: 2, label: '', color: '#000000', width: 1 });
    edges.update({ id: 2, from: 2, to: 3, label: '', color: '#000000', width: 1 });
    edges.update({ id: 3, from: 2, to: 4, label: '', color: '#000000', width: 1 });
    edges.update({ id: 4, from: 3, to: 5, label: '', color: '#000000', width: 1 });
    edges.update({ id: 5, from: 4, to: 5, label: '', color: '#000000', width: 1 });
}

/**
 * Metoda pro reset grafu G-e do vychozi podoby.
 */
function resetGeToDefault() {
    nodes.update({ id: 6, x: 200, y: -40, label: '', color: { background: '#ffff08', border: '#000000' } });
    nodes.update({ id: 7, x: 340, y: -100, color: { background: '#ffff08', border: '#000000' } });
    nodes.update({ id: 8, x: 350, y: 50, color: { background: '#ffff08', border: '#000000' } });
    nodes.update({ id: 9, x: 490, y: -50, color: { background: '#ffff08', border: '#000000' } });
    nodes.update({ id: 10, x: 500, y: 80, label: '', color: { background: '#ffff08', border: '#000000' } });

    edges.update({ id: 6, from: 6, to: 7, color: '#000000', width: 1 });
    edges.update({ id: 7, from: 7, to: 8, color: '#000000', width: 1 });
    edges.update({ id: 8, from: 7, to: 9, color: '#FF0000', dashes: [5, 5] });
    edges.update({ id: 9, from: 8, to: 10, color: '#000000', width: 1 });
    edges.update({ id: 10, from: 9, to: 10, color: '#000000', width: 1 });
}

/**
 * Metoda pro zastaveni vsech casovacu spousteni framu animaci.
 * Zastavi veskere bezici animace.
 */
function clearAllTimers() {
    clearTimeout(frame1Id);
    clearTimeout(frame2Id);
}



