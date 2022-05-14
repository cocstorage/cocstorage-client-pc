import { HTMLAttributes } from 'react';

import Link from 'next/link';

import { useRecoilValue } from 'recoil';

import { storageBoardsParamsState } from '@recoil/boards/atoms';

import { Grid } from 'cocstorage-ui';

import { StorageBoardCard } from '@components/UI/molecules';

import useStorageBoards from '@hooks/react-query/useStorageBoards';

interface StorageBoardGridProps extends HTMLAttributes<HTMLAttributes<HTMLDivElement>> {
  path: string;
}

function StorageBoardGrid({ path }: StorageBoardGridProps) {
  const params = useRecoilValue(storageBoardsParamsState);

  const { data: { boards = [] } = {} } = useStorageBoards(path, params, {
    keepPreviousData: true
  });

  return (
    <Grid container columnGap={20} rowGap={20}>
      {boards.map((storageBoard) => (
        <Grid key={`storage-board-${storageBoard.id}`} item xs={1} sm={1} md={1} lg={2}>
          <Link href={`/storages/${storageBoard.storage.path}/${storageBoard.id}`}>
            <a>
              <StorageBoardCard badgeVariant={params.orderBy} storageBoard={storageBoard} />
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default StorageBoardGrid;
