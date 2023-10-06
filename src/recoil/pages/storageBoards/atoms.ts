import { atom, atomFamily } from 'recoil';

import { FetchStorageBoardsParams } from '@api/v1/storage-boards';
import localStorageKeys from '@constants/localStorageKeys';
import LocalStorage from '@library/localStorage';

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

export const storageBoardsLastVisitHistoryState = atom<
  {
    src: string;
    name: string;
    path: string;
  }[]
>({
  key: 'storageBoards/lastVisitHistoryState',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      const storageBoardsLastVisitHistory = LocalStorage.get<
        { src: string; name: string; path: string }[]
      >(localStorageKeys.storageBoardsLastVisitHistory);

      if (storageBoardsLastVisitHistory) {
        setSelf(storageBoardsLastVisitHistory);
      }

      onSet((newValue, _, isReset) => {
        if (isReset) {
          LocalStorage.remove(localStorageKeys.storageBoardsLastVisitHistory);
        } else {
          LocalStorage.set(localStorageKeys.storageBoardsLastVisitHistory, newValue);
        }
      });
    }
  ]
});
