import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { Alert, Icon, IconButton } from 'cocstorage-ui';

import { fetchIndexNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function IndexNoticeAlert() {
  const { data: { notices = [] } = {} } = useQuery(queryKeys.notices.indexNotice, fetchIndexNotice);

  if (!notices.length) return null;

  return (
    <Link href={`/notices/${notices[0].id}`}>
      <Alert
        severity="info"
        icon={<Icon name="LoudSpeakerOutlined" />}
        action={
          <IconButton>
            <Icon name="CaretRightOutlined" />
          </IconButton>
        }
      >
        {notices[0].subject}
      </Alert>
    </Link>
  );
}

export default IndexNoticeAlert;
