import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { Flexbox, Skeleton, Typography, useTheme } from 'cocstorage-ui';

import { fetchIndexNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function StorageBoardsNotice() {
  const {
    theme: {
      palette: { box }
    }
  } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const { data: { notices = [] } = {}, isLoading } = useQuery(
    queryKeys.notices.indexNotice,
    fetchIndexNotice
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted && !isLoading && !notices.length) return null;

  if (!isMounted || isLoading) {
    return (
      <Flexbox
        alignment="center"
        gap={8}
        customStyle={{
          padding: '20px 0',
          borderBottom: `1px solid ${box.stroked.normal}`
        }}
      >
        <Skeleton width={30} height={21} disableAspectRatio />
        <Skeleton width="100%" maxWidth={300} height={18} round={8} disableAspectRatio />
      </Flexbox>
    );
  }

  return (
    <Link href={`/notices/${notices[0].id}`}>
      <Flexbox
        alignment="center"
        gap={8}
        customStyle={{
          padding: '20px 0',
          borderBottom: `1px solid ${box.stroked.normal}`
        }}
      >
        <Typography
          variant="s1"
          fontWeight="medium"
          customStyle={{
            padding: '2px 4px',
            border: `1px solid ${box.stroked.normal}`
          }}
        >
          공지
        </Typography>
        <Typography fontWeight="medium" noWrap>
          {notices[0].subject}
        </Typography>
      </Flexbox>
    </Link>
  );
}

export default StorageBoardsNotice;
