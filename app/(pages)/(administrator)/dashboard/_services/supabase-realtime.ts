"use client";
import { createSupabaseClient } from "@/app/_utils/supabase/client";
import { useEffect } from "react";

const supabase = createSupabaseClient();

export function useProductRealtime(callback: (payload: any) => void) {
  useEffect(() => {
    const channel = supabase
      .channel("realtime-products")
      .on(
        "postgres_changes",
        {
          event: "*", // escuta INSERT, UPDATE, DELETE
          schema: "public",
          table: "product",
        },
        (payload) => {
          console.log("📡 Evento recebido:", payload);
          callback(payload); // você decide como lidar com cada evento
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [callback]);
}
