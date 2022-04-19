import React from 'react';
import { useQuery } from 'react-query';
import { Button } from 'cocstorage-ui';

// API
import fetchLatestStorageBoards from '@api/v1/storage-boards';

import { StorageBoard } from '@dto/storage-boards';

function Index() {
  const { data: { data = [] } = {} } = useQuery('latest-storage-boards', fetchLatestStorageBoards);

  return (
    <>
      <Button variant="semiAccent">{process.env.API_BASE_URL}</Button>
      {data.map((item: StorageBoard) => (
        <div key={item.id}>
          {item.subject}[{item.commentTotalCount}]
        </div>
      ))}
    </>
  );
}

export default Index;
