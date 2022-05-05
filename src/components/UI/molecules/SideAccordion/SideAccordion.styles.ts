import styled, { CSSObject } from '@emotion/styled';

import { SideAccordionProps } from '.';

export const StyledSideAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const List = styled.div<
  Pick<SideAccordionProps, 'disableToggle'> & {
    toggleList: boolean;
    toggleListMaxHeight: number;
  }
>`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${({ disableToggle, toggleList, toggleListMaxHeight }): CSSObject =>
    !disableToggle
      ? {
          maxHeight: toggleList ? toggleListMaxHeight : '100%',
          overflowY: 'auto'
        }
      : {}};
`;
