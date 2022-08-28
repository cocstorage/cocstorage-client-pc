import { atom } from 'recoil';

import { FetchNoticeCommentsParams } from '@api/v1/notice-comments';

export const noticeCommentsParamsDefault: FetchNoticeCommentsParams = {
  page: 0,
  per: 10,
  orderBy: 'old'
};

export const noticeCommentsParamsState = atom({
  key: 'notice/commentsParamsState',
  default: noticeCommentsParamsDefault
});
