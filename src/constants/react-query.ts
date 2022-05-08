import { FetchStorageBoardsParams } from '@api/v1/storage-boards';

const storageCategories = {
  storageCategories: ['storageCategories']
};

const storages = {
  storages: ['storages'],
  storageById: (id: number | string) => ['storages', id]
};

const storageBoards = {
  latestStorageBoards: ['latestStorageBoards'],
  popularStorageBoards: ['popularStorageBoards'],
  storageBoardsByParams: (params: FetchStorageBoardsParams) => ['storageBoards', params]
};

const issueKeywords = {
  issueKeywordRank: ['issueKeywordRank']
};

const notices = {
  notices: ['notices']
};

const queryKeys = {
  storageCategories,
  storages,
  storageBoards,
  issueKeywords,
  notices
};

export default queryKeys;
