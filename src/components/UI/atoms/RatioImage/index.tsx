import { HTMLAttributes, useRef, useState } from 'react';

import { CSSObject } from '@emotion/styled';

import { Avatar, Box, CSSValue, Icon } from 'cocstorage-ui';

import { RatioImageInner, RatioImageWrapper } from './RatioImage.styles';

export interface RatioImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width?: CSSValue;
  height?: CSSValue;
  ratio?: '1:1' | '4:3' | '16:9';
  round?: CSSValue;
  defaultIcon?: 'image' | 'user';
  defaultIconWidth?: number;
  defaultIconHeight?: number;
}

function RatioImage({
  src,
  alt,
  width = '100%',
  height,
  ratio = '1:1',
  round = 6,
  defaultIcon = 'image',
  defaultIconWidth = 24,
  defaultIconHeight = 24,
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

  const handleError = () => setLoadFailed(true);

  return (
    <Box customStyle={{ width, height }}>
      <RatioImageWrapper ratio={ratio} round={round} {...props}>
        <RatioImageInner>
          {!loadFailed && src && (
            <Avatar
              width={width}
              height={height}
              src={src}
              alt={alt}
              round
              onError={handleError}
              customStyle={customStyleRef.current}
            />
          )}
          {(!src || loadFailed) && (
            <Icon
              name={defaultIcon === 'image' ? 'ImageOutlined' : 'UserFilled'}
              customStyle={customStyleRef.current}
              width={defaultIconWidth}
              height={defaultIconHeight}
            />
          )}
        </RatioImageInner>
      </RatioImageWrapper>
    </Box>
  );
}

export default RatioImage;
