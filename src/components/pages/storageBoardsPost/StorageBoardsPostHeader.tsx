import { useRouter } from 'next/router';

import { Avatar, Flexbox, IconButton, Tag, Typography } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import useStorage from '@hooks/query/useStorage';

function StorageBoardsPostHeader() {
  const router = useRouter();
  const { query } = router;

  const { data: { path, name, avatarUrl } = {} } = useStorage(String(query.path), {
    enabled: !!query.path
  });

  const handleClick = () => router.push(`/storages/${path}`);

  const handleClickBack = () => router.back();

  return (
    <Flexbox
      component="header"
      alignment="center"
      customStyle={{
        width: '100%',
        padding: '32px 20px'
      }}
    >
      <IconButton onClick={handleClickBack}>
        <Icon name="CaretSemiLeftOutlined" />
      </IconButton>
      <Flexbox
        alignment="center"
        gap={10}
        customStyle={{
          marginLeft: 6
        }}
      >
        <Flexbox
          alignment="center"
          gap={10}
          onClick={handleClick}
          customStyle={{
            cursor: 'pointer'
          }}
        >
          <Avatar width={24} height={24} src={avatarUrl || ''} alt="Logo Img" round={4} />
          <Typography variant="h3" fontWeight="bold">
            {name}
          </Typography>
        </Flexbox>
        <Tag variant="semiAccent">글쓰기 BETA</Tag>
      </Flexbox>
    </Flexbox>
  );
}

export default StorageBoardsPostHeader;
