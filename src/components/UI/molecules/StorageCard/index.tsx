import React, { memo, ButtonHTMLAttributes } from 'react';

import { Typography } from 'cocstorage-ui';

import { RatioImage } from '@components/UI/atoms';

import { StyledStorageCard } from './StorageCard.styles';

interface StorageCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  name: string;
}

function StorageCard({ src, name, ...props }: StorageCardProps) {
  return (
    <StyledStorageCard {...props}>
      <RatioImage width={36} height={36} round={6} src={src} alt="Storage Logo Img" />
      <Typography component="div" lineHeight="14px">
        {name}
      </Typography>
    </StyledStorageCard>
  );
}

export default memo(StorageCard);
