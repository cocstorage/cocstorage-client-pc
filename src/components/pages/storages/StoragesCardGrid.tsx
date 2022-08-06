import Link from 'next/link';

import { useQuery } from 'react-query';

import { useRecoilValue } from 'recoil';

import { selectedCategoryIdState } from '@recoil/storages/atoms';

import { Grid, Typography } from 'cocstorage-ui';

import { StorageCard } from '@components/UI/molecules';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';

import queryKeys from '@constants/react-query';

function StoragesCardGrid() {
  const selectedCategoryId = useRecoilValue<number>(selectedCategoryIdState);

  const { data: { categories = [] } = {} } = useQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );

  const { data: { storages = [] } = {} } = useQuery(queryKeys.storages.storages, fetchStorages, {
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
  });

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
                    <Link href={`/storages/${storage.path}`}>
                      <a>
                        <StorageCard name={storage.name} src={storage.avatarUrl || ''} />
                      </a>
                    </Link>
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

export default StoragesCardGrid;
