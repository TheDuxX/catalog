export async function fetchCategoryMark() {
  const category = await fetch("/api/category");
  const mark = await fetch("/api/mark");
  if (!category.ok || !mark.ok)
    throw new Error("Erro ao buscar categorias e marcas");
  return { category: await category.json(), mark: await mark.json() };
}
