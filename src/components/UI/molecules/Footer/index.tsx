import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import { Typography, useTheme } from '@cocstorage/ui';

import { Links, StyledFooter } from './Footer.styles';

function Footer() {
  const router = useRouter();
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    const dataPathName = event.currentTarget.getAttribute('data-pathname');

    if (!dataPathName) return;

    router.push(dataPathName).then();
  };

  return (
    <StyledFooter>
      <Typography variant="s1" noWrap color={text[mode].text2}>
        ⓒ 개념글 저장소 All Rights Reserved.
      </Typography>
      <Links>
        <Typography
          variant="s1"
          color={text[mode].text2}
          data-pathname="/policy"
          onClick={handleClick}
        >
          이용약관
        </Typography>
        <Typography
          variant="s1"
          color={text[mode].text2}
          data-pathname="/privacy"
          onClick={handleClick}
        >
          개인정보처리방침
        </Typography>
      </Links>
    </StyledFooter>
  );
}

export default Footer;
