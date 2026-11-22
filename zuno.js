
/* ==========================================
   EDUNOVA | ZUNO
   2.5D Character System
   Built from scratch
========================================== */

(() => {
    "use strict";

    const CONFIG = {
        width: 170,
        height: 190,
        position: {
            right: 22,
            bottom: 20
        }
    };

    const root = document.createElement("div");
    root.id = "zuno-system";

    root.innerHTML = `
        <div class="zuno-scene">

            <div class="zuno-character">

                <div class="zuno-body">
                    <div class="zuno-head">
                        <div class="zuno-hair"></div>
                        <div class="zuno-face">
                            <div class="zuno-eyes">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="zuno-smile"></div>
                        </div>
                    </div>

                    <div class="zuno-torso"></div>

                    <div class="zuno-arm zuno-arm-left"></div>
                    <div class="zuno-arm zuno-arm-right"></div>
                </div>

                <div class="zuno-pouch">
                    <div class="zuno-pouch-body">
                        <div class="zuno-pouch-stitch"></div>
                        <div class="zuno-pouch-name">ZUNO</div>
                    </div>

                    <div class="zuno-zipper">
                        <div class="zuno-zip-track"></div>
                        <div class="zuno-zip-pull"></div>
                    </div>
                </div>

            </div>
        </div>
    `;

    root.style.setProperty("--zuno-width", `${CONFIG.width}px`);
    root.style.setProperty("--zuno-height", `${CONFIG.height}px`);
    root.style.setProperty("--zuno-right", `${CONFIG.position.right}px`);
    root.style.setProperty("--zuno-bottom", `${CONFIG.position.bottom}px`);

    document.body.appendChild(root);

    const scene = root.querySelector(".zuno-scene");

    function setAnimation(name) {
        scene.dataset.state = name;
    }

    function show() {
        root.classList.add("zuno-visible");
        setAnimation("greeting");
    }

    function hide() {
        setAnimation("sleeping");

        root.classList.remove("zuno-visible");
    }

    function announce() {
        show();
        setAnimation("pointing");
    }

    function celebrate() {
        setAnimation("celebrating");
    }

    function thank() {
        setAnimation("thanking");
        window.setTimeout(hide, 1600);
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
