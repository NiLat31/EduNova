
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
            <div class="zuno-thrusters">
    <div class="zuno-thruster zuno-thruster-left">
        <span></span>
    </div>
    <div class="zuno-thruster zuno-thruster-right">
        <span></span>
    </div>
</div>

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
   const newspaper = document.createElement("div");
newspaper.id = "zuno-newspaper";


newspaper.innerHTML = `
    <!-- COMPACT NEWSPAPER -->
    <button class="zuno-paper-preview" type="button"
            aria-label="Open EduNova newspaper">

        <div class="zuno-paper-mini-top">
            <span>EN</span>
            <span>EDITION 001</span>
        </div>

        <div class="zuno-paper-mini-masthead">
            EDUNOVA
        </div>

        <div class="zuno-paper-mini-rule"></div>

        <div class="zuno-paper-mini-category">
            LATEST NEWS
        </div>

        <h3 class="zuno-paper-mini-title">
            Something new is here!
        </h3>

        <p class="zuno-paper-mini-description">
            Discover the latest from EduNova.
        </p>

        <div class="zuno-paper-mini-footer">
            <span>MATHEMATICS MADE CLEAR.</span>
            <span>READ →</span>
        </div>
    </button>

    <!-- EXPANDED NEWSPAPER -->
    <div class="zuno-paper-expanded"
         role="dialog"
         aria-modal="false"
         aria-label="EduNova announcement">

        <div class="zuno-paper-expanded-header">
            <div>
                <div class="zuno-paper-expanded-edition">
                    THE EDUNOVA JOURNAL
                </div>
                <div class="zuno-paper-expanded-brand">
                    EDUNOVA
                </div>
            </div>

            <button class="zuno-paper-close"
                    type="button"
                    aria-label="Close newspaper">
                ×
            </button>
        </div>

        <div class="zuno-paper-expanded-rule"></div>

        <article class="zuno-paper-article">

            <div class="zuno-paper-article-meta">
                <span class="zuno-paper-article-category">
                    GENERAL UPDATE
                </span>
                <span class="zuno-paper-article-issue">
                    EN-001
                </span>
            </div>

            <h2 class="zuno-paper-article-title">
                Something new is here!
            </h2>

            <p class="zuno-paper-article-subtitle">
                Discover what's happening at EduNova.
            </p>

            <div class="zuno-paper-article-image"></div>

            <div class="zuno-paper-article-content">
                Stay tuned for the latest announcements,
                improvements and learning experiences from EduNova.
            </div>

            <div class="zuno-paper-article-action"></div>

        </article>

        <div class="zuno-paper-expanded-footer">
            <span>MATHEMATICS MADE CLEAR.</span>
            <span>EDUNOVA NEWS</span>
        </div>

    </div>
`;


document.body.appendChild(newspaper);
   // Zuno's first welcome message
const welcomeBubble1 = document.createElement("div");
welcomeBubble1.id = "zuno-welcome-bubble-1";
welcomeBubble1.className = "zuno-welcome-bubble";
welcomeBubble1.textContent = "Hi! I'm Zuno! 👋";
welcomeBubble1.setAttribute("role", "status");

// Zuno's second welcome message
const welcomeBubble2 = document.createElement("div");
welcomeBubble2.id = "zuno-welcome-bubble-2";
welcomeBubble2.className = "zuno-welcome-bubble";
welcomeBubble2.textContent =
    "I'll keep you informed whenever EduNova has news or an important update!";
welcomeBubble2.setAttribute("role", "status");

document.body.appendChild(welcomeBubble1);
document.body.appendChild(welcomeBubble2);

    const scene = robot.querySelector(".zuno-scene");

    function animate(state) {
        scene.dataset.state = state;
    }

  function show() {
    robot.classList.add("zuno-visible");
    newspaper.classList.add("zuno-news-visible");
    animate("greeting");
}

   function hide() {
    animate("sleeping");
    robot.classList.remove("zuno-visible");
    newspaper.classList.remove("zuno-news-visible");
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
   function welcome() {
    return new Promise(resolve => {
        robot.classList.add("zuno-visible");

        // Keep the announcement newspaper hidden
        newspaper.classList.remove("zuno-news-visible");

        // Show the first message
        welcomeBubble1.classList.add("zuno-welcome-visible");
        welcomeBubble2.classList.remove("zuno-welcome-visible");

        animate("greeting");

        setTimeout(() => {
            // Replace the first message with the second
            welcomeBubble1.classList.remove("zuno-welcome-visible");
            welcomeBubble2.classList.add("zuno-welcome-visible");

            setTimeout(() => {
                // Finish the introduction
                welcomeBubble2.classList.remove("zuno-welcome-visible");
                robot.classList.remove("zuno-visible");

                animate("sleeping");
                resolve();
            }, 4500);

        }, 2500);
    });
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
    surprise,
    welcome
};

    window.showZuno = show;
    window.hideZuno = hide;
    window.announceZuno = announce;
    window.celebrateZuno = celebrate;
    window.thankZuno = thank;
   window.surpriseZuno = surprise;
   window.welcomeZuno = welcome;

})();
