import { HTMLAttributes, useCallback, useMemo, useRef, useState } from 'react';

import { CSSObject } from '@emotion/styled';

import { Avatar, Box, CSSValue } from 'cocstorage-ui';

import { AvatarInner, AvatarWrapper } from './RatioImage.styles';

export interface RatioImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width?: CSSValue;
  height?: CSSValue;
  ratio?: '1:1' | '4:3' | '16:9';
  round?: CSSValue;
}

function RatioImage({
  src,
  alt,
  width = '100%',
  height,
  ratio = '1:1',
  round = 6,
  ...props
}: RatioImageProps) {
  const customStyleRef = useRef<CSSObject>({
    position: 'absolute',
    top: 0,
    left: 0,
    maxWidth: '100%',
    height: 'auto',
    transform: 'translate(-50%, -50%)'
  });

  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const handleError = useCallback(() => setLoadFailed(true), []);

  const newSrc = useMemo<string>(() => {
    if (!src || loadFailed) {
      return 'https://static.cocstorage.com/assets/thumbnail.png';
    }

    return src;
  }, [src, loadFailed]);

  return (
    <Box customStyle={{ width, height }}>
      <AvatarWrapper ratio={ratio} round={round} {...props}>
        <AvatarInner>
          <Avatar
            width={width}
            height={height}
            src={newSrc}
            alt={alt}
            round
            onError={handleError}
            customStyle={customStyleRef.current}
          />
        </AvatarInner>
      </AvatarWrapper>
    </Box>
  );
}

export default RatioImage;
