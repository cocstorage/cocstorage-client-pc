import { useRecoilState } from 'recoil';

import { storageBoardsParamsState } from '@recoil/boards/atoms';

import { Pagination } from 'cocstorage-ui';

import useStorageBoards from '@hooks/react-query/useStorageBoards';

interface StorageBoardGridPagination {
  path: string;
}

function StorageBoardGridPagination({ path }: StorageBoardGridPagination) {
  const [params, setParams] = useRecoilState(storageBoardsParamsState);

  const { data: { pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {} } =
    useStorageBoards(path, params, {
      keepPreviousData: true
    });

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

  return <Pagination count={totalPages * perPage} page={currentPage} onChange={handleChange} />;
}

export default StorageBoardGridPagination;
