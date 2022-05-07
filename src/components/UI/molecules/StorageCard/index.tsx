import React, { useState, useMemo, useCallback, memo, ButtonHTMLAttributes } from 'react';

import { Avatar, Typography } from 'cocstorage-ui';

import { StyledStorageCard } from './StorageCard.styles';

interface StorageCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  name: string;
}

function StorageCard({ src, name, ...props }: StorageCardProps) {
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const handleError = useCallback(() => setLoadFailed(true), []);

  const newSrc = useMemo<string>(() => {
    if (loadFailed || !src) {
      return 'https://static.cocstorage.com/assets/thumbnail.png';
    }

    return src;
  }, [src, loadFailed]);

  return (
    <StyledStorageCard {...props}>
      <Avatar
        width="36px"
        height="36px"
        round
        src={newSrc}
        onError={handleError}
        alt="Storage Logo Img"
      />
      <Typography component="div" lineHeight="14px">
        {name}
      </Typography>
    </StyledStorageCard>
  );
}

export default memo(StorageCard);
