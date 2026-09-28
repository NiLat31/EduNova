(() => {

    const SUPABASE_URL = "https://majvqtbortonsrgdknms.supabase.co";
    const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_J3xbJWRcBIei3PLPg9GG3Q_JAjemfD_";

    const premiumClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    async function requirePremium(){

        const {
            data: { session }
        } = await premiumClient.auth.getSession();

        // Not logged in
        if(!session){
            window.location.href = "index.html";
            return;
        }

        const { data: student, error } = await premiumClient
            .from("students")
            .select("premium_access")
            .eq("id", session.user.id)
            .single();

        // Could not verify the student's account
        if(error || !student){
            await premiumClient.auth.signOut();
            window.location.href = "index.html";
            return;
        }

        // Student has not purchased Premium
        if(student.premium_access !== true){
            window.location.href = "premium.html";
            return;
        }

        // Premium is active
        document.documentElement.classList.add("premium-access-granted");
    }

    document.addEventListener("DOMContentLoaded", requirePremium);

})();
