import { HTMLAttributes, memo } from 'react';

import Link from 'next/link';

import { Avatar, Typography } from 'cocstorage-ui';

import { StyledStorageCard } from './StorageCard.styles';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  path: string;
  name: string;
}

function StorageCard({ src, path, name, ...props }: StorageCardProps) {
  return (
    <Link href={`/storages/${path}`}>
      <StyledStorageCard {...props}>
        <Avatar width={36} height={36} src={src} round={6} alt="Storage Logo Img" />
        <Typography>{name}</Typography>
      </StyledStorageCard>
    </Link>
  );
}

export default memo(StorageCard);
