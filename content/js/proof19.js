var isFixed = true;

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
// Promenne animace
var frame0Id;
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
var frame13Id;
var frame14Id;
var frame15Id;
var frame16Id;
var frame17Id;
var frame18Id;
var frame19Id;
var frame20Id;
var frame21Id;
var frame22Id;
var frame23Id;

function nextStep() {
    if (currentStep <= 8) {
        if (currentStep == 0) {
            $('#btnPreviousStep').prop('disabled', false);
            $('#divProofContainer').prop('hidden', false);
            step1();
        }

        if (currentStep == 1)
            step2();

        if (currentStep == 2)
            step3();

        if (currentStep == 3)
            step4();

        if (currentStep == 4)
            step5();

        if (currentStep == 5)
            step6();

        if (currentStep == 6)
            step7();

        if (currentStep == 7)
            step8();

        if (currentStep == 8) {
            $('#btnNextStep').prop('disabled', true);
            step9();
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
            clearAllTimers();
            stepReset();
            step1();
            step2();
            step3();
            step4();
            step5();
        }

        if (currentStep == 7) {
            stepReset();
            step1();
            step2();
            step3();
            step4();
            step5();
            step6();
        }

        if (currentStep == 8) {
            stepReset();
            step1();
            step2();
            step3();
            step4();
            step5();
            step6();
            step7();
        }

        if (currentStep == 9) {
            clearAllTimers();
            $('#btnNextStep').prop('disabled', false);
            stepReset();
            step1();
            step2();
            step3();
            step4();
            step5();
            step6();
            step7();
            step8();
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
    $("#proofBox").append("<p class=\"text-brown\"><b>Matematický zápis tvrzení</b></p>");
    $("#proofBox").append("<p>$\\forall G = (V, E)$: <span class=\"text-blue\">Jestliže</span> $e$ je most v $G$, " +
       "<span class=\"text-blue\">pak</span> v $G$ neexistuje kružnice obsahující hranu $e$.</p>");
    $("#proofBox").append("<p>Implikaci stanovíme ve tvaru $\\forall A \\Rightarrow B$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
}

function step2() {
    $("#proofBox").append("<br/><p class=\"text-brown\"><b>Negace tvrzení<b></p>");
    $("#proofBox").append("<p>Negaci implikace stanovíme jako " +
        "$\\neg(\\forall (A \\rightarrow B)) \\longrightarrow (\\exists A \\wedge \\neg B)$</p>");
    $("#proofBox").append("<p>Slovní interpretací $\\exists G$: <span class=\"text-red\">$e$ je most v $G$ </span>" +
        "<span class=\"text-blue\">a zároveň</span> v $G$ <span class=\"text-green\"><u>existuje</u> kružnice</span> " +
        "obsahující hranu $e$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divSentenceBox").empty();
    $("#divSentenceBox").append("<p>DEFINICE MOSTU " +
        "<br/>Hranu $e$ nazveme <u>mostem</u>, jestliže graf $G-e$ má více komponent než graf $G$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divSentenceBox"]);
    $('#divSentenceBox').prop('hidden', false);

    $("#divNetworkDescription").append("<p>Příklad grafu $G$, který obsahuje kružnici " +
        "<span class=\"text-green\">$C$</span></p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Konstrukce grafu G
    nodes.add({ id: 1, x: -200, y: -100, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 2, x: -200, y: -30, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 3, x: -130, y: -65, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 4, x: -130, y: 30, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 5, x: -60, y: 70, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 6, x: -55, y: -115, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 7, x: -55, y: -30, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 8, x: 30, y: -115, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 9, x: 25, y: -35, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 10, x: 20, y: 65, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 11, x: 100, y: -55, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 12, x: 90, y: 25, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 13, x: 140, y: -145, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 14, x: 210, y: -65, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 15, x: 180, y: 0, fixed: isFixed, color: { background: '#FFFF00', border: '#000000' } });

    edges.add({ id: 1, from: 1, to: 3 });
    edges.add({ id: 2, from: 2, to: 3 });
    edges.add({ id: 3, from: 2, to: 4 });
    edges.add({ id: 4, from: 3, to: 4 });
    edges.add({ id: 5, from: 3, to: 6 });
    edges.add({ id: 6, from: 4, to: 5 });
    edges.add({ id: 7, from: 5, to: 10 });
    edges.add({ id: 8, from: 6, to: 7 });
    edges.add({ id: 9, from: 6, to: 8 });
    edges.add({ id: 10, from: 7, to: 10 });
    edges.add({ id: 11, from: 8, to: 9 });
    edges.add({ id: 12, from: 8, to: 11 });
    edges.add({ id: 13, from: 8, to: 13 });
    edges.add({ id: 14, from: 10, to: 12 });
    edges.add({ id: 15, from: 11, to: 12 });
    edges.add({ id: 16, from: 11, to: 14 });
    edges.add({ id: 17, from: 12, to: 15 });
    edges.add({ id: 18, from: 13, to: 14 });
    edges.add({ id: 19, from: 13, to: 15 });
    edges.add({ id: 20, from: 14, to: 15 });

    // Vyznaceni kruznice C
    nodes.update({ id: 3, color: { background: '#66BB6A' } });
    nodes.update({ id: 4, color: { background: '#66BB6A' } });
    nodes.update({ id: 5, color: { background: '#66BB6A' } });
    nodes.update({ id: 6, color: { background: '#66BB6A' } });
    nodes.update({ id: 8, color: { background: '#66BB6A' } });
    nodes.update({ id: 11, color: { background: '#66BB6A' } });
    nodes.update({ id: 10, color: { background: '#66BB6A' } });
    nodes.update({ id: 12, color: { background: '#66BB6A' } });

    edges.update({ id: 4, color: '66BB6A', width: 2 });
    edges.update({ id: 5, color: '66BB6A', width: 2 });
    edges.update({ id: 6, color: '66BB6A', width: 2 });
    edges.update({ id: 7, color: '66BB6A', width: 2 });
    edges.update({ id: 9, color: '66BB6A', width: 2 });
    edges.update({ id: 12, color: '66BB6A', width: 2 });
    edges.update({ id: 14, color: '66BB6A', width: 2 });
    edges.update({ id: 15, color: '66BB6A', width: 2 });

    // Priblizeni kamery
    var options = {
        position: { x: 0, y: -30 },
        scale: 1.3,
        offset: { x: 0, y: 0 },
        animation: {
            duration: 0,
            easingFunction: "easeInOutQuad"
        }
    };
    network.moveTo(options);
}

function step3() {
    $("#proofBox").append("<br/><p>Pokud v $G$ existuje kružnice $C$ obsahující hranu $e=\\{x,y\\}$" +
        "<br/>$\\Rightarrow$ pak v $G$ existují minimálně 2 $x$-$y$ cesty:</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $('#divSentenceBox').prop('hidden', true);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Volba libovolné hrany $e=\\{x,y\\}$ ležící na kružnici " +
        "<span class=\"text-green\">$C$</span></p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Vyznaceni hrany e={x,y}
    nodes.update({ id: 10, label: 'y' });
    nodes.update({ id: 12, label: 'x' });
    edges.update({ id: 14, label: '           e', font: { align: 'bottom' } });
}

function step4() {
    $("#proofBox").append("<p id=\"pCurrent\">1. $P_{xy}=e=\\{x,y\\}$ (samotná hrana $e$)</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Cesta $x$-$y$ přímo přes hranu $e=\\{x,y\\}$");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Zruseni vyznaceni zbytku kruznice C
    nodes.update({ id: 3, color: { background: '#FFFF00' } });
    nodes.update({ id: 4, color: { background: '#FFFF00' } });
    nodes.update({ id: 5, color: { background: '#FFFF00' } });
    nodes.update({ id: 6, color: { background: '#FFFF00' } });
    nodes.update({ id: 8, color: { background: '#FFFF00' } });
    nodes.update({ id: 11, color: { background: '#FFFF00' } });

    edges.update({ id: 4, color: '000000', width: 1 });
    edges.update({ id: 5, color: '000000', width: 1 });
    edges.update({ id: 6, color: '000000', width: 1 });
    edges.update({ id: 7, color: '000000', width: 1 });
    edges.update({ id: 9, color: '000000', width: 1 });
    edges.update({ id: 12, color: '000000', width: 1 });
    edges.update({ id: 15, color: '000000', width: 1 });

    // Vyznaceni hrany e={x,y}
    nodes.update({ id: 10, color: { background: '#9575CD' } });
    nodes.update({ id: 12, color: { background: '#9575CD' } });
    edges.update({ id: 14, color: '#9575CD', width: 2 });
}

function step5() {
    $("#pCurrent").append("<br/>2. $P'_{xy}=C-e=(x,v_1,v_2,...,v_s,y)$ (kružnice bez hrany $e$)");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Cesta $x$-$y$ po kružnici bez hrany $e=\\{x,y\\}$");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Vyznaceni cesty x-y pres kruznici
    nodes.update({ id: 3, color: { background: '#9575CD' } });
    nodes.update({ id: 4, color: { background: '#9575CD' } });
    nodes.update({ id: 5, color: { background: '#9575CD' } });
    nodes.update({ id: 6, color: { background: '#9575CD' } });
    nodes.update({ id: 8, color: { background: '#9575CD' } });
    nodes.update({ id: 11, color: { background: '#9575CD' } });

    edges.update({ id: 4, color: '#9575CD', width: 2 });
    edges.update({ id: 5, color: '#9575CD', width: 2 });
    edges.update({ id: 6, color: '#9575CD', width: 2 });
    edges.update({ id: 7, color: '#9575CD', width: 2 });
    edges.update({ id: 9, color: '#9575CD', width: 2 });
    edges.update({ id: 12, color: '#9575CD', width: 2 });
    edges.update({ id: 14, color: '#000000', width: 1 });
    edges.update({ id: 15, color: '#9575CD', width: 2 });
}

function step6() {
    $("#proofBox").append("<br/><p>Nyní ukážeme pro $\\forall u,v \\in V(G)$: jestliže $\\exists$ $uv$ - cesta " +
        "$P_{uv}$ v $G$ " +
        "<br/>$\\Rightarrow$ $\\exists$ $uv$ - cesta $P'_{uv}$ v $G-e$:</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Nyní v grafu $G-e$ zvolíme libovolné vrcholy $u$ a $v$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    resetGraphG();
    // Vyznaceni vrcholu u a v
    nodes.update({ id: 1, label: 'u' });
    nodes.update({ id: 14, label: 'v' });

    // Vyznaceni hrany e={x,y}
    nodes.update({ id: 10, label: 'y' });
    nodes.update({ id: 12, label: 'x' });

    clearAllTimers();
    // Animace odebirani hrany e
    frame0();
    function frame0() {
        edges.update({ id: 14, label: '           e', font: { align: 'bottom' }, dashes: [7, 7],
            title: "odebíraná hrana e", hidden: false });
        frame1Id = setTimeout(frame1, 2000);
    }

    function frame1() {
        edges.update({ id: 14, hidden: true });
        frame0Id = setTimeout(frame0, 2000);
    }
}

function step7() {
    $("#proofBox").append("<li>pokud v $G$ $uv$-cesta neobsahuje hranu $e$, pak $P'_{uv}=P_{uv}$</li>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Cesta $uv$ neobsahující hranu $e$ bude shodná v grafu $G-e$ jako v $G$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Vyznaceni cesty u-v bez hrany e
    nodes.update({ id: 1, color: { background: '#B388FF' } });
    nodes.update({ id: 3, color: { background: '#B388FF' } });
    nodes.update({ id: 6, color: { background: '#B388FF' } });
    nodes.update({ id: 8, color: { background: '#B388FF' } });
    nodes.update({ id: 11, color: { background: '#B388FF' } });
    nodes.update({ id: 14, color: { background: '#B388FF' } });

    edges.update({ id: 1, color: '#B388FF', width: 2 });
    edges.update({ id: 5, color: '#B388FF', width: 2 });
    edges.update({ id: 9, color: '#B388FF', width: 2 });
    edges.update({ id: 12, color: '#B388FF', width: 2 });
    edges.update({ id: 16, color: '#B388FF', width: 2 });

    clearAllTimers();
    // Animace odebirani hrany e
    frame0();
    function frame0() {
        edges.update({ id: 14, label: '           e', font: { align: 'bottom' }, dashes: [],
            title: "odebíraná hrana e", hidden: false });
        frame1Id = setTimeout(frame1, 1000);
    }

    function frame1() {
        edges.update({ id: 14, dashes: [7, 7] });
        frame2Id = setTimeout(frame2, 1000);
    }

    function frame2() {
        edges.update({ id: 14, hidden: true });
        frame0Id = setTimeout(frame0, 1000);
    }
}

function step8() {
    $("#proofBox").append("<li>pokud v $G$ $uv$-cesta obsahuje hranu $e$, pak hranu $e$ v $P'_{uv}$ " +
        "nahradíme $P'_{xy}$ ($x$-$y$ cestou po kružnici $C$), tím vznikne $uv$-sled v $G-e$:" +
        "<br/><p class=\"text-center\">$(P_{uv}-e) \\cup P'_{xy} = (P_{uv}-e) \\cup(C-e)$<p/>" +
        "$\\Rightarrow$ proto existuje i $uv$-cesta v $G-e$</li>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>V grafu $G$ lze cestu $uv$ vést přes hranu $e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    clearAllTimers();
    resetGraphG();
    // Vyznaceni cesty u-v v grafu G obsahujici hranu e
    nodes.update({ id: 2, label: 'u', color: { background: '#B388FF' } });
    nodes.update({ id: 4, color: { background: '#B388FF' } });
    nodes.update({ id: 5, color: { background: '#B388FF' } });
    nodes.update({ id: 10, label: 'y', color: { background: '#B388FF' } });
    nodes.update({ id: 12, label: 'x', color: { background: '#B388FF' } });
    nodes.update({ id: 15, label: 'v', color: { background: '#B388FF' } });

    edges.update({ id: 3, color: '#B388FF', width: 2 });
    edges.update({ id: 6, color: '#B388FF', width: 2 });
    edges.update({ id: 7, color: '#B388FF', width: 2 });
    edges.update({ id: 14, color: '#B388FF', width: 2,
        label: '           e', font: { align: 'bottom' }, dashes: [], hidden: false });
    edges.update({ id: 17, color: '#B388FF', width: 2 });

    // Vyznacit zbytek kruznice C
    // nodes.update({ id: 3, color: { background: '#04A304' } });
    // nodes.update({ id: 6, color: { background: '#04A304' } });
    // nodes.update({ id: 8, color: { background: '#04A304' } });
    // nodes.update({ id: 11, color: { background: '#04A304' } });
    //
    // edges.update({ id: 5, from: 3, to: 6, color: '#04A304', width: 2 });
    // edges.update({ id: 9, from: 6, to: 8, color: '#04A304', width: 2 });
    // edges.update({ id: 12, from: 8, to: 11, color: '#04A304', width: 2 });
}

function step9() {
    $("#proofBox").append("<br/><p>$\\Rightarrow$ Počet komponent $G-e$ je stejný jako počet komponent $G$." +
        "<br/>$\\Rightarrow$ Poté z definice mostu vyplývá, že $e$ není most, což je spor s předpokladem.</p>");
    $("#proofBox").append("<p class=\"text-center\">$\\dagger$ Proto platí původní tvrzení.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divSentenceBox").empty();
    $("#divSentenceBox").append("<p>DEFINICE MOSTU " +
        "<br/>Hranu $e$ nazveme <u>mostem</u>, jestliže graf $G-e$ má více komponent než graf $G$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divSentenceBox"]);
    $('#divSentenceBox').prop('hidden', false);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Protože v grafu $G-e$ nemůže $uv$-cesta vést přes hranu $e$, " +
        "nahradíme hranu $e$ $xy$-cestou  po kružnici $C$." +
        "<br/>Tím vznikne $uv$-sled $S_{uv}$ v $G-e$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Animace vyznaceni cesty u-v v grafu G-e
    frame0();
    function frame0() {
        resetGraphG();
        // Vyznaceni vrcholu u,v,x,y
        nodes.update({ id: 2, label: 'u' });
        nodes.update({ id: 10, label: 'y' });
        nodes.update({ id: 12, label: 'x' });
        nodes.update({ id: 15, label: 'v' });
        // Schovani hrany e
        edges.update({ id: 14, hidden: true });

        frame1Id = setTimeout(frame1, 1000);
    }

    function frame1() {
        nodes.update({ id: 2, color: { background: '#82B1FF' } });
        frame2Id = setTimeout(frame2, 1000);
    }

    function frame2() {
        edges.update({ id: 3, color: '#82B1FF', width: 2, arrows: 'to' });
        frame3Id = setTimeout(frame3, 1000);
    }

    function frame3() {
        edges.update({ id: 3, arrows: '' });
        nodes.update({ id: 4, color: { background: '#82B1FF' } });
        frame4Id = setTimeout(frame4, 1000);
    }

    function frame4() {
        edges.update({ id: 6, color: '#82B1FF', width: 2, arrows: 'to' });
        frame5Id = setTimeout(frame5, 1000);
    }

    function frame5() {
        edges.update({ id: 6, arrows: '' });
        nodes.update({ id: 5, color: { background: '#82B1FF' } });
        frame6Id = setTimeout(frame6, 1000);
    }

    function frame6() {
        edges.update({ id: 7, color: '#82B1FF', width: 2, arrows: 'to' });
        frame7Id = setTimeout(frame7, 1000);
    }

    function frame7() {
        edges.update({ id: 7, arrows: '' });
        nodes.update({ id: 10, color: { background: '#82B1FF' } });
        frame8Id = setTimeout(frame8, 1000);
    }

    function frame8() {
        edges.update({ id: 7, color: '#448AFF', width: 2, arrows: 'from' });
        frame9Id = setTimeout(frame9, 1000);
    }

    function frame9() {
        edges.update({ id: 7, width: 3, arrows: '' });
        nodes.update({ id: 5, color: { background: '#448AFF' } });
        frame10Id = setTimeout(frame10, 1000);
    }

    function frame10() {
        edges.update({ id: 6, color: '#448AFF', width: 2, arrows: 'from' });
        frame11Id = setTimeout(frame11, 1000);
    }

    function frame11() {
        edges.update({ id: 6, width: 3, arrows: '' });
        nodes.update({ id: 4, color: { background: '#448AFF' } });
        frame12Id = setTimeout(frame12, 1000);
    }

    function frame12() {
        edges.update({ id: 4, color: '#82B1FF', width: 2, arrows: 'from' });
        frame13Id = setTimeout(frame13, 1000);
    }

    function frame13() {
        edges.update({ id: 4, arrows: '' });
        nodes.update({ id: 3, color: { background: '#82B1FF' } });
        frame14Id = setTimeout(frame14, 1000);
    }

    function frame14() {
        edges.update({ id: 5, color: '#82B1FF', width: 2, arrows: 'to' });
        frame15Id = setTimeout(frame15, 1000);
    }

    function frame15() {
        edges.update({ id: 5, arrows: '' });
        nodes.update({ id: 6, color: { background: '#82B1FF' } });
        frame16Id = setTimeout(frame16, 1000);
    }

    function frame16() {
        edges.update({ id: 9, color: '#82B1FF', width: 2, arrows: 'to' });
        frame17Id = setTimeout(frame17, 1000);
    }

    function frame17() {
        edges.update({ id: 9, arrows: '' });
        nodes.update({ id: 8, color: { background: '#82B1FF' } });
        frame18Id = setTimeout(frame18, 1000);
    }

    function frame18() {
        edges.update({ id: 12, color: '#82B1FF', width: 2, arrows: 'to' });
        frame19Id = setTimeout(frame19, 1000);
    }

    function frame19() {
        edges.update({ id: 12, arrows: '' });
        nodes.update({ id: 11, color: { background: '#82B1FF' } });
        frame20Id = setTimeout(frame20, 1000);
    }

    function frame20() {
        edges.update({ id: 15, color: '#82B1FF', width: 2, arrows: 'to' });
        frame21Id = setTimeout(frame21, 1000);
    }

    function frame21() {
        edges.update({ id: 15, arrows: '' });
        nodes.update({ id: 12, color: { background: '#82B1FF' } });
        frame22Id = setTimeout(frame22, 1000);
    }

    function frame22() {
        edges.update({ id: 17, color: '#82B1FF', width: 2, arrows: 'to' });
        frame23Id = setTimeout(frame23, 1000);
    }

    function frame23() {
        edges.update({ id: 17, arrows: '' });
        nodes.update({ id: 15, color: { background: '#82B1FF' } });
        frame0Id = setTimeout(frame0, 3000);
    }
}

/**
 * Metoda pro vraceni grafu G do vychoziho stavu.
 */
function resetGraphG() {
    nodes.update({ id: 1, x: -200, y: -100, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 2, x: -200, y: -30, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 3, x: -130, y: -65, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 4, x: -130, y: 30, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 5, x: -60, y: 70, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 6, x: -55, y: -115, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 7, x: -55, y: -30, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 8, x: 30, y: -115, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 9, x: 25, y: -35, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 10, x: 20, y: 65, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 11, x: 100, y: -55, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 12, x: 90, y: 25, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 13, x: 140, y: -145, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 14, x: 210, y: -65, label: '', color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 15, x: 180, y: 0, label: '', color: { background: '#FFFF00', border: '#000000' } });

    edges.update({ id: 1, from: 1, to: 3, color: '000000', width: 1 });
    edges.update({ id: 2, from: 2, to: 3, color: '000000', width: 1 });
    edges.update({ id: 3, from: 2, to: 4, color: '000000', width: 1 });
    edges.update({ id: 4, from: 3, to: 4, color: '000000', width: 1 });
    edges.update({ id: 5, from: 3, to: 6, color: '000000', width: 1 });
    edges.update({ id: 6, from: 4, to: 5, color: '000000', width: 1 });
    edges.update({ id: 7, from: 5, to: 10, color: '000000', width: 1 });
    edges.update({ id: 8, from: 6, to: 7, color: '000000', width: 1 });
    edges.update({ id: 9, from: 6, to: 8, color: '000000', width: 1 });
    edges.update({ id: 10, from: 7, to: 10, color: '000000', width: 1 });
    edges.update({ id: 11, from: 8, to: 9, color: '000000', width: 1 });
    edges.update({ id: 12, from: 8, to: 11, color: '000000', width: 1 });
    edges.update({ id: 13, from: 8, to: 13, color: '000000', width: 1 });
    edges.update({ id: 14, from: 10, to: 12, label: '', color: '000000', width: 1 });
    edges.update({ id: 15, from: 11, to: 12, color: '000000', width: 1 });
    edges.update({ id: 16, from: 11, to: 14, color: '000000', width: 1 });
    edges.update({ id: 17, from: 12, to: 15, color: '000000', width: 1 });
    edges.update({ id: 18, from: 13, to: 14, color: '000000', width: 1 });
    edges.update({ id: 19, from: 13, to: 15, color: '000000', width: 1 });
    edges.update({ id: 20, from: 14, to: 15, color: '000000', width: 1 });
}

/**
 * Metoda pro zastaveni vsech casovacu spousteni framu animaci.
 * Zastavi veskere bezici animace.
 */
function clearAllTimers() {
    clearTimeout(frame0Id);
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
    clearTimeout(frame13Id);
    clearTimeout(frame14Id);
    clearTimeout(frame15Id);
    clearTimeout(frame16Id);
    clearTimeout(frame17Id);
    clearTimeout(frame18Id);
    clearTimeout(frame19Id);
    clearTimeout(frame20Id);
    clearTimeout(frame21Id);
    clearTimeout(frame22Id);
    clearTimeout(frame23Id);
}