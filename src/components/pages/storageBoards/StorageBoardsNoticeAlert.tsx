import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { Alert, Icon, Skeleton } from 'cocstorage-ui';

import { fetchIndexNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function StorageBoardsNoticeAlert() {
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
    return <Skeleton width="100%" height={50} round={12} disableAspectRatio />;
  }

  return (
    <Link href={`/notices/${notices[0].id}`}>
      <Alert severity="info" icon={<Icon name="PinOutlined" width={16} height={16} />}>
        {notices[0].subject}
      </Alert>
    </Link>
  );
}

export default StorageBoardsNoticeAlert;
