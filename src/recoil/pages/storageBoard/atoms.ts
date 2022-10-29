import { atom } from 'recoil';

import { FetchStorageBoardCommentsParams } from '@api/v1/storage-board-comments';

export const storageBoardCommentsParamsDefault: FetchStorageBoardCommentsParams = {
  page: 0,
  per: 10,
  orderBy: 'old'
};

export const storageBoardCommentsParamsState = atom({
  key: 'storageBoard/commentsParamsState',
  default: storageBoardCommentsParamsDefault
});
