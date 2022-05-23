import Link from 'next/link';

import { useQuery } from 'react-query';

import { useRecoilState } from 'recoil';

import { worstParamsState } from '@recoil/worst/atoms';

import { Flexbox, Pagination } from 'cocstorage-ui';

import { StorageBoardCard } from '@components/UI/molecules';

import { fetchWorstStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

function WorstStorageBoardList() {
  const [params, setParams] = useRecoilState(worstParamsState);

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {}
  } = useQuery(
    queryKeys.storageBoards.worstStorageBoardsWithParams(params),
    () => fetchWorstStorageBoards(params),
    {
      keepPreviousData: true
    }
  );

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

  return (
    <>
      <Flexbox component="section" direction="vertical" gap={10} customStyle={{ marginTop: 30 }}>
        {boards.map((storageBoard, index) => (
          <Link
            key={`worst-storage-board-${storageBoard.id}`}
            href={`/storages/${storageBoard.storage.path}/${storageBoard.id}`}
          >
            <a>
              <StorageBoardCard
                variant={index < 3 && params.page === 1 ? 'emphasize' : 'normal'}
                storageBoard={storageBoard}
              />
            </a>
          </Link>
        ))}
      </Flexbox>
      <Flexbox
        component="section"
        justifyContent="center"
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

export default WorstStorageBoardList;