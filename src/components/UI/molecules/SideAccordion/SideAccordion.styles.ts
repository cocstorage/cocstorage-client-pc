import styled, { CSSObject } from '@emotion/styled';

import { SideAccordionProps } from '.';

export const StyledSideAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const List = styled.div<
  Pick<SideAccordionProps, 'listGap' | 'disableToggle'> & {
    toggleList: boolean;
    toggleListMaxHeight: number;
  }
>`
  display: flex;
  flex-direction: column;
  gap: ${({ listGap }) => `${listGap}px`};

  ${({ disableToggle, toggleList, toggleListMaxHeight }): CSSObject =>
    !disableToggle
      ? {
          maxHeight: toggleList ? toggleListMaxHeight : toggleListMaxHeight * 2,
          overflowY: 'auto'
        }
      : {}};
`;
