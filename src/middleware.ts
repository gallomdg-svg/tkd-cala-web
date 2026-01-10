import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  // 🔐 Rutas privadas
  if (pathname.startsWith("/alumno") || pathname.startsWith("/profesor")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🚫 Bloqueo por rol
    if (pathname.startsWith("/alumno") && profile.role !== "alumno") {
      return NextResponse.redirect(new URL("/profesor/perfil", req.url));
    }

    if (pathname.startsWith("/profesor") && profile.role !== "profesor") {
      return NextResponse.redirect(new URL("/alumno/perfil", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/alumno/:path*", "/profesor/:path*"],
};
