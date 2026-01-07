import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // 1. Default to dashboard if no 'next' param is present
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 2. CRITICAL: If this was a signup verification, we WANT them to see the success page.
      // Since we removed ?next= from actions.ts, we hardcode the destination here
      // or logic to detect it.
      // For simplicity in your flow, let's force the Verify Success page
      // if they are coming from an email link (which usually has no cookie yet).

      return NextResponse.redirect(
        `${origin}/verify-email?message=email-success`
      );
    }
  }

  // Error case: Redirect to the verify page with error state instead of login
  return NextResponse.redirect(
    `${origin}/verify-email?message=auth-code-error`
  );
}
