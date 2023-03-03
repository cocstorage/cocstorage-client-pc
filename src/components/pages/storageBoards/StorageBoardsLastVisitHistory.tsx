import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { storageBoardsLastVisitHistoryState } from '@recoil/pages/storageBoards/atoms';

import { Flexbox, Typography } from 'cocstorage-ui';

import StorageCard from '@components/UI/molecules/StorageCard';

import useStorage from '@hooks/query/useStorage';

function StorageBoardsLastVisitHistory() {
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
    <Flexbox
      direction="vertical"
      gap={20}
      customStyle={{
        position: 'sticky',
        top: 69,
        width: 140
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        최근 방문
      </Typography>
      <Flexbox direction="vertical" gap={16}>
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

export default StorageBoardsLastVisitHistory;
