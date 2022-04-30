import React, { memo, PropsWithChildren, HTMLAttributes } from 'react';
import { Typography } from 'cocstorage-ui';

import { StyledSideAccordion, List } from './SideAccordion.styles';

interface SideAccordionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

function SideAccordion({ children, title }: PropsWithChildren<SideAccordionProps>) {
  return (
    <StyledSideAccordion>
      <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
        {title}
      </Typography>
      <List>{children}</List>
    </StyledSideAccordion>
  );
}

export default memo(SideAccordion);
