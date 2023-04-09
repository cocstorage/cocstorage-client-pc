import { useRouter } from 'next/router';

import { Flexbox, IconButton, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

function BestTitle() {
  const router = useRouter();

  const handleClick = () => router.push('/');

  return (
    <Flexbox component="section" gap={8} alignment="center" customStyle={{ marginTop: 20 }}>
      <IconButton onClick={handleClick}>
        <Icon name="CaretSemiLeftOutlined" width={20} height={20} />
      </IconButton>
      <Typography variant="h1" fontWeight="bold">
        베스트 게시글
      </Typography>
    </Flexbox>
  );
}

export default BestTitle;
