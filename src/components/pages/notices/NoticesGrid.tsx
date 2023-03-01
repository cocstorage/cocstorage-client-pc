import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { noticesParamsState } from '@recoil/pages/notices/atoms';

import { Flexbox, Grid, Pagination } from 'cocstorage-ui';

import { Message, NoticeCard } from '@components/UI/molecules';
import NoticeCardSkeleton from '@components/UI/molecules/NoticeCard/NoticeCardSkeleton';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function NoticesGrid() {
  const [params, setParams] = useRecoilState(noticesParamsState);

  const {
    data: { notices = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {},
    isLoading
  } = useQuery(queryKeys.notices.noticesWithParams(params), () => fetchNotices(params), {
    keepPreviousData: true
  });

  const handleChange = (value: number) =>
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));

  if (!isLoading && !notices.length) {
    return (
      <Message title="새로운 소식을 준비 중이에요!" hideButton customStyle={{ margin: '50px 0' }} />
    );
  }

  return (
    <>
      <Grid component="section" container columnGap={20} rowGap={14}>
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={`notice-skeleton-${index}`} item xs={1} sm={1} md={1} lg={2}>
              <NoticeCardSkeleton />
            </Grid>
          ))}
        {!isLoading &&
          notices.map((notice) => (
            <Grid key={`notice-${notice.id}`} item xs={1} sm={1} md={1} lg={2}>
              <NoticeCard notice={notice} />
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

export default NoticesGrid;
