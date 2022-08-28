import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { Flexbox, Grid, Typography } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

import { fetchLatestStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function IndexLatestStorageBoardGrid() {
  const { data: { boards = [] } = {}, isLoading } = useQuery(
    queryKeys.storageBoards.latestStorageBoards,
    fetchLatestStorageBoards
  );

  return (
    <Flexbox direction="vertical" gap={18} customStyle={{ marginTop: 30 }}>
      <Typography variant="h4" fontWeight="bold">
        최신 게시글
      </Typography>
      <Grid container columnGap={20} rowGap={20}>
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={`latest-storage-board-skeleton-${index}`} item xs={1} sm={1} md={1} lg={2}>
              <StorageBoardCardSkeleton />
            </Grid>
          ))}
        {!isLoading &&
          boards.map((storageBoard) => (
            <Grid key={`latest-storage-board-${storageBoard.id}`} item xs={1} sm={1} md={1} lg={2}>
              <Link href={`/storages/${storageBoard.storage.path}/${storageBoard.id}`}>
                <a>
                  <StorageBoardCard storageBoard={storageBoard} inStorage={false} />
                </a>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Flexbox>
  );
}

export default IndexLatestStorageBoardGrid;
