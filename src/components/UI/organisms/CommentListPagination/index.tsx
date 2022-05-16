import { useRecoilState } from 'recoil';

import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Pagination } from 'cocstorage-ui';

import { useStorageBoardData } from '@hooks/react-query/useStorageBoard';
import useStorageBoardComments from '@hooks/react-query/useStorageBoardComments';

interface CommentListPaginationProps {
  id: number;
}

function CommentListPagination({ id }: CommentListPaginationProps) {
  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);

  const { storage: { id: storageId = 0 } = {} } = useStorageBoardData(id) || {};

  const { data: { pagination: { totalPages = 1, perPage = 10, currentPage = 1 } = {} } = {} } =
    useStorageBoardComments(storageId as number, id, params, {
      enabled: params.page !== 0,
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
      rowPerPage={perPage}
      onChange={handleChange}
    />
  );
}

export default CommentListPagination;
