import { FetchStorageBoardCommentsParams } from '@api/v1/storage-board-comments';
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
  worstStorageBoards: ['worstStorageBoards'],
  storageBoardsByParams: (params: FetchStorageBoardsParams) => ['storageBoards', params],
  storageBoardById: (id: number) => ['storageBoard', id]
};

const storageBoardComments = {
  storageBoardCommentsByIdWithParams: (id: number, params: FetchStorageBoardCommentsParams) => [
    'storageBoardComments',
    id,
    params
  ]
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
  storageBoardComments,
  issueKeywords,
  notices
};

export default queryKeys;
