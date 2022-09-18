import { HTMLAttributes, memo } from 'react';

import Link from 'next/link';

import { Image, Typography } from 'cocstorage-ui';

import { StyledStorageCard } from './StorageCard.styles';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  path: string;
  name: string;
}

function StorageCard({ src, path, name, ...props }: StorageCardProps) {
  return (
    <Link href={`/storages/${path}`}>
      <a>
        <StyledStorageCard {...props}>
          <Image
            width={36}
            height={36}
            round={6}
            src={src}
            alt="Storage Logo Img"
            disableAspectRatio
          />
          <Typography>{name}</Typography>
        </StyledStorageCard>
      </a>
    </Link>
  );
}

export default memo(StorageCard);
