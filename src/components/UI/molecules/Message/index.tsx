import { HTMLAttributes } from 'react';

import { Button, Flexbox, Icon, Tag, Typography } from 'cocstorage-ui';

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  code?: string;
  title: string;
  message?: string;
  onClose?: () => void;
}

function Message({ code, title, message, onClose, ...props }: MessageProps) {
  return (
    <Flexbox direction="vertical" alignment="center" gap={30} {...props}>
      <Flexbox direction="vertical" alignment="center" gap={20}>
        <Icon name="InfoOutlined" width={60} height={60} />
        <Flexbox
          direction="vertical"
          alignment="center"
          gap={6}
          customStyle={{
            textAlign: 'center'
          }}
        >
          <Typography fontSize={22} fontWeight={700} lineHeight="28px">
            {title}
          </Typography>
          {code && (
            <Tag variant="accent" customStyle={{ margin: '8px 0' }}>
              CODE: {code}
            </Tag>
          )}
          {message && (
            <Typography
              fontWeight={500}
              lineHeight="18px"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </Flexbox>
      </Flexbox>
      <Button onClick={onClose}>확인</Button>
    </Flexbox>
  );
}

export default Message;
