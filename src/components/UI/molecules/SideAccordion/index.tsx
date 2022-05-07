import React, { useEffect, useState, useRef, PropsWithChildren, HTMLAttributes } from 'react';

import { useTheme, Typography, Flexbox, Button, Icon } from 'cocstorage-ui';

import { StyledSideAccordion, List } from './SideAccordion.styles';

export interface SideAccordionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  listGap?: number;
  disableToggle?: boolean;
}

function SideAccordion({
  children,
  title,
  listGap = 12,
  disableToggle = false,
  ...props
}: PropsWithChildren<SideAccordionProps>) {
  const {
    theme: { type, palette }
  } = useTheme();

  const [openToggleButton, setOpenToggleButton] = useState<boolean>(true);

  const [toggleList, setToggleList] = useState<boolean>(true);
  const [toggleListMaxHeight, setToggleListMaxHeight] = useState<number>(144);
  const [toggleCount] = useState<number>(5);

  const listRef = useRef<HTMLDivElement | null>(null);

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
    <StyledSideAccordion {...props}>
      <Flexbox alignment="center" justifyContent="space-between">
        <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
          {title}
        </Typography>
        {openToggleButton && !disableToggle && (
          <Button
            color="transparent"
            size="pico"
            startIcon={
              <Icon
                name={toggleList ? 'CaretSemiDownOutlined' : 'CaretSemiUpOutlined'}
                width={16}
                height={16}
              />
            }
            onClick={handleClick}
            customStyle={{
              color: palette.text[type].text1
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
      >
        {children}
      </List>
    </StyledSideAccordion>
  );
}

export default SideAccordion;
