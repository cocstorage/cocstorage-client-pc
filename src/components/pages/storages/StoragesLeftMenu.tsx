import { MouseEvent } from 'react';

import { useQuery } from '@tanstack/react-query';

import styled, { CSSObject } from '@emotion/styled';

import { useRecoilState } from 'recoil';

import { storagesSelectedCategoryIdState } from '@recoil/storages/atoms';

import { Typography } from 'cocstorage-ui';

import SideAccordion from '@components/UI/molecules/SideAccordion';

import { fetchStorageCategories } from '@api/v1/storage-categories';

import queryKeys from '@constants/queryKeys';

function StoragesLeftMenu() {
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
    storagesSelectedCategoryIdState
  );

  const { data: { categories = [] } = {} } = useQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const categoryId = Number(event.currentTarget.getAttribute('data-category-id') || 0);

    setSelectedCategoryId(categoryId === selectedCategoryId ? 0 : categoryId);
  };

  return (
    <SideAccordion
      title="카테고리"
      listGap={2}
      disableToggle
      customStyle={{ position: 'sticky', top: 89, width: 156 }}
    >
      {categories.map((category) => (
        <Category
          key={`category-${category.id}`}
          active={category.id === selectedCategoryId}
          data-category-id={category.id}
          onClick={handleClick}
        >
          <Typography variant="p1" fontWeight="medium">
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
