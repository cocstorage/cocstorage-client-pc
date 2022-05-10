import Link from 'next/link';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import { storageBoardParamsState } from '@recoil/storageBoards/atoms';

import { Grid } from 'cocstorage-ui';

import { StorageBoardCard } from '@components/UI/molecules';

import useStorageBoards from '@hooks/react-query/useStorageBoards';

function StorageBoardsGrid() {
  const { query } = useRouter();
  const params = useRecoilValue(storageBoardParamsState);

  const { data: { boards = [] } = {} } = useStorageBoards(query.path as string, params, {
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

export default StorageBoardsGrid;
