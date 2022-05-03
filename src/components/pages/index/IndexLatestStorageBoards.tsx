import React, { memo, HTMLAttributes } from 'react';

import { Flexbox, Grid, Typography, GenericComponentProps } from 'cocstorage-ui';

import { StorageBoardCard } from '@components/UI/molecules';
import { StorageBoard } from '@dto/storage-boards';

interface LatestStorageBoardsProps
  extends Omit<
    GenericComponentProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'customStyle'
  > {
  latestStorageBoards: StorageBoard[];
}

function IndexLatestStorageBoards({ componentRef, latestStorageBoards }: LatestStorageBoardsProps) {
  return (
    <Flexbox
      componentRef={componentRef}
      direction="vertical"
      gap={18}
      customStyle={{ marginTop: 30 }}
    >
      <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
        최신 게시글
      </Typography>
      <Grid container columnGap={20} rowGap={20}>
        {latestStorageBoards.map((storageBoard) => (
          <Grid key={`latest-storage-board-${storageBoard.id}`} item xs={1} sm={1} md={2}>
            <StorageBoardCard storageBoard={storageBoard} />
          </Grid>
        ))}
      </Grid>
    </Flexbox>
  );
}

export default memo(IndexLatestStorageBoards);
