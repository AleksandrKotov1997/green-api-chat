import { receiveNotification } from "../server/greenApi";
import { createGreenApiResponse, getRequestBody } from "../server/http";

export async function POST(request: Request): Promise<Response> {
  const body = await getRequestBody(request);

  if (
    !body ||
    typeof body.idInstance !== "string" ||
    typeof body.apiTokenInstance !== "string"
  ) {
    return Response.json(
      {
        message: "Invalid request data.",
      },
      {
        status: 400,
      },
    );
  }

  const response = await receiveNotification({
    idInstance: body.idInstance,
    apiTokenInstance: body.apiTokenInstance,
    signal: request.signal,
  });

  return createGreenApiResponse(response, {
    emptySuccessAsNull: true,
  });
}
