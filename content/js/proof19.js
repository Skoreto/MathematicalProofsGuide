var isFixed = true;

var nodes = new vis.DataSet([
    { id: 1, label: '', x: -200, y: -100, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 2, label: '', x: -200, y: -30, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 3, label: '', x: -130, y: -65, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 4, label: '', x: -130, y: 30, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 5, label: '', x: -60, y: 70, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 6, label: '', x: -55, y: -115, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 7, label: '', x: -55, y: -30, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 8, label: '', x: 30, y: -115, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 9, label: '', x: 25, y: -35, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 10, label: '', x: 20, y: 65, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 11, label: '', x: 100, y: -55, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 12, label: '', x: 90, y: 25, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 13, label: '', x: 140, y: -145, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 14, label: '', x: 210, y: -65, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } },
    { id: 15, label: '', x: 180, y: 0, fixed: isFixed, color: { background: '#ffff08', border: '#000000' } }
]);

// create an array with edges
var edges = new vis.DataSet([
    { id: 1, from: 1, to: 3 },
    { id: 2, from: 2, to: 3 },
    { id: 3, from: 2, to: 4 },
    { id: 4, from: 3, to: 4 },
    { id: 5, from: 3, to: 6 },
    { id: 6, from: 4, to: 5 },
    { id: 7, from: 5, to: 10 },
    { id: 8, from: 6, to: 7 },
    { id: 9, from: 6, to: 8 },
    { id: 10, from: 7, to: 10 },
    { id: 11, from: 8, to: 9 },
    { id: 12, from: 8, to: 11 },
    { id: 13, from: 8, to: 13 },
    { id: 14, from: 10, to: 12 },
    { id: 15, from: 11, to: 12 },
    { id: 16, from: 11, to: 14 },
    { id: 17, from: 12, to: 15 },
    { id: 18, from: 13, to: 14 },
    { id: 19, from: 13, to: 15 },
    { id: 20, from: 14, to: 15 }
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
}

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

function nextStep() {
    if (currentStep == 12) {
        $('#btnNextStep').prop('disabled', true);

        $("#proofBox").empty();
        $("#proofBox").append("<p class=\"text-center\">$\\forall u,v \\in V(G)$: jestliže $\\exists$ <span class=\"text-red\">$Pu,v$</span> obsauje $e$ v $G \\rightarrow$<br/>" +
            "$\\rightarrow \\exists$ cesta <span class=\"text-red\">$P'u,v$</span> v $G-e$<br/>" +
            "$\\downarrow$ <br/>počet komponent $G$ = počet komponent $G-e$<br/>" +
            "$\\downarrow$ <br/>$e$ není most v $G$<br/><br/>" +
            "Dostáváme spor s původním tvrzením.</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }
    if (currentStep == 11) {
        currentStep++;

        $("#proofBox").empty();
        $("#proofBox").append("<p>2. $Pu,v$ <span class=\"text-red\">obsahující</span> hranu $e$ v $G$</p>");
        $("#proofBox").append("<p><span class=\"text-blue\"><b>Platí tvrzení</b></span><br/>" +
            "V grafu $G$ existuje cesta z vrcholu $v$ do vrcholu $w$ právě tehdy, když v grafu $G$ existuje sled z vrcholu $v$ do vrcholu $w$.</p>");
        $("#proofBox").append("<p class=\"text-center\">$\\forall u,v \\in V(G)$: jestliže $\\exists$ <span class=\"text-red\">$Pu,v$</span> obsauje $e$ v $G \\rightarrow$<br/>" +
            "$\\rightarrow \\exists$ sled <span class=\"text-red\">$Su,v$</span> v $G-e \\rightarrow$<br/>" +
            "$\\rightarrow \\exists$ cesta <span class=\"text-red\">$P'u,v$</span> v $G-e$</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }
    if (currentStep == 10) {
        currentStep++;

        nodes.update({ id: 3, label: '4' });
        nodes.update({ id: 4, label: '5', color: { background: '#04A304' } });
        nodes.update({ id: 5, label: '6', color: { background: '#04A304' } });
        nodes.update({ id: 6, label: '3' });
        nodes.update({ id: 8, label: '2' });
        nodes.update({ id: 11, label: '1' });

        edges.update({ id: 4, from: 3, to: 4, color: '#82b0ff', width: 2 });
        edges.update({ id: 5, from: 3, to: 6, color: '#82b0ff', width: 2 });
        edges.update({ id: 9, from: 6, to: 8, color: '#82b0ff', width: 2 });
        edges.update({ id: 12, from: 8, to: 11, color: '#82b0ff', width: 2 });
        edges.update({ id: 14, hidden: true });
        edges.update({ id: 15, from: 11, to: 12, color: '#82b0ff', width: 2 });
        edges.add({ id: 21, from: 4, to: 5, color: '#82b0ff', width: 2, smooth: { enabled: true, roundness: 0.5 } });
        edges.add({ id: 22, from: 5, to: 10, color: '#82b0ff', width: 2, smooth: { enabled: true, roundness: 0.5 } });

        $("#proofBox").append("<p class=\"text-center\"><span class=\"text-red\">$S$</span> $= \\{v, x, 1, 2, 3, 4,$<span class=\"text-red\">$5, 6$</span>$, y,$<span class=\"text-red\">$6, 5$</span>$, u\\}$</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }
    if (currentStep == 9) {
        currentStep++;

        nodes.update({ id: 1, label: '', color: { background: '#ffff08' } });
        nodes.update({ id: 3, color: { background: '#04A304' } });
        nodes.update({ id: 6, color: { background: '#04A304' } });
        nodes.update({ id: 8, color: { background: '#04A304' } });
        nodes.update({ id: 11, color: { background: '#04A304' } });
        nodes.update({ id: 14, label: '', color: { background: '#ffff08' } });

        edges.update({ id: 1, from: 1, to: 3, color: '#000000', width: 1 });
        edges.update({ id: 5, from: 3, to: 6, color: '#04A304', width: 2 });
        edges.update({ id: 9, from: 6, to: 8, color: '#04A304', width: 2 });
        edges.update({ id: 12, from: 8, to: 11, color: '#04A304', width: 2 });
        edges.update({ id: 16, from: 11, to: 14, color: '#000000', width: 1 });
        edges.update({ id: 14, color: '#FF3636', width: 2, label: '           e', font: { align: 'bottom' }, title: "odebíraná hrana e", hidden: false });

        nodes.update({ id: 2, label: 'U', color: { background: '#82b0ff' } });
        nodes.update({ id: 4, color: { background: '#82b0ff' } });
        nodes.update({ id: 5, color: { background: '#82b0ff' } });
        nodes.update({ id: 15, label: 'V', color: { background: '#82b0ff' } });

        edges.update({ id: 3, from: 2, to: 4, color: '#82b0ff', width: 2 });
        edges.update({ id: 6, from: 4, to: 5, color: '#82b0ff', width: 2 });
        edges.update({ id: 7, from: 5, to: 10, color: '#82b0ff', width: 2 });
        edges.update({ id: 14, color: '#82b0ff', width: 2, hidden: false });
        edges.update({ id: 17, from: 12, to: 15, color: '#82b0ff', width: 2 });

        $("#proofBox").empty();
        $("#proofBox").append("<p>2. $Pu,v$ <span class=\"text-red\">obsahující</span> hranu $e$ v $G$</p>");
        $("#proofBox").append("<p class=\"text-center\">$\\forall u,v\\in V(G)$: jestliže $\\exists$<span class=\"text-red\">$Pu,v$</span> obsahuje $e$ v $G \\rightarrow \\exists$ sled <span class=\"text-red\">$S'u,v$</span> v $G-e$</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }
    if (currentStep == 8) {
        currentStep++;
        edges.update({ id: 14, hidden: true });
    }
    if (currentStep == 7) {
        currentStep++;

        nodes.update({ id: 1, label: 'U', color: { background: '#82b0ff' } });
        nodes.update({ id: 3, color: { background: '#82b0ff' } });
        nodes.update({ id: 6, color: { background: '#82b0ff' } });
        nodes.update({ id: 8, color: { background: '#82b0ff' } });
        nodes.update({ id: 11, color: { background: '#82b0ff' } });
        nodes.update({ id: 14, label: 'V', color: { background: '#82b0ff' } });

        edges.update({ id: 1, from: 1, to: 3, color: '#82b0ff', width: 2 });
        edges.update({ id: 5, from: 3, to: 6, color: '#82b0ff', width: 2 });
        edges.update({ id: 9, from: 6, to: 8, color: '#82b0ff', width: 2 });
        edges.update({ id: 12, from: 8, to: 11, color: '#82b0ff', width: 2 });
        edges.update({ id: 16, from: 11, to: 14, color: '#82b0ff', width: 2 });
        edges.update({ id: 14, color: '#FF3636', width: 2, label: '           e', font: { align: 'bottom' }, title: "odebíraná hrana e", hidden: false });

        $("#proofBox").empty();
        $("#proofBox").append("<p>1. $Pu,v$ <span class=\"text-red\">neobsahující</span> hranu $e$ v $G$</p>");
        $("#proofBox").append("<p class=\"text-center\">$\\forall u,v\\in V(G)$: jestliže $\\exists$<span class=\"text-red\">$Pu,v$</span> neobsahuje $e$ v $G \\rightarrow \\exists$<span class=\"text-red\">$P'u,v$</span> v $G-e$</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }
    if (currentStep == 6) {
        currentStep++;
        $("#proofBox").append("<p class=\"text-center\">$\\downarrow$ <br/>$\\forall u,v\\in V(G)$: jestliže $\\exists Pu,v$ v $G \\leftarrow \\exists$<span class=\"text-red\">$P'u,v$</span> v $G-e$</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }
    if (currentStep == 5) {
        currentStep++;
        $("#switch1").empty();
        $("#switch1").append("<span class=\"text-red\"><b>=</b></span>");
    }
    if (currentStep == 4) {
        currentStep++;
        $("#proofBox").append("<p class=\"text-center\">počet komponent $G$ <span id=\"switch1\" class=\"text-red text-center\"><b>?</b></span> počet komponent $G-e$</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }
    if (currentStep == 3) {
        currentStep++;
        var options = {
            position: { x: 0, y: 0 },
            scale: 1.0,
            offset: { x: 0, y: 0 },
            animation: {
                duration: 1000,
                easingFunction: "easeInOutQuad"
            }
        };
        network.moveTo(options);
        edges.update({ id: 14, hidden: true });
    }

    if (currentStep == 2) {
        currentStep++;
        edges.update({ id: 14, color: '#0000FF', dashes: [5, 5] });
    }

    if (currentStep == 1) {
        currentStep++;
        var options = {
            position: { x: 55, y: 30 },
            scale: 1.4,
            offset: { x: 0, y: 0 },
            animation: {
                duration: 1000,
                easingFunction: "easeInOutQuad"
            }
        };
        network.moveTo(options);

        nodes.update({ id: 10, label: 'Y', color: { background: '#FF3636' } });
        nodes.update({ id: 12, label: 'X', color: { background: '#FF3636' } });
        edges.update({ id: 14, from: 10, to: 12, color: '#FF3636', width: 2, label: '           e', font: { align: 'bottom' }, title: "Hranu, která tvoří most, odebereme" });

        $("#proofBox").empty();
        $("#proofBox").append("<p ><span class=\"text-blue\"><b>Definice mostu</b></span><br/>" +
            "Hranu $e$ nazveme <span class=\"text-red\">mostem</span>, jestliže graf $G - e$ má více komponent než graf $G$.<br/>" +
            "Pokusíme se tudíž o konstrukci grafu $G-e$.</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    }

    if (currentStep == 0) {
        currentStep++;
        $('#btnPreviousStep').prop('disabled', false);

        nodes.update({ id: 3, color: { background: '#04A304' } });
        nodes.update({ id: 4, color: { background: '#04A304' } });
        nodes.update({ id: 5, color: { background: '#04A304' } });
        nodes.update({ id: 6, color: { background: '#04A304' } });
        nodes.update({ id: 8, color: { background: '#04A304' } });
        nodes.update({ id: 11, color: { background: '#04A304' } });
        nodes.update({ id: 10, color: { background: '#04A304' } });
        nodes.update({ id: 12, color: { background: '#04A304' } });

        edges.update({ id: 4, from: 3, to: 4, color: '04A304', width: 2 });
        edges.update({ id: 5, from: 3, to: 6, color: '04A304', width: 2 });
        edges.update({ id: 6, from: 4, to: 5, color: '04A304', width: 2 });
        edges.update({ id: 7, from: 5, to: 10, color: '04A304', width: 2 });
        edges.update({ id: 9, from: 6, to: 8, color: '04A304', width: 2 });
        edges.update({ id: 12, from: 8, to: 11, color: '04A304', width: 2 });
        edges.update({ id: 14, from: 10, to: 12, color: '04A304', width: 2 });
        edges.update({ id: 15, from: 11, to: 12, color: '04A304', width: 2 });

        $("#proofBox").empty();
        $("#proofBox").append("<p class=\"text-red\"><b>Negace tvrzení<b></p>");
        $("#proofBox").append("<p>Negaci implikace stanovíme jako $\\neg(\\forall (A \\rightarrow B)) \\longrightarrow (\\exists A \\wedge \\neg B)$</p>");
        $("#proofBox").append("<p>Slovní interpretací $\\exists G$: <span class=\"text-red\">$e$ je most v $G$</span> <span class=\"text-blue\">a zároveň</span> v $G$ <span class=\"text-green\"><u>existuje</u> kružnice</span> obsahující hranu $e$.</p>");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
        // proofBox.scrollTop = proofBox.scrollHeight;
    }

    //if (currentStep == 0) {
    //    currentStep++;
    //    $('#btnPreviousStep').prop('disabled', false);

    //    $("#proofBox").empty();
    //    $("#proofBox").append("<p class=\"text-red\">Tvrzení</p>");
    //    $("#proofBox").append("$\\forall G = (V, E)$: <span class=\"text-blue\">Jestliže</span> $e$ je most v $G$, " +
    //        "<span class=\"text-blue\">pak</span> v $G$ neexistuje kružnice obsahující hranu $e$.");
    //     $("#proofBox").append("<p>Implikaci stanovíme ve tvaru $\\forall A \\rightarrow B$</p>");
    //    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
    //}

}

function previousStep() {

    if (currentStep == 1) {
        currentStep--;
        $('#btnPreviousStep').prop('disabled', true);

        var options = {
            position: { x: 0, y: 0 },
            scale: 1.0,
            offset: { x: 0, y: 0 },
            animation: {
                duration: 1000,
                easingFunction: "easeInOutQuad"
            }
        };

        network.moveTo(options);
    }

}
