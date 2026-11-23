
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
   
// EduNova announcement template definitions
const announcementTemplates = {
    feature: {
        label: "NEW FEATURE",
        className: "feature"
    },
    notice: {
        label: "IMPORTANT NOTICE",
        className: "notice"
    },
    achievement: {
        label: "ACHIEVEMENT",
        className: "achievement"
    },
    update: {
        label: "GENERAL UPDATE",
        className: "update"
    },
    event: {
        label: "UPCOMING EVENT",
        className: "event"
    }
};

   const newspaper = document.createElement("div");
newspaper.id = "zuno-newspaper";


newspaper.innerHTML = `
 
<!-- COMPACT ANNOUNCEMENT CARD -->
<button class="zuno-paper-preview" type="button"
        aria-label="Open EduNova announcement">

    <span class="zuno-notification-dot"></span>

    <div class="zuno-preview-icon">EN</div>

    <span class="zuno-preview-label">EDUNOVA UPDATE</span>

    <h3 class="zuno-paper-mini-title">
        Something new has happened!
    </h3>

    <span class="zuno-preview-open">
        Discover more <span>↗</span>
    </span>

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
   
// Render an announcement using its selected template
function renderAnnouncement(announcement) {

    const template =
        announcementTemplates[announcement.type] ||
        announcementTemplates.update;

    // Apply the announcement category
    newspaper.dataset.type = template.className;

    // Small announcement card
    newspaper.querySelector(".zuno-preview-label").textContent =
        template.label;

    newspaper.querySelector(".zuno-paper-mini-title").textContent =
        announcement.title;

    // Official newspaper
    newspaper.querySelector(".zuno-paper-article-category").textContent =
        template.label;

    newspaper.querySelector(".zuno-paper-article-title").textContent =
        announcement.title;

    newspaper.querySelector(".zuno-paper-article-subtitle").textContent =
        announcement.subtitle || "";

    newspaper.querySelector(".zuno-paper-article-content").textContent =
        announcement.content || "";

    newspaper.querySelector(".zuno-paper-article-issue").textContent =
        announcement.issue || "EN-001";

    // Optional article image
    const articleImage =
        newspaper.querySelector(".zuno-paper-article-image");

    if (announcement.image) {
        articleImage.style.backgroundImage =
            `url("${announcement.image}")`;
        articleImage.style.display = "block";
    } else {
        articleImage.style.display = "none";
        articleImage.style.backgroundImage = "none";
    }

    // Optional action link
    const actionContainer =
        newspaper.querySelector(".zuno-paper-article-action");

    actionContainer.replaceChildren();

    if (announcement.action_text && announcement.action_url) {
        const link = document.createElement("a");

        link.textContent = announcement.action_text;
        link.href = announcement.action_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        actionContainer.appendChild(link);
    }
}

// Make the renderer available for future announcements
window.setZunoAnnouncement = renderAnnouncement;

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
   
// Open the newspaper
const paperPreview = newspaper.querySelector(".zuno-paper-preview");

paperPreview.addEventListener("click", () => {
    newspaper.classList.add("zuno-news-expanded");
});

// Close the newspaper and let Zuno say goodbye
const paperClose = newspaper.querySelector(".zuno-paper-close");

paperClose.addEventListener("click", () => {
    newspaper.classList.remove("zuno-news-expanded");
    newspaper.classList.remove("zuno-news-visible");

    welcomeBubble1.textContent = "See you next time! 👋";
welcomeBubble1.style.zIndex = "10002";
    welcomeBubble1.classList.add("zuno-welcome-visible");

    animate("celebrating");
    launchConfetti();

    setTimeout(() => {
        welcomeBubble1.classList.remove("zuno-welcome-visible");
        robot.classList.remove("zuno-visible");

        animate("sleeping");

        welcomeBubble1.textContent = "Hi! I'm Zuno! 👋";
    }, 3500);
});


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
