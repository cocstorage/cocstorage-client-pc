import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { CustomStyle, Flexbox, Typography } from '@cocstorage/ui';
import { useRecoilState } from 'recoil';

import StorageCard from '@components/UI/molecules/StorageCard';
import StorageCardSkeleton from '@components/UI/molecules/StorageCard/StorageCardSkeleton';
import useStorage from '@hooks/query/useStorage';
import { storageBoardsLastVisitHistoryState } from '@recoil/pages/storageBoards/atoms';

interface LastVisitStorageHistoryProps {
  customStyle?: CustomStyle;
}

function LastVisitStorageHistory({ customStyle }: LastVisitStorageHistoryProps) {
  const router = useRouter();
  const { path } = router.query;

  const [isMounted, setIsMounted] = useState(false);

  const [lastVisitHistory, setStorageBoardsLastVisitHistoryState] = useRecoilState(
    storageBoardsLastVisitHistoryState
  );

  const { data: { name, avatarUrl } = {}, isLoading } = useStorage(String(path));

  useEffect(() => {
    if (!isLoading && name && path) {
      setStorageBoardsLastVisitHistoryState((prevState) => {
        const newHistory = [...prevState];
        if (prevState.length >= 5) {
          newHistory.shift();
        }
        return newHistory
          .concat({
            src: avatarUrl || '',
            name,
            path: String(path)
          })
          .reverse();
      });
    }
  }, [setStorageBoardsLastVisitHistoryState, isLoading, avatarUrl, name, path]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Flexbox direction="vertical" gap={20} css={customStyle}>
      <Typography variant="h4" fontWeight="bold">
        최근 방문
      </Typography>
      <Flexbox direction="vertical" gap={16}>
        {!isMounted &&
          Array.from({ length: 5 }).map((_, index) => (
            <StorageCardSkeleton
              // eslint-disable-next-line react/no-array-index-key
              key={`storage-boards-last-visit-history-skeleton-${path}-${index}`}
              size="small"
            />
          ))}
        {isMounted &&
          lastVisitHistory.map(({ src, path: historyPath, name: historyName }, index) => (
            <StorageCard
              // eslint-disable-next-line react/no-array-index-key
              key={`storage-boards-last-visit-history-${path}-${index}`}
              size="small"
              src={src}
              path={historyPath}
              name={historyName}
            />
          ))}
      </Flexbox>
    </Flexbox>
  );
}

export default LastVisitStorageHistory;
