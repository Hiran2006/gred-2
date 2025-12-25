import supabase from "@/util/supabase/client"
export const googleAuth = () => {
  const redirectTo = window.location.origin + "/home"
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  })
}
