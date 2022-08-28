import { HTMLAttributes, memo } from 'react';

import { Image, Typography } from 'cocstorage-ui';

import { StyledStorageCard } from './StorageCard.styles';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  name: string;
}

function StorageCard({ src, name, ...props }: StorageCardProps) {
  return (
    <StyledStorageCard {...props}>
      <Image width={36} height={36} round={6} src={src} alt="Storage Logo Img" disableAspectRatio />
      <Typography>{name}</Typography>
    </StyledStorageCard>
  );
}

export default memo(StorageCard);
