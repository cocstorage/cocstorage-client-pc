import Link from 'next/link';

import { Typography, useTheme } from 'cocstorage-ui';

import { Links, StyledFooter } from './Footer.styles';

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
          <Link href="/policy">
            <a>이용약관</a>
          </Link>
        </Typography>
        <Typography component="div" fontSize="12px" color={palette.text[type].text2}>
          <Link href="/privacy">
            <a>개인정보처리방침</a>
          </Link>
        </Typography>
      </Links>
    </StyledFooter>
  );
}

export default Footer;
