import { IncomingMessage, ServerResponse } from "http";

export type ReqType = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};

export type ResType = ServerResponse<IncomingMessage>;

export interface IGetServerProps<T = unknown> {
  params: T;
  req: ReqType;
  res: ResType;
}
