
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
    <span class="zuno-eye zuno-eye-left"></span>
    <span class="zuno-eye zuno-eye-right"></span>
</div>

<div class="zuno-mouth"></div>

<div class="zuno-cheeks">
    <span></span>
    <span></span>
</div>
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
    launchConfetti();
}
   function launchConfetti() {
    const colors = [
        "#e52b20",
        "#ffcc42",
        "#39b86b",
        "#4285f4",
        "#b56bea",
        "#ff7c42"
    ];

    const scene = robot.querySelector(".zuno-scene");

    // Remove any previous confetti.
    scene.querySelectorAll(".zuno-confetti").forEach(el => el.remove());

    // Launch strips from both hands.
    for (let hand = 0; hand < 2; hand++) {
        for (let i = 0; i < 12; i++) {
            const strip = document.createElement("span");

            strip.className = "zuno-confetti";

            const direction = hand === 0 ? -1 : 1;
            const spread = 25 + Math.random() * 65;

            strip.style.setProperty(
                "--start-x",
                hand === 0 ? "13%" : "87%"
            );

            strip.style.setProperty(
                "--move-x",
                `${direction * spread}px`
            );

            strip.style.setProperty(
                "--move-y",
                `${-35 - Math.random() * 75}px`
            );

            strip.style.setProperty(
                "--rotation",
                `${Math.random() * 720 - 360}deg`
            );

            strip.style.setProperty(
                "--confetti-color",
                colors[Math.floor(Math.random() * colors.length)]
            );

            strip.style.animationDelay = `${Math.random() * 0.25}s`;

            scene.appendChild(strip);
        }
    }

    setTimeout(() => {
        scene.querySelectorAll(".zuno-confetti").forEach(el => el.remove());
    }, 1800);
}

    function thank() {
        animate("thanking");
        setTimeout(hide, 1800);
    }
function surprise() {
    animate("surprised");
}
    window.Zuno = {
        show,
        hide,
        announce,
        celebrate,
         thank,
       surprise
    };

    window.showZuno = show;
    window.hideZuno = hide;
    window.announceZuno = announce;
    window.celebrateZuno = celebrate;
    window.thankZuno = thank;
   window.surpriseZuno = surprise;

})();
