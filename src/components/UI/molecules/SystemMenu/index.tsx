import { RefObject } from 'react';

import { useRouter } from 'next/router';

import { ThemeMode } from 'cocstorage-ui/dist/types';

import { useRecoilState } from 'recoil';

import { commonThemeState } from '@recoil/common/atoms';

import { Dropdown, Flexbox, Icon, Menu, Typography, useTheme } from 'cocstorage-ui';

import { List, ListItem, ListItemGroup } from './SystemMenu.styles';

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
  const router = useRouter();
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  const [theme, setTheme] = useRecoilState(commonThemeState);

  const handleTheme = (value: string | number) => {
    const newValue = value as ThemeMode | 'system';
    setTheme(newValue);
  };

  const handleClick = () => router.push('/notices');

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
        <ListItem onClick={handleClick}>
          <Icon name="LoudSpeakerOutlined" color={text[mode].text2} />
          <Typography>새로운 소식</Typography>
        </ListItem>
        <ListItemGroup>
          <Flexbox gap={8} alignment="center">
            <Icon name="ThemeOutlined" width={20} color={text[mode].text2} />
            <Typography>테마</Typography>
          </Flexbox>
          <Dropdown fullWidth options={options} value={theme} onChange={handleTheme} />
        </ListItemGroup>
      </List>
    </Menu>
  );
}

export default SystemMenu;
