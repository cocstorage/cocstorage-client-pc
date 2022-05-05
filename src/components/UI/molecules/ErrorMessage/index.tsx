import React, { HTMLAttributes } from 'react';
import { Flexbox, Typography, Button, Tag, Icon } from 'cocstorage-ui';

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  code?: string;
  title: string;
  message: string;
  onClose?: () => void;
}

function ErrorMessage({ code, title, message, onClose, ...props }: ErrorMessageProps) {
  return (
    <Flexbox direction="vertical" alignment="center" gap={30} {...props}>
      <Flexbox direction="vertical" alignment="center" gap={20}>
        <Icon name="InfoOutlined" width={60} height={60} />
        <Flexbox direction="vertical" alignment="center" gap={6}>
          <Typography fontSize={22} fontWeight={700} lineHeight="28px">
            {title}
          </Typography>
          {code && <Tag text={`CODE: ${code}`} color="accent" customStyle={{ margin: '8px 0' }} />}
          <Typography
            fontSize="14px"
            fontWeight={500}
            lineHeight="18px"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </Flexbox>
      </Flexbox>
      <Button onClick={onClose}>확인</Button>
    </Flexbox>
  );
}

export default ErrorMessage;
