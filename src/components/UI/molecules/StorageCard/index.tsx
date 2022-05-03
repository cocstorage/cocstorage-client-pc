import React, { memo, HTMLAttributes } from 'react';

import { Avatar, Typography, GenericComponentProps } from 'cocstorage-ui';

import { StyledStorageCard } from './StorageCard.styles';

interface StorageCardProps
  extends Omit<
    GenericComponentProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'customStyle'
  > {
  src: string;
  name: string;
}

function StorageCard({ componentRef, src, name, ...props }: StorageCardProps) {
  return (
    <StyledStorageCard ref={componentRef} {...props}>
      <Avatar width="36px" height="36px" round src={src} alt="Storage Logo Img" />
      <Typography component="div" lineHeight="14px">
        {name}
      </Typography>
    </StyledStorageCard>
  );
}

export default memo(StorageCard);
