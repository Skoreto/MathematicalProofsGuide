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

function nextStep() {
    if (currentStep <= 9) {
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

        if (currentStep == 8)
            step9();

        if (currentStep == 9) {
            $('#btnNextStep').prop('disabled', true);
            step10();
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
            $('#divSentenceBox').prop('hidden', true);
            clearAllTimers();
            stepReset();
            step1();
        }

        if (currentStep == 3) {
            stepReset();
            step1();
            step2();
        }

        if (currentStep == 4) {
            $('#divSentenceBox').prop('hidden', false);
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

        if (currentStep == 10) {
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
            step9();
        }

        currentStep--;
        $("#spCurrentStep").text(currentStep);
    }
}

function stepReset() {
    $("#proofBox").empty();
    $("#divSentenceBox").empty();
    $("#divNetworkDescription").empty();
    eraseGraph();
}

function step1() {
    $("#proofBox").append("<p>Nechť $e=\\{e\\}$ a $C_1 = (u=x_1,x_2,...,x_k=v,u)$ a " +
        "$C_2 = (u=y_1,y_2,...,y_l=v,u)$ jsou dvě různé kružnice, které obsahují hranu $e$. " +
        "Můžou nastat dvě možnosti:</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);
}

function step2() {
    $("#proofBox").append("<p><b>1.</b> $C_1 \\cap C_2=\\{u,v\\}$ (tj. kružnice mají společnou jenom hranu $e$)" +
        "<br/>$\\Rightarrow$ pak dle definice kružnice" +
        "<br/><span class=\"text-center\">$(u,x_2,...,x_k=v=y_l,y_{l-1},...y_2,y_1=u)$</span>" +
        "<br/>je kružnice neobsahující hranu $e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divSentenceBox").empty();
    $("#divSentenceBox").append("<p>DEFINICE KRUŽNICE " +
        "<br/>Kružnice délky k, k $\\geq$ 3, v grafu $G$ je posloupnost $(v_0,e_1,v_1,...,e_k,v_0)$, " +
        "kde $e_i = \\{v_{i-1}, v_i \\}$, $i=1,...,k-1$, $e_k = \\{v_{k-1},v_0 \\}$ a $i \\neq j$ platí " +
        "$v_i \\neq v_j$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divSentenceBox"]);
    $('#divSentenceBox').prop('hidden', false);

    $("#divNetworkDescription").append("<p>Příklad grafu $G$, kde kružnice $C_1$ a $C_2$ sdílejí hranu $e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Vytvoreni grafu G1 - dve kruznice se spolecnou hranou
    nodes.add({ id: 1, x: -140, y: 0, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 2, x: -80, y: -70, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 3, x: -80, y: 70, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 4, x: 0, y: -40, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 5, x: 0, y: 40, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 6, x: 80, y: -70, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 7, x: 80, y: 70, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 8, x: 140, y: 0, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });

    edges.add({ id: 1, from: 1, to: 2 });
    edges.add({ id: 2, from: 1, to: 3 });
    edges.add({ id: 3, from: 2, to: 4 });
    edges.add({ id: 4, from: 3, to: 5 });
    edges.add({ id: 5, from: 4, to: 5 });
    edges.add({ id: 6, from: 4, to: 6 });
    edges.add({ id: 7, from: 5, to: 7 });
    edges.add({ id: 8, from: 6, to: 8 });
    edges.add({ id: 9, from: 7, to: 8 });

    // Priblizeni kamery
    var options = {
        position: { x: 0, y: 0 },
        scale: 1.8,
        offset: { x: 0, y: 0 },
        animation: {
            duration: 0,
            easingFunction: "easeInOutQuad"
        }
    };
    network.moveTo(options);

    // Vyznaceni vrcholu u a v
    nodes.update({ id: 4, label: 'u' });
    nodes.update({ id: 5, label: 'v' });
    edges.update({ id: 5, label: '      e', font: { align: 'horizontal', vadjust: 100 } });

    // Animace vyznaceni kruznic C1 a C2
    frame0Id = setTimeout(frame0, 2000);

    function frame0() {
        // Vyznaceni kruznice C1
        nodes.update({ id: 1, color: { background: '#EC407A' } });
        nodes.update({ id: 2, color: { background: '#EC407A' } });
        nodes.update({ id: 3, color: { background: '#EC407A' } });
        nodes.update({ id: 4, color: { background: '#EC407A' } });
        nodes.update({ id: 5, color: { background: '#EC407A' } });

        edges.update({ id: 1, color: '#EC407A', width: 2 });
        edges.update({ id: 2, color: '#EC407A', width: 2 });
        edges.update({ id: 3, color: '#EC407A', width: 2 });
        edges.update({ id: 4, color: '#EC407A', width: 2 });
        edges.update({ id: 5, color: '#EC407A', width: 2 });

        frame1Id = setTimeout(frame1, 2000);
    }

    function frame1() {
        resetGraphG1();
        frame2Id = setTimeout(frame2, 1000);
    }

    function frame2() {
        // Vyznaceni kruznice C2
        nodes.update({ id: 4, color: { background: '#4DB6AC' } });
        nodes.update({ id: 5, color: { background: '#4DB6AC' } });
        nodes.update({ id: 6, color: { background: '#4DB6AC' } });
        nodes.update({ id: 7, color: { background: '#4DB6AC' } });
        nodes.update({ id: 8, color: { background: '#4DB6AC' } });

        edges.update({ id: 5, color: '#4DB6AC', width: 2 });
        edges.update({ id: 6, color: '#4DB6AC', width: 2 });
        edges.update({ id: 7, color: '#4DB6AC', width: 2 });
        edges.update({ id: 8, color: '#4DB6AC', width: 2 });
        edges.update({ id: 9, color: '#4DB6AC', width: 2 });

        frame3Id = setTimeout(frame3, 2000);
    }

    function frame3() {
        resetGraphG1();
        frame0Id = setTimeout(frame0, 2000)
    }
}

function step3() {
    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Poté v grafu $G$ existuje také kružnice $C_3$ neobsahující hranu $e$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    clearAllTimers();
    resetGraphG1();

    // Vyznaceni kruznice C3
    nodes.update({ id: 1, color: { background: '#FF7043' } });
    nodes.update({ id: 2, color: { background: '#FF7043' } });
    nodes.update({ id: 3, color: { background: '#FF7043' } });
    nodes.update({ id: 4, color: { background: '#FF7043' } });
    nodes.update({ id: 5, color: { background: '#FF7043' } });
    nodes.update({ id: 6, color: { background: '#FF7043' } });
    nodes.update({ id: 7, color: { background: '#FF7043' } });
    nodes.update({ id: 8, color: { background: '#FF7043' } });

    edges.update({ id: 1, color: '#FF7043', width: 2 });
    edges.update({ id: 2, color: '#FF7043', width: 2 });
    edges.update({ id: 3, color: '#FF7043', width: 2 });
    edges.update({ id: 4, color: '#FF7043', width: 2 });
    edges.update({ id: 6, color: '#FF7043', width: 2 });
    edges.update({ id: 7, color: '#FF7043', width: 2 });
    edges.update({ id: 8, color: '#FF7043', width: 2 });
    edges.update({ id: 9, color: '#FF7043', width: 2 });
}

function step4() {
    $("#proofBox").append("<p><b>2.</b> $C_1 \\cap C_2=\\{e, e_1,...\\}$ (tj. kružnice mají kromě hrany $e$ " +
        "ještě jiné společné hrany)," +
        "<br/>pak máme dvě různé $u-v$ cesty $P_1=C_1=e=(u=x_1,x_2,...,x_k=v)$ a " +
        "$P_2=C_2=e=(u=y_1,y_2,...,y_l=v)$ a žádná z cest neobsahuje hranu $e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $('#divSentenceBox').prop('hidden', true);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Příklad grafu $G$, kde kružnice $C_1$ a $C_2$ sdílejí hranu $e$ " +
        "a ještě další hranu $e_1$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Smazani celeho grafu G1
    eraseGraph();

    // Vytvoreni grafu G2 - dve kruznice s vice spolecnymi hranami
    nodes.add({ id: 1, x: -160, y: 0, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 2, x: -80, y: -80, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 3, x: -80, y: 80, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 4, x: 0, y: 0, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 5, x: 80, y: -80, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 6, x: 80, y: 80, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.add({ id: 7, x: 160, y: 0, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });

    edges.add({ id: 1, from: 1, to: 2 });
    edges.add({ id: 2, from: 1, to: 3 });
    edges.add({ id: 3, from: 1, to: 4 });
    edges.add({ id: 4, from: 2, to: 5 });
    edges.add({ id: 5, from: 3, to: 6 });
    edges.add({ id: 6, from: 4, to: 7 });
    edges.add({ id: 7, from: 5, to: 7 });
    edges.add({ id: 8, from: 6, to: 7 });

    // Priblizeni kamery
    var options = {
        position: { x: 0, y: 10 },
        scale: 1.5,
        offset: { x: 0, y: 0 },
        animation: {
            duration: 0,
            easingFunction: "easeInOutQuad"
        }
    };
    network.moveTo(options);

    // Vyznaceni vrcholu u a v
    nodes.update({ id: 1, label: 'u' });
    nodes.update({ id: 4, label: 'v' });
    edges.update({ id: 3, label: '                    e', font: { align: 'top' } });
}

function step5() {
    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Vyznačení kružnice $C_1$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Vyznaceni kruznice C1
    nodes.update({ id: 1, color: { background: '#EC407A' } });
    nodes.update({ id: 2, color: { background: '#EC407A' } });
    nodes.update({ id: 4, color: { background: '#EC407A' } });
    nodes.update({ id: 5, color: { background: '#EC407A' } });
    nodes.update({ id: 7, color: { background: '#EC407A' } });

    edges.update({ id: 1, color: '#EC407A', width: 2 });
    edges.update({ id: 3, color: '#EC407A', width: 2 });
    edges.update({ id: 4, color: '#EC407A', width: 2 });
    edges.update({ id: 6, color: '#EC407A', width: 2 });
    edges.update({ id: 7, color: '#EC407A', width: 2 });

    // Vyznaceni hrany e1
    edges.update({ id: 6, label: '                    e1', font: { align: 'top' } });
}

function step6() {
    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Vyznačení cesty $P_1=C_1-e$, tedy přes kružnici $C_1$ bez hrany $e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    resetGraphG2();

    // Vyznaceni cesty pres kruznici C1
    nodes.update({ id: 1, color: { background: '#B388FF' } });
    nodes.update({ id: 2, color: { background: '#B388FF' } });
    nodes.update({ id: 4, color: { background: '#B388FF' } });
    nodes.update({ id: 5, color: { background: '#B388FF' } });
    nodes.update({ id: 7, color: { background: '#B388FF' } });

    edges.update({ id: 1, color: '#B388FF', width: 2 });
    edges.update({ id: 4, color: '#B388FF', width: 2 });
    edges.update({ id: 6, color: '#B388FF', width: 2 });
    edges.update({ id: 7, color: '#B388FF', width: 2 });

    // Vyznaceni vrcholu u a v
    nodes.update({ id: 1, label: 'u' });
    nodes.update({ id: 4, label: 'v' });
    edges.update({ id: 3, label: '                    e', font: { align: 'top' } });

    // Vyznaceni vrcholu x1,x2,x3 a hrany e1
    nodes.update({ id: 2, label: 'x1' });
    nodes.update({ id: 5, label: 'x2' });
    nodes.update({ id: 7, label: 'x3' });
    edges.update({ id: 6, label: '                    e1', font: { align: 'top' } });
}

function step7() {
    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Vyznačení kružnice $C_2$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    resetGraphG2();

    // Vyznaceni kruznice C2
    nodes.update({ id: 1, color: { background: '#4DB6AC' } });
    nodes.update({ id: 3, color: { background: '#4DB6AC' } });
    nodes.update({ id: 4, color: { background: '#4DB6AC' } });
    nodes.update({ id: 6, color: { background: '#4DB6AC' } });
    nodes.update({ id: 7, color: { background: '#4DB6AC' } });

    edges.update({ id: 2, color: '#4DB6AC', width: 2 });
    edges.update({ id: 3, color: '#4DB6AC', width: 2 });
    edges.update({ id: 5, color: '#4DB6AC', width: 2 });
    edges.update({ id: 6, color: '#4DB6AC', width: 2 });
    edges.update({ id: 8, color: '#4DB6AC', width: 2 });

    // Vyznaceni vrcholu u a v
    nodes.update({ id: 1, label: 'u' });
    nodes.update({ id: 4, label: 'v' });
    edges.update({ id: 3, label: '                    e', font: { align: 'top' } });

    // Vyznaceni hrany e1
    edges.update({ id: 6, label: '                    e1', font: { align: 'top' } });
}

function step8() {
    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Vyznačení cesty $P_2=C_2-e$, tedy přes kružnici $C_2$ bez hrany $e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    resetGraphG2();

    // Vyznaceni kruznice C2
    nodes.update({ id: 1, color: { background: '#B388FF' } });
    nodes.update({ id: 3, color: { background: '#B388FF' } });
    nodes.update({ id: 4, color: { background: '#B388FF' } });
    nodes.update({ id: 6, color: { background: '#B388FF' } });
    nodes.update({ id: 7, color: { background: '#B388FF' } });

    edges.update({ id: 2, color: '#B388FF', width: 2 });
    edges.update({ id: 5, color: '#B388FF', width: 2 });
    edges.update({ id: 6, color: '#B388FF', width: 2 });
    edges.update({ id: 8, color: '#B388FF', width: 2 });

    // Vyznaceni vrcholu u a v
    nodes.update({ id: 1, label: 'u' });
    nodes.update({ id: 4, label: 'v' });
    edges.update({ id: 3, label: '                    e', font: { align: 'top' } });

    // Vyznaceni vrcholu y1,y2,y3 a hrany e1
    nodes.update({ id: 3, label: 'y1' });
    nodes.update({ id: 6, label: 'y2' });
    nodes.update({ id: 7, label: 'y3' });
    edges.update({ id: 6, label: '                    e1', font: { align: 'top' } });
}

function step9() {
    $("#proofBox").append("<p>$\\Rightarrow$ existuje vrchol, ve kterém se cesty rozcházejí a také vrchol, " +
        "ce kterém se cesty scházejí." +
        "<br/>(Mohou to být vrcholy $u$ a $v$, nebo některé vnitřní.)" +
        "<br/><br/>Nechť prvním vrcholem, ve kterém se cesty rozcházejí, je $x_i=y_j,i \\in \\{1,2,...,k \\}$, " +
        "$j \\in \\{1,2,...,l \\}$ a vrchol, ve kterém se scházejí, je $x_s=y_r,s \\in \\{1,2,...,k \\}$, " +
        "$r \\in \\{1,2,...,l \\} \\wedge s > i \\wedge r > j$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Vyznačení vrcholu $u$, ve kterém se cesty rozcházejí, a vrcholu " +
        "$x_3=y_3$, ve kterém se cesty scházejí.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    resetGraphG2();

    // Vyznaceni rozchazejiciho vrcholu u a schazejiciho x3=y3
    nodes.update({ id: 1, label: 'u', color: { background: '#FF7043' } });
    nodes.update({ id: 4, label: 'v' });
    nodes.update({ id: 7, label: 'x3=y3', color: { background: '#FF7043' }, font: { size: 14 } });
    edges.update({ id: 3, label: '                    e', font: { align: 'top' } });
}

function step10() {
    $("#proofBox").append("<p><br/>Pak podle definice kružnice je $(x_i,x_{i+1},...,x_s = y_r,...,y_j=x_i)$ kružnice neobsahující " +
        "hranu $e$, protože ani jedna z cest ji neobsahovala.</p>");
    $("#proofBox").append("<p class=\"text-center\">$\\dagger$ Tím je tvrzení dokázáno.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "proofBox"]);

    $("#divSentenceBox").empty();
    $("#divSentenceBox").append("<p>DEFINICE KRUŽNICE " +
        "<br/>Kružnice délky k, k $\\geq$ 3, v grafu $G$ je posloupnost $(v_0,e_1,v_1,...,e_k,v_0)$, " +
        "kde $e_i = \\{v_{i-1}, v_i \\}$, $i=1,...,k-1$, $e_k = \\{v_{k-1},v_0 \\}$ a $i \\neq j$ platí " +
        "$v_i \\neq v_j$.</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divSentenceBox"]);
    $('#divSentenceBox').prop('hidden', false);

    $("#divNetworkDescription").empty();
    $("#divNetworkDescription").append("<p>Vyznačení kružnice $C_3$, která neobsahuje hranu $e$</p>");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divNetworkDescription"]);

    // Doznaceni zbytku kruznice C3
    nodes.update({ id: 2, label: 'x1', color: { background: '#FF7043' } });
    nodes.update({ id: 3, label: 'y1', color: { background: '#FF7043' } });
    nodes.update({ id: 5, label: 'x2', color: { background: '#FF7043' } });
    nodes.update({ id: 6, label: 'y2', color: { background: '#FF7043' } });

    edges.update({ id: 1, color: '#FF7043', width: 2 });
    edges.update({ id: 2, color: '#FF7043', width: 2 });
    edges.update({ id: 4, color: '#FF7043', width: 2 });
    edges.update({ id: 5, color: '#FF7043', width: 2 });
    edges.update({ id: 7, color: '#FF7043', width: 2 });
    edges.update({ id: 8, color: '#FF7043', width: 2 });
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
}

/**
 * Metoda pro vraceni grafu G1 do puvodniho stavu.
 */
function resetGraphG1() {
    nodes.update({ id: 1, x: -140, y: 0, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 2, x: -80, y: -70, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 3, x: -80, y: 70, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 4, x: 0, y: -40, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 5, x: 0, y: 40, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 6, x: 80, y: -70, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 7, x: 80, y: 70, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 8, x: 140, y: 0, physics: isPhysics, color: { background: '#FFFF00', border: '#000000' } });

    edges.update({ id: 1, from: 1, to: 2, color: '#000000', width: 1 });
    edges.update({ id: 2, from: 1, to: 3, color: '#000000', width: 1 });
    edges.update({ id: 3, from: 2, to: 4, color: '#000000', width: 1 });
    edges.update({ id: 4, from: 3, to: 5, color: '#000000', width: 1 });
    edges.update({ id: 5, from: 4, to: 5, color: '#000000', width: 1 });
    edges.update({ id: 6, from: 4, to: 6, color: '#000000', width: 1 });
    edges.update({ id: 7, from: 5, to: 7, color: '#000000', width: 1 });
    edges.update({ id: 8, from: 6, to: 8, color: '#000000', width: 1 });
    edges.update({ id: 9, from: 7, to: 8, color: '#000000', width: 1 });
}

/**
 * Metoda pro vraceni grafu G2 do puvodniho stavu.
 */
function resetGraphG2() {
    nodes.update({ id: 1, x: -160, y: 0, label: '', physics: isPhysics,
        color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 2, x: -80, y: -80, label: '', physics: isPhysics,
        color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 3, x: -80, y: 80, label: '', physics: isPhysics,
        color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 4, x: 0, y: 0, label: '', physics: isPhysics,
        color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 5, x: 80, y: -80, label: '', physics: isPhysics,
        color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 6, x: 80, y: 80, label: '', physics: isPhysics,
        color: { background: '#FFFF00', border: '#000000' } });
    nodes.update({ id: 7, x: 160, y: 0, label: '', physics: isPhysics,
        color: { background: '#FFFF00', border: '#000000' } });

    edges.update({ id: 1, from: 1, to: 2, label: '', color: '#000000', width: 1 });
    edges.update({ id: 2, from: 1, to: 3, label: '', color: '#000000', width: 1 });
    edges.update({ id: 3, from: 1, to: 4, label: '', color: '#000000', width: 1 });
    edges.update({ id: 4, from: 2, to: 5, label: '', color: '#000000', width: 1 });
    edges.update({ id: 5, from: 3, to: 6, label: '', color: '#000000', width: 1 });
    edges.update({ id: 6, from: 4, to: 7, label: '', color: '#000000', width: 1 });
    edges.update({ id: 7, from: 5, to: 7, label: '', color: '#000000', width: 1 });
    edges.update({ id: 8, from: 6, to: 7, label: '', color: '#000000', width: 1 });
}

/**
 * Metoda pro smazani aktualne pouzivaneho grafu z pameti.
 */
function eraseGraph() {
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);
}