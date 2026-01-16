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
    // No logueado → login
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Buscar profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (error || !profile) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🚫 Bloqueo por tipo de usuario
    // Alumno intentando entrar a /profesor
    if (pathname.startsWith("/profesor") && !profile.is_admin) {
      return NextResponse.redirect(new URL("/alumno/perfil", req.url));
    }

    // Admin intentando entrar a /alumno
    if (pathname.startsWith("/alumno") && profile.is_admin) {
      return NextResponse.redirect(new URL("/profesor/perfil", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/alumno/:path*", "/profesor/:path*"],
};
