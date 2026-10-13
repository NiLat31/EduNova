
(() => {
    "use strict";

    const SUPABASE_URL =
        "https://majvqtbortonsrgdknms.supabase.co";

    const SUPABASE_PUBLISHABLE_KEY =
        "sb_publishable_J3xbJWRcBIei3PLPg9GG3Q_JAjemfD_";

    const premiumClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    function showVerificationError() {
        let overlay = document.getElementById(
            "premium-access-error"
        );

        if (overlay) return;

        overlay = document.createElement("div");
        overlay.id = "premium-access-error";

        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            zIndex: "999999",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            background: "#111",
            color: "#fff",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            visibility: "visible"
        });

        const heading = document.createElement("h2");
        heading.textContent = "Unable to verify access";
        heading.style.marginBottom = "14px";

        const message = document.createElement("p");
        message.textContent =
            "We couldn't verify your Premium access. " +
            "Your lesson progress has not been changed. " +
            "Please try again.";

        message.style.maxWidth = "480px";
        message.style.lineHeight = "1.7";

        const retryButton = document.createElement("button");
        retryButton.textContent = "TRY AGAIN";
        retryButton.type = "button";

        Object.assign(retryButton.style, {
            marginTop: "24px",
            padding: "13px 24px",
            border: "0",
            background: "#7c3aed",
            color: "#fff",
            fontWeight: "700",
            cursor: "pointer"
        });

        retryButton.addEventListener("click", () => {
            window.location.reload();
        });

        overlay.append(heading, message, retryButton);
        document.body.appendChild(overlay);
    }

    async function requirePremium() {
        try {
            const {
                data: { session },
                error: sessionError
            } = await premiumClient.auth.getSession();

            if (sessionError) {
                throw sessionError;
            }

            // Login is required for lesson access.
            if (!session) {
                window.location.replace("index.html");
                return;
            }

            const {
                data: student,
                error
            } = await premiumClient
                .from("students")
                .select("premium_access")
                .eq("id", session.user.id)
                .single();

            // Fail closed if access cannot be verified.
            // Do not sign the student out because of a query error.
            if (error) {
                throw error;
            }

            if (!student) {
                throw new Error(
                    "Student account record was not found."
                );
            }

            // Students without Premium are sent to the
            // Premium page.
            if (student.premium_access !== true) {
                window.location.replace("premium.html");
                return;
            }

            // Reveal the lesson only after access is verified.
            document.documentElement.classList.add(
                "premium-access-granted"
            );

        } catch (error) {
            console.error(
                "Premium access verification failed:",
                error
            );

            showVerificationError();
        }
    }

    requirePremium();
})();
