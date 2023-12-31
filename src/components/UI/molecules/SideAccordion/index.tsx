import { HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { Button, CustomStyle, Flexbox, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import { List, StyledSideAccordion } from './SideAccordion.styles';

export interface SideAccordionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  listGap?: number;
  disableToggle?: boolean;
  customStyle?: CustomStyle;
  listCustomStyle?: CustomStyle;
}

function SideAccordion({
  children,
  title,
  listGap = 12,
  disableToggle = false,
  customStyle,
  listCustomStyle,
  ...props
}: PropsWithChildren<SideAccordionProps>) {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const [openToggleButton, setOpenToggleButton] = useState(true);

  const [toggleList, setToggleList] = useState(true);
  const [toggleListMaxHeight, setToggleListMaxHeight] = useState(144);
  const [toggleCount] = useState(5);

  const listRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setToggleList(!toggleList);

  useEffect(() => {
    if (!disableToggle && listRef.current) {
      const { firstElementChild, childElementCount } = listRef.current;

      if (childElementCount < toggleCount) {
        setOpenToggleButton(false);
      }

      if (firstElementChild) {
        setToggleListMaxHeight(firstElementChild.clientHeight * toggleCount);
      }
    }
  }, [disableToggle, toggleCount]);

  return (
    <StyledSideAccordion {...props} css={customStyle}>
      <Flexbox alignment="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        {openToggleButton && !disableToggle && (
          <Button
            variant="transparent"
            size="pico"
            startIcon={<Icon name={toggleList ? 'CaretSemiDownOutlined' : 'CaretSemiUpOutlined'} />}
            onClick={handleClick}
            customStyle={{
              color: text[mode].text1
            }}
          >
            {toggleList ? '펼치기' : '접기'}
          </Button>
        )}
      </Flexbox>
      <List
        ref={listRef}
        listGap={listGap}
        toggleList={toggleList}
        toggleListMaxHeight={toggleListMaxHeight}
        disableToggle={disableToggle}
        css={listCustomStyle}
      >
        {children}
      </List>
    </StyledSideAccordion>
  );
}

export default SideAccordion;
