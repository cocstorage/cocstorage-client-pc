import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import { storageBoardsParamsStateFamily } from '@recoil/pages/storageBoards/atoms';

import { Box, Flexbox, Icon, Skeleton, Typography, useTheme } from 'cocstorage-ui';

import useStorageBoards from '@hooks/query/useStorageBoards';

import Message from '../../UI/molecules/Message';

function StorageBoardsBestList() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      mode,
      palette: { text, background }
    }
  } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  const { params } = useRecoilValue(storageBoardsParamsStateFamily(String(path)));

  const { data: { boards = [] } = {}, isLoading } = useStorageBoards(
    String(path),
    { ...params, orderBy: 'popular' },
    {
      keepPreviousData: true
    }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box
      customStyle={{
        padding: '12px 20px 20px',
        backgroundColor: background.fg1,
        borderRadius: 8
      }}
    >
      <Typography
        variant="p1"
        fontWeight="bold"
        customStyle={{
          marginBottom: 16,
          padding: '8px 0'
        }}
      >
        이 게시판의 베스트
      </Typography>
      <Flexbox direction="vertical" gap={16}>
        {(!isMounted || isLoading) &&
          Array.from({ length: 5 }).map((_, index) => (
            <Flexbox
              // eslint-disable-next-line react/no-array-index-key
              key={`storage-boards-best-skeleton-${index}`}
              alignment="center"
              gap={8}
              customStyle={{
                cursor: 'pointer'
              }}
            >
              <Skeleton
                width="100%"
                height={17.5}
                round={6}
                disableAspectRatio
                customStyle={{
                  flex: 1
                }}
              />
              <Skeleton width={42} height={17.5} round={6} disableAspectRatio />
            </Flexbox>
          ))}
        {isMounted &&
          !isLoading &&
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
      {isMounted && !isLoading && !boards.length && (
        <Message title="아직 게시글이 없네요!" hideButton />
      )}
    </Box>
  );
}

export default StorageBoardsBestList;
