import React, { useEffect, useState, useRef, useCallback } from 'react';
import { QueryClient, dehydrate, useQuery } from 'react-query';

import { Grid, Alert, Icon, IconButton } from 'cocstorage-ui';

import { Header } from '@components/UI/molecules';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { fetchPopularStorageBoards, fetchLatestStorageBoards } from '@api/v1/storage-boards';
import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { fetchNotices } from '@api/v1/notices';

import {
  IndexPopularStorages,
  IndexBestWorstStorageBoards,
  IndexIssueKeywordRankInfo,
  IndexLatestStorageBoards
} from '@components/pages/index';

import queryKeys from '@constants/react-query';

function Index() {
  const { data: popularStorageBoards = [] } = useQuery(
    queryKeys.storageBoards.popularStorageBoards,
    fetchPopularStorageBoards
  );
  const { data: latestStorageBoards = [] } = useQuery(
    queryKeys.storageBoards.latestStorageBoards,
    fetchLatestStorageBoards
  );
  const { data: { ranks = [] } = {} } = useQuery(
    queryKeys.issueKeywords.issueKeywordRank,
    fetchIssueKeywordRank
  );
  const { data: { notices = [] } = {} } = useQuery(queryKeys.notices.notices, fetchNotices);

  const [fixed, setFixed] = useState<boolean>(false);

  const gridRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (gridRef.current) {
      const { top = 0 } = gridRef.current?.getBoundingClientRect() || {};
      const { scrollY } = window;
      const { scrollTop } = document.documentElement;

      if (top + scrollY < scrollTop && !fixed) {
        setFixed(true);
      } else if (scrollY <= 0 && fixed) {
        setFixed(false);
      }
    }
  }, [fixed]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <GeneralTemplate header={<Header fixed={fixed} />}>
      <Grid container columnGap={20}>
        <Grid item lgHidden>
          <IndexPopularStorages />
        </Grid>
        <Grid ref={gridRef} item auto>
          {notices.length > 0 && (
            <Alert
              severity="info"
              action={
                <IconButton rotation={180} aria-label="Notice Route">
                  <Icon name="CaretLeftOutlined" />
                </IconButton>
              }
            >
              {notices[notices.length - 1].subject}
            </Alert>
          )}
          <IndexBestWorstStorageBoards popularStorageBoards={popularStorageBoards} />
          <IndexLatestStorageBoards latestStorageBoards={latestStorageBoards} />
        </Grid>
        <Grid item>
          <IndexIssueKeywordRankInfo ranks={ranks} />
        </Grid>
      </Grid>
    </GeneralTemplate>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.storageBoards.popularStorageBoards,
    fetchPopularStorageBoards
  );
  await queryClient.prefetchQuery(
    queryKeys.storageBoards.latestStorageBoards,
    fetchLatestStorageBoards
  );
  await queryClient.prefetchQuery(queryKeys.issueKeywords.issueKeywordRank, fetchIssueKeywordRank);
  await queryClient.prefetchQuery(queryKeys.notices.notices, fetchNotices);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Index;
