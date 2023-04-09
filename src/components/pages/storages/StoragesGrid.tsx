import { Grid, Typography } from '@cocstorage/ui';
import { useQuery } from '@tanstack/react-query';

import { useRecoilValue } from 'recoil';

import { storagesSelectedCategoryIdState } from '@recoil/pages/storages/atoms';

import { Message, StorageCard } from '@components/UI/molecules';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StoragesGrid() {
  const selectedCategoryId = useRecoilValue(storagesSelectedCategoryIdState);

  const { data: { categories = [] } = {}, isLoading } = useQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );

  const { data: { storages = [] } = {}, isLoading: isLoadingStorages } = useQuery(
    queryKeys.storages.storages,
    fetchStorages,
    {
      select: (data) => {
        if (selectedCategoryId) {
          return {
            ...data,
            storages: data.storages.filter(
              (storage) => storage.storageCategoryId === selectedCategoryId
            )
          };
        }

        return data;
      }
    }
  );

  if (!isLoading && !isLoadingStorages && !storages.length) {
    return (
      <Message title="아직 생성된 게시판이 없어요!" hideButton customStyle={{ margin: '50px 0' }} />
    );
  }

  return (
    <Grid container columnGap={20} rowGap={30} customStyle={{ marginTop: 50 }}>
      {categories.map((category) => {
        const categoryStorages = storages.filter(
          (storage) => storage.storageCategoryId === category.id
        );

        if (categoryStorages.length > 0) {
          return (
            <Grid key={`storage-category-${category.id}`} item xs={1} lg={2}>
              <Typography variant="p1" fontWeight="bold">
                {category.name}
              </Typography>
              <Grid container columnGap={20} rowGap={12} customStyle={{ marginTop: 20 }}>
                {categoryStorages.map((storage) => (
                  <Grid key={`storage-${storage.id}`} item xs={2}>
                    <StorageCard
                      name={storage.name}
                      path={storage.path}
                      src={storage.avatarUrl || ''}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          );
        }

        return null;
      })}
    </Grid>
  );
}

export default StoragesGrid;
