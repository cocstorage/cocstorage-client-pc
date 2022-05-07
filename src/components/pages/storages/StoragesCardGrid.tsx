import React from 'react';

import { Grid, Typography } from 'cocstorage-ui';

import { StorageCard } from '@components/UI/molecules';

function StoragesCardGrid() {
  return (
    <Grid container columnGap={20} rowGap={30} customStyle={{ marginTop: 50 }}>
      <Grid item xs={1} lg={2}>
        <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
          게임
        </Typography>
        <Grid container columnGap={20} rowGap={12} customStyle={{ marginTop: 20 }}>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} lg={2}>
        <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
          게임
        </Typography>
        <Grid container columnGap={20} rowGap={12} customStyle={{ marginTop: 20 }}>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} lg={2}>
        <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
          게임
        </Typography>
        <Grid container columnGap={20} rowGap={12} customStyle={{ marginTop: 20 }}>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} lg={2}>
        <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
          게임
        </Typography>
        <Grid container columnGap={20} rowGap={12} customStyle={{ marginTop: 20 }}>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
          <Grid item xs={2}>
            <StorageCard
              name="스트리머"
              src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoragesCardGrid;
