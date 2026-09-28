const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const getRequestBody = async (
  request: Request,
): Promise<Record<string, unknown> | null> => {
  try {
    const body: unknown = await request.json();

    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
};
