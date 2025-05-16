"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useConfirmNavigation = (shouldWarn: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (!shouldWarn) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.prefetch("/"); // ou qualquer página de destino comum

    // como não conseguimos interromper `router.push`, preferimos alertar antes em botões/link críticos

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldWarn]);
};

export default useConfirmNavigation;
