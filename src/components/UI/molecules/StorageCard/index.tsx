import { HTMLAttributes } from 'react';

import Link from 'next/link';

import { Avatar, CustomStyle, Flexbox, Typography } from '@cocstorage/ui';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium';
  src: string;
  path: string;
  name: string;
  customStyle?: CustomStyle;
}

function StorageCard({
  direction = 'horizontal',
  size = 'medium',
  src,
  path,
  name,
  customStyle,
  ...props
}: StorageCardProps) {
  if (direction === 'vertical') {
    return (
      <Link href={`/storages/${path}`}>
        <Flexbox direction="vertical" gap={8} {...props} css={customStyle}>
          <Avatar width={60} height={60} src={src} round={6} alt="Storage Logo Img" />
          <Typography
            variant="p2"
            noWrap
            customStyle={{
              textAlign: 'center'
            }}
          >
            {name}
          </Typography>
        </Flexbox>
      </Link>
    );
  }

  return (
    <Link href={`/storages/${path}`}>
      <Flexbox alignment="center" gap={8} {...props} css={customStyle}>
        <Avatar
          width={size === 'small' ? 18 : 36}
          height={size === 'small' ? 18 : 36}
          src={src}
          round={size === 'small' ? 4 : 6}
          alt="Storage Logo Img"
          fallback={{
            width: size === 'small' ? 12 : 24,
            height: size === 'small' ? 12 : 24
          }}
        />
        <Typography
          variant="p2"
          noWrap
          customStyle={{
            flex: 1
          }}
        >
          {name}
        </Typography>
      </Flexbox>
    </Link>
  );
}

export default StorageCard;
