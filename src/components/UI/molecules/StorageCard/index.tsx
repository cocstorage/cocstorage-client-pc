import React, { memo, HTMLAttributes } from 'react';

import { Avatar, Typography } from 'cocstorage-ui';

import { StyledStorageCard } from './StorageCard.styles';

interface StorageCardProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  name: string;
}

function StorageCard({ src, name, ...props }: StorageCardProps) {
  return (
    <StyledStorageCard {...props}>
      <Avatar width="36px" height="36px" round src={src} alt="Storage Logo Img" />
      <Typography component="div" lineHeight="14px">
        {name}
      </Typography>
    </StyledStorageCard>
  );
}

export default memo(StorageCard);
