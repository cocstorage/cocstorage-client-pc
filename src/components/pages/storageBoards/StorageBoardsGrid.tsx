import React from 'react';
import { useQuery } from 'react-query';

import { Grid } from 'cocstorage-ui';

import { StorageBoardCard } from '@components/UI/molecules';

import { fetchLatestStorageBoards } from '@api/v1/storage-boards';
import queryKeys from '@constants/react-query';

function StorageBoardsGrid() {
  const { data: latestStorageBoards = [] } = useQuery(
    queryKeys.storageBoards.latestStorageBoards,
    fetchLatestStorageBoards
  );

  return (
    <Grid container columnGap={20} rowGap={20}>
      {latestStorageBoards.map((storageBoard) => (
        <Grid key={`latest-storage-board-${storageBoard.id}`} item xs={1} sm={1} md={1} lg={2}>
          <StorageBoardCard storageBoard={storageBoard} />
        </Grid>
      ))}
    </Grid>
  );
}

export default StorageBoardsGrid;
