import Link from 'next/link';

import { useRecoilState } from 'recoil';

import { storageBoardsParamsStateFamily } from '@recoil/storageBoards/atoms';

import { Flexbox, Grid, Pagination } from 'cocstorage-ui';

import { Message, StorageBoardCard } from '@components/UI/molecules';

import useStorageBoards from '@hooks/react-query/useStorageBoards';

interface StorageBoardGridProps {
  path: string;
}

function StorageBoardGrid({ path }: StorageBoardGridProps) {
  const [{ params }, setParams] = useRecoilState(storageBoardsParamsStateFamily(path));

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {}
  } = useStorageBoards(path, params, {
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

  if (!boards.length)
    return (
      <Message
        title="아직 등록된 글이 없어요!"
        message="보고 계신 게시판의 첫 글을 작성해 보시는 건 어때요?<br />좋은 시작이 될 것 같아요!"
        hideButton
      />
    );

  return (
    <>
      <Grid component="section" container columnGap={20} rowGap={20}>
        {boards.map((storageBoard) => (
          <Grid key={`storage-board-${storageBoard.id}`} item xs={1} sm={1} md={1} lg={2}>
            <Link href={`/storages/${storageBoard.storage.path}/${storageBoard.id}`}>
              <a>
                <StorageBoardCard storageBoard={storageBoard} />
              </a>
            </Link>
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
