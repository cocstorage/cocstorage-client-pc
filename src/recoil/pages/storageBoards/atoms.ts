import { atom, atomFamily } from 'recoil';

import LocalStorage from '@library/localStorage';

import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

import localStorageKeys from '@constants/localStorageKeys';

export const storageBoardsParamsDefault: FetchStorageBoardsParams = {
  subject: null,
  content: null,
  nickname: null,
  page: 1,
  per: 20,
  orderBy: 'latest'
};

export const storageBoardsParamsStateFamily = atomFamily<
  { path: string; params: FetchStorageBoardsParams },
  string
>({
  key: 'storageBoards/paramsStateFamily',
  default: (path) => ({
    path,
    params: storageBoardsParamsDefault
  })
});

export const storageBoardsDialogDisablePathsState = atom<string[]>({
  key: 'storageBoards/dialogDisablePathsState',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      const disableDialogPaths =
        LocalStorage.get<string[]>(localStorageKeys.storageBoardsLastNoticeDisableDialogPaths) ||
        [];

      setSelf(disableDialogPaths);

      onSet((newValue, _, isReset) => {
        if (isReset) {
          LocalStorage.remove(localStorageKeys.storageBoardsLastNoticeDisableDialogPaths);
        } else {
          LocalStorage.set(localStorageKeys.storageBoardsLastNoticeDisableDialogPaths, newValue);
        }
      });
    }
  ]
});
