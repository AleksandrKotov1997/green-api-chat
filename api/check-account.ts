import { checkAccount } from "../server/greenApi";
import { createGreenApiResponse, getRequestBody } from "../server/http";

export async function POST(request: Request): Promise<Response> {
  const body = await getRequestBody(request);

  if (
    !body ||
    typeof body.idInstance !== "string" ||
    typeof body.apiTokenInstance !== "string" ||
    typeof body.phoneNumber !== "number"
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

  const response = await checkAccount({
    idInstance: body.idInstance,
    apiTokenInstance: body.apiTokenInstance,
    phoneNumber: body.phoneNumber,
  });

  return createGreenApiResponse(response);
}
