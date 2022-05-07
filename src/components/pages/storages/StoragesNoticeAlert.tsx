import React from 'react';

import { Alert, Icon } from 'cocstorage-ui';

function IndexNoticeAlert() {
  return (
    <Alert severity="normal" icon={<Icon name="BulbOutlined" />}>
      게시판을 만들 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
    </Alert>
  );
}

export default IndexNoticeAlert;
