import React from 'react';

import { Alert, Icon } from 'cocstorage-ui';

function StorageBoardsNoticeAlert() {
  return (
    <Alert severity="normal" icon={<Icon name="PinOutlined" width={16} height={16} />}>
      게시글을 작성할 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
    </Alert>
  );
}

export default StorageBoardsNoticeAlert;
