import { useQuery } from 'react-query';

import { Flexbox, Grid, Typography } from 'cocstorage-ui';

import { StorageBoardCard } from '@components/UI/molecules';

import { fetchLatestStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

function IndexLatestStorageBoardGrid() {
  const { data: latestStorageBoards = [] } = useQuery(
    queryKeys.storageBoards.latestStorageBoards,
    fetchLatestStorageBoards
  );

  return (
    <Flexbox direction="vertical" gap={18} customStyle={{ marginTop: 30 }}>
      <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
        최신 게시글
      </Typography>
      <Grid container columnGap={20} rowGap={20}>
        {latestStorageBoards.map((storageBoard) => (
          <Grid key={`latest-storage-board-${storageBoard.id}`} item xs={1} sm={1} md={1} lg={2}>
            <StorageBoardCard storageBoard={storageBoard} inStorage={false} />
          </Grid>
        ))}
      </Grid>
    </Flexbox>
  );
}

export default IndexLatestStorageBoardGrid;
