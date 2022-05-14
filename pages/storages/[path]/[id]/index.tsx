import { useRouter } from 'next/router';

import { Box, Flexbox, Grid, Typography } from 'cocstorage-ui';

import { StorageBoardContent, StorageBoardRightMenu } from '@components/pages/storageBoard';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';
import {
  CommentForm,
  CommentList,
  StorageBoardGrid,
  StorageBoardGridPagination
} from '@components/UI/organisms';

function StorageBoard() {
  const {
    query: { path = '' }
  } = useRouter();

  return (
    <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
      <Grid container columnGap={20}>
        <Grid item auto>
          <StorageBoardContent />
          <CommentList />
          <Box customStyle={{ margin: '35px 0 50px 0' }}>
            <CommentForm />
          </Box>
          {path && (
            <>
              <Flexbox gap={20} direction="vertical">
                <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
                  이 게시판의 다른 글
                </Typography>
                <StorageBoardGrid path={path as string} />
              </Flexbox>
              <Flexbox justifyContent="center" customStyle={{ margin: '50px 0 30px 0' }}>
                <StorageBoardGridPagination path={path as string} />
              </Flexbox>
            </>
          )}
        </Grid>
        <Grid item lgHidden customStyle={{ minWidth: 203 }}>
          <Box customStyle={{ position: 'fixed', width: 183 }}>
            <StorageBoardRightMenu />
          </Box>
        </Grid>
      </Grid>
    </GeneralTemplate>
  );
}

export default StorageBoard;
