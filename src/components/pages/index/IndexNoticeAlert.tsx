import Link from 'next/link';

import { useQuery } from 'react-query';

import { Alert, Icon, IconButton } from 'cocstorage-ui';

import { fetchIndexNotice } from '@api/v1/notices';

import queryKeys from '@constants/react-query';

function IndexNoticeAlert() {
  const { data: { notices = [] } = {} } = useQuery(queryKeys.notices.indexNotice, fetchIndexNotice);

  if (!notices.length) return null;

  return (
    <Link href={`/notices/${notices[0].id}`}>
      <a>
        <Alert
          severity="info"
          action={
            <IconButton>
              <Icon name="CaretRightOutlined" />
            </IconButton>
          }
        >
          {notices[0].subject}
        </Alert>
      </a>
    </Link>
  );
}

export default IndexNoticeAlert;
