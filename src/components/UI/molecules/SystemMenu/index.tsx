import { RefObject } from 'react';

import { ThemeType } from 'cocstorage-ui/dist/types';

import { useRecoilState } from 'recoil';

import { themeState } from '@recoil/common/atoms';

import { Dropdown, Flexbox, Icon, Menu, Typography, useTheme } from 'cocstorage-ui';

import LocalStorage from '@library/localStorage';

import { localStorageKeys } from '@constants/localStorage';

import { List, ListItemGroup } from './SystemMenu.styles';

interface SystemMenuProps {
  open: boolean;
  anchorRef: RefObject<HTMLElement>;
  onClose: () => void;
}

const options = [
  {
    name: '시스템 설정에 따름',
    value: 'system'
  },
  {
    name: '라이트',
    value: 'light'
  },
  {
    name: '다크',
    value: 'dark'
  }
];

function SystemMenu({ open, anchorRef, onClose }: SystemMenuProps) {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  const [theme, setTheme] = useRecoilState(themeState);

  const handleTheme = (value: string | number) => {
    const newValue = value as ThemeType | 'system';
    setTheme(newValue);
    LocalStorage.set<ThemeType | 'system'>(localStorageKeys.theme, newValue);
  };

  return (
    <Menu
      open={open}
      anchorRef={anchorRef}
      onClose={onClose}
      customStyle={{
        width: 230
      }}
    >
      <List>
        <ListItemGroup>
          <Flexbox gap={8} alignment="center">
            <Icon name="StarOutlined" width={20} color={text[type].text2} />
            <Typography lineHeight="20px">테마</Typography>
          </Flexbox>
          <Dropdown fullWidth options={options} value={theme} onChange={handleTheme} />
        </ListItemGroup>
      </List>
    </Menu>
  );
}

export default SystemMenu;
