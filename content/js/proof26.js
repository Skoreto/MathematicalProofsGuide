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

var currentStep = 0;
// Promenne animace
var frame1Id;
var frame2Id;

function nextStep() {
    if (currentStep <= 6) {
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
            $('#btnNextStep').prop('disabled', true);
            step4();
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
            clearAllTimers();
            stepReset();
            step1();
            step2();
        }

        if (currentStep == 4) {
            $('#btnNextStep').prop('disabled', false);
            clearAllTimers();
            stepReset();
            step1();
            step2();
            step3();
        }

        currentStep--;
        $("#spCurrentStep").text(currentStep);
    }
}

function stepReset() {
    $("#proofBox").empty();
    $("#divSentenceBox").empty();
    $("#divNetworkDescription").empty();
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);
}

function step1() {
    // Vytvoreni grafu G
    nodes.add({ id: 1, x: 0, y: -120, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 2, x: -50, y: -50, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 3, x: -100, y: 20, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 4, x: 0, y: 20, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 5, x: -50, y: 90, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 6, x: 50, y: 90, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 7, x: 50, y: -50, color: { background: '#ffff08', border: '#000000' } });
    nodes.add({ id: 8, x: 100, y: 20, color: { background: '#ffff08', border: '#000000' } });

    edges.add({ id: 1, from: 1, to: 2 });
    edges.add({ id: 2, from: 2, to: 3 });
    edges.add({ id: 3, from: 2, to: 4 });
    edges.add({ id: 4, from: 4, to: 5 });
    edges.add({ id: 5, from: 4, to: 6 });
    edges.add({ id: 6, from: 1, to: 7 });
    edges.add({ id: 7, from: 7, to: 8 });

    // Priblizeni kamery
    var options = {
        position: { x: 0, y: -10 },
        scale: 1.4,
        offset: { x: 0, y: 0 },
        animation: {
            duration: 0,
            easingFunction: "easeInOutQuad"
        }
    };
    network.moveTo(options);

    $("#proofBox").append("<p>Pokud graf $G$ je strom <br/>$\\Rightarrow$ pak dle věty o stromech platí, že " +
        "pro každé dva vrcholy v grafu $G$ existuje jediná cesta.</p>");
    // $("#proofBox").append("<br/><p>$\\Rightarrow$ existuje právě jediná cesta mezi vrcholy $x$,$y$, kde " +
    //     "$\\{x,y\\}=e$ je libovolná hrana v $G$ a tou jedinou cestou mezi $x$,$y$ je hrana $e$</p>")
    // $("#proofBox").append("<br/><p>$\\Rightarrow$ v $G-e$ neexistuje $xy$ - cesta</p>");
    // $("#proofBox").append("<p>$\\Rightarrow$ vrcholy $x$,$y$ se v $G-e$ nacházejí v různých " +
    //     "komponentách souvisloti</p>");
    // $("#proofBox").append("<p>$\\Rightarrow$ $G-e$ není souvislý</p>");
    // $("#proofBox").append("<p>$\\Rightarrow$ Z definice stromu platí, že $G-e$ není strom.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divSentenceBox").append("<p>VĚTA O STROMECH (4.1) " +
        "<br/>Pro každý graf $G=(V,E)$ jsou následující podmínky ekvivalentní:</p>");
    $("#divSentenceBox").append("<p>I. graf $G$ je strom." +
        "<br/>II. Pro každé dva vrcholy $x,y \\in V$ existuje právě jedna cesta z vrcholu $x$ do vrcholu $y$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divSentenceBox"]);
    $('#divSentenceBox').prop('hidden', false);

    $("#divNetworkDescription").append("<p>Příklad grafu $G$, který je strom</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step2() {
    // Vyznaceni cesty u-v
    nodes.update({ id: 1, color: { background: '#B39DDB' } });
    nodes.update({ id: 2, color: { background: '#B39DDB' } });
    nodes.update({ id: 4, color: { background: '#B39DDB' } });
    nodes.update({ id: 6, label: 'v', color: { background: '#B39DDB' } });
    nodes.update({ id: 7, label: 'u', color: { background: '#B39DDB' } });

    edges.update({ id: 1, color: '#B39DDB', width: 2 });
    edges.update({ id: 3, color: '#B39DDB', width: 2 });
    edges.update({ id: 5, color: '#B39DDB', width: 2 });
    edges.update({ id: 6, color: '#B39DDB', width: 2 });

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Mezi libovolně zvolenými vrcholy $u$ a $v$ existuje jediná cesta.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step3() {
    nodes.update({ id: 2, label: 'x' });
    nodes.update({ id: 4, label: 'y' });
    edges.update({ id: 3, label: '          e', font: { align: 'top', size: 16 } });

    // Animace odebirane hrany e
    frame1Id = setTimeout(frame1, 1000);

    function frame1() {
        edges.update({ id: 3, color: '#F06292', width: 2, dashes: [7, 7] });
        frame2Id = setTimeout(frame2, 1000);
    }

    function frame2() {
        edges.update({ id: 3, color: '#B39DDB', width: 2, dashes: [] });
        frame2Id = setTimeout(frame1, 1000);
    }

    $("#proofBox").append("<br/><p>$\\Rightarrow$ Protože existuje právě jediná cesta mezi vrcholy $u,v$, " +
        "musí vždy vést přes libovolně zvolenou hranu $e=\\{x,y\\}$ z této cesty.</p>")
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $('#divSentenceBox').prop('hidden', true);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Cesta mezi vrcholy $u,v$, musí vždy vést přes libovolně zvolenou " +
        "hranu $e=\\{x,y\\}$ z této cesty.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

function step4() {
    clearAllTimers();
    // Animace odebrani hrany e
    frame1Id = setTimeout(frame1, 100);

    function frame1() {
        edges.update({ id: 3, color: '#FFFFFF', label: '' });
        frame2Id = setTimeout(frame2, 1500);
    }

    function frame2() {
        edges.update({ id: 3, label: '          e', color: '#F06292', width: 2, dashes: [7, 7] });
        frame2Id = setTimeout(frame1, 1500);
    }

    $("#proofBox").append("<br/><p>$\\Rightarrow$ v $G-e$ neexistuje cesta $u$-$v$" +
        "<br/>$\\Rightarrow$ vrcholy $u$,$v$ se v $G-e$ nacházejí v různých komponentách souvislosti" +
        "<br/>$\\Rightarrow$ $G-e$ není souvislý" +
        "<br/>$\\Rightarrow$ z definice stromu platí, že $G-e$ není strom</p>");
    $("#proofBox").append("<p class=\"text-center\">$\\dagger$ Tím je dokázáno stanovené tvrzení.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divSentenceBox").empty();
    $("#divSentenceBox").append("<p>DEFINICE STROMU (4.3) " +
        "<br/>Strom je <u>souvislý</u> graf, který neobsahuje kružnici.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divSentenceBox"]);
    $('#divSentenceBox').prop('hidden', false);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Odebráním hrany $e$ se vrcholy $u$ a $v$ ocitnou v různých komponentách " +
        "souvislosti.<br/> Graf $G-e$ není souvislý a není tedy ani stromem.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);
}

/**
 * Metoda pro zastaveni vsech casovacu spousteni framu animaci.
 * Zastavi veskere bezici animace.
 */
function clearAllTimers() {
    clearTimeout(frame1Id);
    clearTimeout(frame2Id);
}