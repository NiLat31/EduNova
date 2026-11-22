
/* ==========================================
   EDUNOVA | ZUNO
   Floating Robot Mascot
   Fresh implementation
========================================== */

(() => {
    "use strict";

    if (document.getElementById("zuno-system")) return;

    const robot = document.createElement("div");
    robot.id = "zuno-system";

    robot.innerHTML = `
        <div class="zuno-scene">

            <div class="zuno-shadow"></div>

            <div class="zuno-robot">

                <div class="zuno-antenna">
                    <span></span>
                </div>

                <div class="zuno-ear zuno-ear-left"></div>
                <div class="zuno-ear zuno-ear-right"></div>

                <div class="zuno-arm zuno-arm-left">
                    <div class="zuno-hand"></div>
                </div>

                <div class="zuno-arm zuno-arm-right">
                    <div class="zuno-hand"></div>
                </div>

                <div class="zuno-body">

                    <div class="zuno-shell-highlight"></div>

                    <div class="zuno-face">

                        <div class="zuno-eyes">
                            <span class="zuno-eye"></span>
                            <span class="zuno-eye"></span>
                        </div>

                        <div class="zuno-mouth"></div>

                    </div>

                    <div class="zuno-chest">
                        <span>EN</span>
                    </div>

                </div>

                <div class="zuno-side-light"></div>

            </div>

        </div>
    `;

    document.body.appendChild(robot);

    const scene = robot.querySelector(".zuno-scene");

    function animate(state) {
        scene.dataset.state = state;
    }

    function show() {
        robot.classList.add("zuno-visible");
        animate("greeting");
    }

    function hide() {
        animate("sleeping");
        robot.classList.remove("zuno-visible");
    }

    function announce() {
        show();
        animate("pointing");
    }

    function celebrate() {
        animate("celebrating");
    }

    function thank() {
        animate("thanking");
        setTimeout(hide, 1800);
    }

    window.Zuno = {
        show,
        hide,
        announce,
        celebrate,
        thank
    };

    window.showZuno = show;
    window.hideZuno = hide;
    window.announceZuno = announce;
    window.celebrateZuno = celebrate;
    window.thankZuno = thank;

})();
