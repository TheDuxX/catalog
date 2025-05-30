"use client";

import { useEffect } from "react";
import Cookies from "js-cookie"; // npm install js-cookie

const VISIT_COOKIE_NAME = "site_visited_today";
const VISIT_COOKIE_EXPIRY_HOURS = 24; // Contar uma visita a cada 24 horas

export function VisitTracker() {
  useEffect(() => {
    // Verifica se o cookie de visita já existe
    const hasVisitedToday = Cookies.get(VISIT_COOKIE_NAME);

    if (!hasVisitedToday) {
      // Se não visitou hoje, faz a chamada para a API
      fetch("/api/activity/visits") // Use a URL da sua API de visitas
        .then((response) => {
          if (response.ok) {
            // Define o cookie para evitar contagens duplicadas no mesmo dia
            Cookies.set(VISIT_COOKIE_NAME, "true", {
              expires: VISIT_COOKIE_EXPIRY_HOURS / 24,
            }); // expira em 24 horas
            console.log("Visita única contabilizada!");
          } else {
            console.error("Falha ao contabilizar visita:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Erro na requisição para contabilizar visita:", error);
        });
    }
  }, []); // O array vazio garante que o efeito roda apenas uma vez no mount

  return null; // Este componente não renderiza nada visível
}
