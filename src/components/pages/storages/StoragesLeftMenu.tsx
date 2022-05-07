import React from 'react';
import styled, { CSSObject } from '@emotion/styled';

import { useTheme, Typography } from 'cocstorage-ui';

import { SideAccordion } from '@components/UI/molecules';

function StoragesLeftMenu() {
  const { theme } = useTheme();

  return (
    <SideAccordion title="카테고리" listGap={2}>
      <Category theme={theme} active>
        <Typography fontSize="16px" fontWeight={500} lineHeight="20px">
          게임
        </Typography>
        <Typography
          fontSize="16px"
          fontWeight={500}
          lineHeight="20px"
          color={theme.palette.primary.main}
        >
          50
        </Typography>
      </Category>
      <Category theme={theme}>
        <Typography fontSize="16px" fontWeight={500} lineHeight="20px">
          스포츠
        </Typography>
        <Typography
          fontSize="16px"
          fontWeight={500}
          lineHeight="20px"
          color={theme.palette.primary.main}
        >
          50
        </Typography>
      </Category>
      <Category theme={theme}>
        <Typography fontSize="16px" fontWeight={500} lineHeight="20px">
          정치
        </Typography>
        <Typography
          fontSize="16px"
          fontWeight={500}
          lineHeight="20px"
          color={theme.palette.primary.main}
        >
          50
        </Typography>
      </Category>
    </SideAccordion>
  );
}

const Category = styled.button<{
  active?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 6px;

  ${({ theme: { palette }, active }): CSSObject =>
    active
      ? {
          backgroundColor: palette.primary.bg2,
          '& > *': {
            color: `${palette.primary.main} !important`
          }
        }
      : {}}
`;

export default StoragesLeftMenu;
