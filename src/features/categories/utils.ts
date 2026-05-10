/* slug generator */
export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function safeParseJSON(res: Response) {
  const text = await res.text()

  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}