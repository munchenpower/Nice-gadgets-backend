import { Response, Request } from 'express';

export type Controller = (req: Request, res: Response) => void;

export interface Description {
  title: string;
  text: string[];
}
