import { atom } from 'recoil';

import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

export const storageBoardsParamsDefault: FetchStorageBoardsParams = {
  subject: null,
  content: null,
  nickname: null,
  page: 1,
  per: 20,
  orderBy: 'latest'
};

export const storageBoardsParamsState = atom({
  key: 'storageBoardsParams',
  default: storageBoardsParamsDefault
});
