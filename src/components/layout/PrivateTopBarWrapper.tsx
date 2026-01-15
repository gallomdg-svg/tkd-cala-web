"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import PrivateTopBar from "@/components/layout/PrivateTopBar";

type Role = "alumno" | "profesor";

export default function PrivateTopBarWrapper() {
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabaseClient.auth.getUser();

      if (!data.user) {
        setRole(null);
        return;
      }

      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      setRole(profile?.role ?? null);
    };

    loadProfile();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(() => {
      loadProfile();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!role) return null;

  return <PrivateTopBar role={role} />;
}
