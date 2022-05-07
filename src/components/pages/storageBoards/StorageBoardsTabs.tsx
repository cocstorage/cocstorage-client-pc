import React from 'react';

import { Tabs, Tab } from 'cocstorage-ui';

function StorageBoardsTabs() {
  return (
    <Tabs onChange={() => console.log('onChange')} value={1}>
      <Tab text="최신" value={1} />
      <Tab text="베스트" value={2} />
      <Tab text="워스트" value={3} />
    </Tabs>
  );
}

export default StorageBoardsTabs;
