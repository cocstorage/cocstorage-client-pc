import React from 'react';

import { Button } from 'cocstorage-ui';

function Index() {
  return <Button variant="accent">{process.env.API_BASE_URL}</Button>;
}

export default Index;
