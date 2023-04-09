import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Flexbox, Skeleton, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import { useRecoilValue } from 'recoil';

import { storageBoardsParamsStateFamily } from '@recoil/pages/storageBoards/atoms';

import Message from '@components/UI/molecules/Message';

import useStorageBoards from '@hooks/query/useStorageBoards';

function BestStorageBoardList() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      mode,
      palette: { text, background }
    }
  } = useTheme();

  const { params } = useRecoilValue(storageBoardsParamsStateFamily(String(path)));

  const { data: { boards = [] } = {}, isLoading } = useStorageBoards(
    String(path),
    { ...params, page: 1, orderBy: 'popular' },
    {
      keepPreviousData: true
    }
  );

  return (
    <Box
      customStyle={{
        padding: 20,
        backgroundColor: background.fg1,
        borderRadius: 8
      }}
    >
      <Typography
        variant="p1"
        fontWeight="bold"
        customStyle={{
          marginBottom: 20
        }}
      >
        이 게시판의 베스트
      </Typography>
      <Flexbox direction="vertical" gap={16}>
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <Flexbox
              // eslint-disable-next-line react/no-array-index-key
              key={`storage-boards-best-skeleton-${index}`}
              alignment="center"
              gap={8}
            >
              <Skeleton
                width="100%"
                height={18}
                round={6}
                disableAspectRatio
                customStyle={{
                  flex: 1
                }}
              />
              <Skeleton width={42} height={18} round={6} disableAspectRatio />
            </Flexbox>
          ))}
        {!isLoading &&
          boards.slice(0, 5).map(({ id, subject, thumbUp }) => (
            <Link key={`storage-boards-best-${id}`} href={`/storages/${path}/${id}`}>
              <Flexbox
                alignment="center"
                customStyle={{
                  cursor: 'pointer'
                }}
              >
                <Typography
                  noWrap
                  customStyle={{
                    flex: 1
                  }}
                >
                  {subject}
                </Typography>
                <Flexbox alignment="center" gap={2}>
                  <Icon name="ThumbsUpOutlined" width={16} height={16} color={text[mode].text2} />
                  <Typography>{thumbUp.toLocaleString()}</Typography>
                </Flexbox>
              </Flexbox>
            </Link>
          ))}
      </Flexbox>
      {!isLoading && !boards.length && <Message title="아직 게시글이 없네요!" hideButton />}
    </Box>
  );
}

export default BestStorageBoardList;
