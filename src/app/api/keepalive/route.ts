import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Consulta mínima a Supabase para que el proyecto (plan gratuito)
// no se pause por inactividad. La ejecuta Vercel una vez por día
// según el cron definido en vercel.json.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Si está configurado CRON_SECRET en Vercel, solo acepta llamadas del cron.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  // Solo cuenta filas (no devuelve datos)
  const { error } = await supabase
    .from("eventos")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("keepalive error:", error.message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
