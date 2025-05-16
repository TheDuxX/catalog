export async function fetchCategory() {
  const category = await fetch("/api/category");
  if (!category.ok) throw new Error("Erro ao buscar categoria");
  return category.json();
}

export async function fetchMark() {
  const mark = await fetch("/api/mark");
  if (!mark.ok) throw new Error("Erro ao buscar marca");
  return mark.json();
}
