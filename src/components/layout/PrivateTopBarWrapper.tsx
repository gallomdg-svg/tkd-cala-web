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

      const { data: profile, error } = await supabaseClient
        .from("profiles")
        .select("is_admin")
        .eq("id", data.user.id)
        .single();

      if (error || !profile) {
        setRole(null);
        return;
      }

      setRole(profile.is_admin ? "profesor" : "alumno");
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
