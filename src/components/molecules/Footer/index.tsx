import React, { memo } from 'react';
import Link from 'next/link';

import { useTheme, Typography } from 'cocstorage-ui';

import { StyledFooter, Links } from './Footer.styles';

function Footer() {
  const {
    theme: { type, palette }
  } = useTheme();

  return (
    <StyledFooter>
      <Typography component="div" fontSize="12px" color={palette.text[type].text2}>
        ⓒ 개념글 저장소 All Rights Reserved.
      </Typography>
      <Links>
        <Typography component="div" fontSize="12px" color={palette.text[type].text2}>
          <Link href="/">
            <a>이용약관</a>
          </Link>
        </Typography>
        <Typography component="div" fontSize="12px" color={palette.text[type].text2}>
          <Link href="/">
            <a>개인정보처리방침</a>
          </Link>
        </Typography>
      </Links>
    </StyledFooter>
  );
}

export default memo(Footer);
