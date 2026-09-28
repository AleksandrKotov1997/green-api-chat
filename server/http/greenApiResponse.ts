type Options = {
  emptySuccessAsNull?: boolean;
};

export const createGreenApiResponse = async (
  response: Response,
  options?: Options,
): Promise<Response> => {
  const responseBody = await response.text();

  if (!responseBody.trim()) {
    if (response.ok && options?.emptySuccessAsNull) {
      return Response.json(null);
    }

    return Response.json(
      {
        message: response.ok
          ? "GREEN-API returned an unexpected empty response."
          : "GREEN-API request failed.",
      },
      {
        status: response.ok ? 502 : response.status,
      },
    );
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return new Response(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return Response.json(
    {
      message: "GREEN-API returned an unexpected response.",
    },
    {
      status: response.ok ? 502 : response.status,
    },
  );
};
