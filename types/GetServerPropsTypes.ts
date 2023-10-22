import { IncomingMessage, ServerResponse } from "http";

export type ReqType = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};

export type ResType = ServerResponse<IncomingMessage>;

