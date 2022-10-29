import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { storageBoardsParamsStateFamily } from '@recoil/pages/storageBoards/atoms';

import { Flexbox, Grid, Pagination } from 'cocstorage-ui';

import { Message, StorageBoardCard } from '@components/UI/molecules';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

import useStorageBoards from '@hooks/query/useStorageBoards';

function StorageBoardGrid() {
  const router = useRouter();
  const { path } = router.query;

  const [{ params }, setParams] = useRecoilState(storageBoardsParamsStateFamily(String(path)));

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {},
    isLoading
  } = useStorageBoards(String(path), params, {
    keepPreviousData: true
  });

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      path: prevParams.path,
      params: {
        ...prevParams.params,
        page: value
      }
    }));
  };

  if (!isLoading && !boards.length)
    return (
      <Message title="아직 게시글이 없네요!" hideButton customStyle={{ margin: '50px auto' }} />
    );

  return (
    <>
      <Grid component="section" container columnGap={20} rowGap={20}>
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={`storage-board-skeleton-${index}`} item xs={1} sm={1} md={1} lg={2}>
              <StorageBoardCardSkeleton />
            </Grid>
          ))}
        {!isLoading &&
          boards.map((storageBoard) => (
            <Grid key={`storage-board-${storageBoard.id}`} item xs={1} sm={1} md={1} lg={2}>
              <StorageBoardCard storageBoard={storageBoard} />
            </Grid>
          ))}
      </Grid>
      <Flexbox
        component="section"
        customStyle={{
          margin: '50px auto'
        }}
      >
        <Pagination
          count={totalPages * perPage}
          page={currentPage}
          rowPerPage={perPage}
          onChange={handleChange}
        />
      </Flexbox>
    </>
  );
}

export default StorageBoardGrid;
