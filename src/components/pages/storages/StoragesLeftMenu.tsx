import { MouseEvent } from 'react';

import { useQuery } from 'react-query';

import styled, { CSSObject } from '@emotion/styled';

import { useRecoilState } from 'recoil';

import { selectedCategoryIdState } from '@recoil/storages/atoms';

import { Typography, useTheme } from 'cocstorage-ui';

import { SideAccordion } from '@components/UI/molecules';

import { fetchStorageCategories } from '@api/v1/storage-categories';

import queryKeys from '@constants/react-query';

function StoragesLeftMenu() {
  const { theme } = useTheme();

  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(selectedCategoryIdState);

  const { data: { categories = [] } = {} } = useQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const categoryId = Number(event.currentTarget.getAttribute('data-category-id') || 0);

    setSelectedCategoryId(categoryId === selectedCategoryId ? 0 : categoryId);
  };

  return (
    <SideAccordion title="카테고리" listGap={2}>
      {categories.map((category) => (
        <Category
          key={`category-${category.id}`}
          theme={theme}
          active={category.id === selectedCategoryId}
          data-category-id={category.id}
          onClick={handleClick}
        >
          <Typography fontSize="16px" fontWeight={500} lineHeight="20px">
            {category.name}
          </Typography>
        </Category>
      ))}
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
