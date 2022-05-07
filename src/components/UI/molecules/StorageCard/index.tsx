import React, { useState, useMemo, useCallback, memo, ButtonHTMLAttributes } from 'react';

import { useTheme, Avatar, Typography } from 'cocstorage-ui';

import { StyledStorageCard, AvatarWrapper, AvatarInner } from './StorageCard.styles';

interface StorageCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  name: string;
}

function StorageCard({ src, name, ...props }: StorageCardProps) {
  const { theme } = useTheme();

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
      <AvatarWrapper theme={theme}>
        <AvatarInner>
          <Avatar
            width={36}
            height={36}
            round
            src={newSrc}
            alt="Storage Logo Img"
            onError={handleError}
            customStyle={{
              position: 'absolute',
              top: 0,
              left: 0,
              maxWidth: '100%',
              height: 'auto',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </AvatarInner>
      </AvatarWrapper>
      <Typography component="div" lineHeight="14px">
        {name}
      </Typography>
    </StyledStorageCard>
  );
}

export default memo(StorageCard);
