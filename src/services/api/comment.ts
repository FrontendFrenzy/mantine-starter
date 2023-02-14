import { request } from '../client';
import { SAVE_COMMENT } from '../config';

type TComment = { comment: string; req_url: string };

export const comment = {
  create: (data: TComment) => request.post<TComment>(SAVE_COMMENT, data),
  //   edit: (id: number) => {},
};

// just an example how u call apis
