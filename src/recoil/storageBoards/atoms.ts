import { atom } from 'recoil';

import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

export const storageBoardParamsDefault: FetchStorageBoardsParams = {
  subject: null,
  content: null,
  nickname: null,
  page: 1,
  per: 20,
  orderBy: 'latest'
};

export const storageBoardParamsState = atom({
  key: 'storageBoardParams',
  default: storageBoardParamsDefault
});
