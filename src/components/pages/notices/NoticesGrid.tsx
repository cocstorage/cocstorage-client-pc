import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { noticesParamsState } from '@recoil/notices/atoms';

import { Flexbox, Grid, Pagination } from 'cocstorage-ui';

import { NoticeCard } from '@components/UI/molecules';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function NoticesGrid() {
  const [params, setParams] = useRecoilState(noticesParamsState);

  const {
    data: { notices = [], pagination: { totalPages = 1, perPage = 20, currentPage = 1 } = {} } = {}
  } = useQuery(queryKeys.notices.noticesWithParams(params), () => fetchNotices(params), {
    keepPreviousData: true
  });

  const handleChange = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

  return (
    <>
      <Grid component="section" container columnGap={20} rowGap={14}>
        {notices.map((notice) => (
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
