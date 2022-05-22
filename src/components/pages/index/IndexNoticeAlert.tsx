import { useQuery } from 'react-query';

import { Alert, Icon, IconButton } from 'cocstorage-ui';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/react-query';

function IndexNoticeAlert() {
  const { data: { notices = [] } = {} } = useQuery(queryKeys.notices.notices, fetchNotices);

  if (!notices.length) return null;

  return (
    <Alert
      severity="info"
      action={
        <IconButton>
          <Icon name="CaretRightOutlined" />
        </IconButton>
      }
    >
      {notices[notices.length - 1].subject}
    </Alert>
  );
}

export default IndexNoticeAlert;
