import { NextApiRequest, NextApiResponse } from "next";

export interface IGetServerProps<T = unknown> {
  params: T;
  req: NextApiRequest;
  res: NextApiResponse;
}
