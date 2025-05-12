"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useConfirmNavigation = (shouldWarn: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (!shouldWarn) return;

    const handleRouteChange = (url: string) => {
      const confirmLeave = window.confirm(
        "Você tem alterações não salvas. Deseja sair da página?"
      );
      if (!confirmLeave) {
        // impedir navegação forçada (não possível diretamente com next/navigation)
        // mas podemos forçar reload na mesma rota
        router.push(window.location.pathname);
      }
    };

    // next/navigation não tem 'events' como next/router, então precisamos workaround
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
