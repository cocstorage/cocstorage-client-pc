import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { storageBoardParamsState } from '@recoil/storageBoards/atoms';

import { Pagination } from 'cocstorage-ui';

import useStorageBoards from '@hooks/react-query/useStorageBoards';

function StorageBoardsPagination() {
  const { query } = useRouter();
  const [params, setParams] = useRecoilState(storageBoardParamsState);

  const { data: { pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {} } =
    useStorageBoards(query.path as string, params, {
      keepPreviousData: true
    });

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

  return (
    <Pagination
      count={totalPages * perPage}
      page={currentPage}
      onChange={handleChange}
      customStyle={{ margin: '50px auto' }}
    />
  );
}

export default StorageBoardsPagination;
