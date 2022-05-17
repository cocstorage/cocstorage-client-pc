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
  storageBoardsByIdWithPage: (id: number | string, page: number) => ['storageBoards', id, page],
  storageBoardById: (id: number) => ['storageBoard', id]
};

const storageBoardComments = {
  storageBoardCommentsByIdWithPage: (id: number, page: number) => ['storageBoardComments', id, page]
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
