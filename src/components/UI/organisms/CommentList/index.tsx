import { useRecoilValue } from 'recoil';

import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import Comment from '@components/UI/organisms/Comment';

import useStorage from '@hooks/react-query/useStorage';
import useStorageBoard from '@hooks/react-query/useStorageBoard';
import useStorageBoardComments from '@hooks/react-query/useStorageBoardComments';

type ConditionalCommentListProps =
  | {
      type: 'storageBoard';
      path: string;
      id: number | string;
    }
  | {
      type: 'notice';
      path: never;
      id: number | string;
    };

function CommentList({ path, id }: ConditionalCommentListProps) {
  const {
    theme: { palette }
  } = useTheme();
  const params = useRecoilValue(storageBoardCommentsParamsState);

  const { data: { id: storageId } = {} } = useStorage(path);

  const { data: { commentTotalCount = 0 } = {} } = useStorageBoard(storageId as number, id);

  const { data: { comments = [] } = {} } = useStorageBoardComments(
    storageId as number,
    id,
    params,
    {
      enabled: !!storageId,
      keepPreviousData: true
    }
  );

  return (
    <>
      <Flexbox gap={4}>
        <Icon name="CommentOutlined" width={20} height={20} />
        <Flexbox gap={6}>
          <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
            댓글
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={700}
            lineHeight="20px"
            customStyle={{
              color: palette.primary.main
            }}
          >
            {commentTotalCount.toLocaleString()}
          </Typography>
        </Flexbox>
      </Flexbox>
      <Flexbox gap={18} direction="vertical">
        {comments.map((comment) => (
          <Comment key={`comment-${comment.id}`} comment={comment} />
        ))}
      </Flexbox>
    </>
  );
}

export default CommentList;
