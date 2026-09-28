import { sendMessage } from "../server/greenApi";
import { createGreenApiResponse, getRequestBody } from "../server/http";

export async function POST(request: Request): Promise<Response> {
  const body = await getRequestBody(request);

  if (
    !body ||
    typeof body.idInstance !== "string" ||
    typeof body.apiTokenInstance !== "string" ||
    typeof body.chatId !== "string" ||
    typeof body.message !== "string"
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

  const response = await sendMessage({
    idInstance: body.idInstance,
    apiTokenInstance: body.apiTokenInstance,
    chatId: body.chatId,
    message: body.message,
  });

  return createGreenApiResponse(response);
}
