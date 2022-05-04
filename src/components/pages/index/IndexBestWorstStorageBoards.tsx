import React, { memo, HTMLAttributes } from 'react';

import { useTheme, Button, Flexbox, Grid, Icon, Tag, Typography } from 'cocstorage-ui';

import { StorageBoardCard } from '@components/UI/molecules';
import { StorageBoard } from '@dto/storage-boards';

interface BestWorstStorageBoardsProps extends HTMLAttributes<HTMLDivElement> {
  popularStorageBoards: StorageBoard[];
}

function IndexBestWorstStorageBoards({
  popularStorageBoards,
  ...props
}: BestWorstStorageBoardsProps) {
  const {
    theme: { type, palette }
  } = useTheme();

  return (
    <Grid container columnGap={18} rowGap={30} customStyle={{ marginTop: 5 }} {...props}>
      <Grid
        item
        xs={1}
        sm={1}
        md={1}
        lg={2}
        customStyle={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}
      >
        <Flexbox alignment="center" justifyContent="space-between" gap={4}>
          <Flexbox alignment="center" justifyContent="space-between" gap={8}>
            <Tag
              color="semiAccent"
              text="베스트"
              startIcon={<Icon name="ThumbsUpOutlined" width={14} height={14} />}
              customStyle={{
                padding: '0 6px',
                height: 21,
                borderRadius: 4,
                fontSize: 12,
                lineHeight: '18px',
                letterSpacing: '-0.6px'
              }}
            />
            <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
              오 좋아요!
            </Typography>
          </Flexbox>
          <Button
            color="transparent"
            endIcon={<Icon name="CaretSemiLeftOutlined" width={16} height={16} />}
            customStyle={{
              fontSize: 12,
              color: palette.text[type].text1,
              '& > svg': {
                transform: 'rotate(180deg)'
              }
            }}
          >
            더보기
          </Button>
        </Flexbox>
        {popularStorageBoards.length > 2 && (
          <>
            <StorageBoardCard variant="emphasize" storageBoard={popularStorageBoards[0]} />
            <Flexbox direction="vertical" gap={13}>
              <StorageBoardCard variant="normal" storageBoard={popularStorageBoards[1]} />
              <StorageBoardCard variant="normal" storageBoard={popularStorageBoards[2]} />
            </Flexbox>
          </>
        )}
      </Grid>
      <Grid
        item
        xs={1}
        sm={1}
        md={1}
        lg={2}
        customStyle={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}
      >
        <Flexbox alignment="center" justifyContent="space-between" gap={4}>
          <Flexbox alignment="center" justifyContent="space-between" gap={8}>
            <Tag
              color="semiAccent"
              text="워스트"
              startIcon={
                <Icon
                  name="ThumbsDownOutlined"
                  width={14}
                  height={14}
                  color={palette.secondary.red.main}
                />
              }
              customStyle={{
                padding: '0 6px',
                height: 21,
                borderRadius: 4,
                fontSize: 12,
                lineHeight: '18px',
                letterSpacing: '-0.6px',
                backgroundColor: palette.secondary.red.bg,
                color: palette.secondary.red.main
              }}
            />
            <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
              이건 좀...
            </Typography>
          </Flexbox>
          <Button
            color="transparent"
            endIcon={<Icon name="CaretSemiLeftOutlined" width={16} height={16} />}
            customStyle={{
              fontSize: 12,
              color: palette.text[type].text1,
              '& > svg': {
                transform: 'rotate(180deg)'
              }
            }}
          >
            더보기
          </Button>
        </Flexbox>
        {popularStorageBoards.length > 2 && (
          <>
            <StorageBoardCard variant="emphasize" storageBoard={popularStorageBoards[0]} />
            <Flexbox direction="vertical" gap={13}>
              <StorageBoardCard variant="normal" storageBoard={popularStorageBoards[1]} />
              <StorageBoardCard variant="normal" storageBoard={popularStorageBoards[2]} />
            </Flexbox>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default memo(IndexBestWorstStorageBoards);
