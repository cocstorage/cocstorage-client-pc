import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Flexbox, Pagination } from '@cocstorage/ui';
import { useRecoilState } from 'recoil';

import { Message, NewStorageBoardCard } from '@components/UI/molecules';
import NewStorageBoardCardSkeleton from '@components/UI/molecules/NewStorageBoardCard/NewStorageBoardCardSkeleton';
import useStorageBoards from '@hooks/query/useStorageBoards';
import { storageBoardsParamsStateFamily } from '@recoil/pages/storageBoards/atoms';

interface StorageBoardListProps {
  ssr?: boolean;
}

function StorageBoardList({ ssr }: StorageBoardListProps) {
  const router = useRouter();
  const { path } = router.query;

  const [isMounted, setIsMounted] = useState(ssr);

  const [{ params }, setParams] = useRecoilState(storageBoardsParamsStateFamily(String(path)));

  const {
    data: { boards = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {},
    isLoading
  } = useStorageBoards(String(path), params, {
    keepPreviousData: true
  });

  const handleChange = (value: number) =>
    setParams((prevParams) => ({
      path: prevParams.path,
      params: {
        ...prevParams.params,
        page: value
      }
    }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted && !isLoading && !boards.length)
    return (
      <Message title="아직 게시글이 없네요!" hideButton customStyle={{ margin: '50px auto' }} />
    );

  return (
    <>
      <Flexbox direction="vertical">
        {(!isMounted || isLoading) &&
          Array.from({ length: 20 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <NewStorageBoardCardSkeleton key={`storage-board-skeleton-${index}`} />
          ))}
        {isMounted &&
          !isLoading &&
          boards.map((storageBoard) => (
            <NewStorageBoardCard
              key={`storage-board-${storageBoard.id}`}
              storageBoard={storageBoard}
            />
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

export default StorageBoardList;
