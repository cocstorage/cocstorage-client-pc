import { useRecoilState } from 'recoil';

import { storageBoardCommentsParamsState } from '@recoil/storageBoard/atoms';

import { Pagination } from 'cocstorage-ui';

import useStorage from '@hooks/react-query/useStorage';
import useStorageBoardComments from '@hooks/react-query/useStorageBoardComments';

interface CommentListPaginationProps {
  path: string;
  id: number;
}

function CommentListPagination({ path, id }: CommentListPaginationProps) {
  const [params, setParams] = useRecoilState(storageBoardCommentsParamsState);

  const { data: { id: storageId } = {} } = useStorage(path);

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
