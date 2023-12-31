import { useRouter } from 'next/router';

import { Button, Flexbox, Grid, Tag, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useQuery } from '@tanstack/react-query';

import {
  fetchIndexPopularStorageBoards,
  fetchIndexWorstStorageBoards
} from '@api/v1/storage-boards';
import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';
import queryKeys from '@constants/queryKeys';

function IndexBestWorstStorageBoardGrid() {
  const router = useRouter();
  const {
    theme: {
      mode,
      palette: {
        text,
        secondary: { red }
      }
    }
  } = useTheme();

  const { data: { boards: bestBoards = [] } = {}, isLoading: isLoadingBest } = useQuery(
    queryKeys.storageBoards.indexPopularStorageBoards,
    fetchIndexPopularStorageBoards
  );

  const { data: { boards: worstBoards = [] } = {}, isLoading: isLoadingWorst } = useQuery(
    queryKeys.storageBoards.indexWorstStorageBoards,
    fetchIndexWorstStorageBoards
  );

  const handleClickMoreBest = () => router.push('/best');
  const handleClickMoreWorst = () => router.push('/worst');

  return (
    <Grid container columnGap={18} rowGap={30} customStyle={{ marginTop: 5 }}>
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
              variant="semiAccent"
              startIcon={<Icon name="ThumbsUpOutlined" width={14} height={14} />}
              customStyle={{
                padding: '0 6px',
                height: 21,
                borderRadius: 4,
                fontSize: 12,
                lineHeight: '18px',
                letterSpacing: '-0.6px'
              }}
            >
              베스트
            </Tag>
            <Typography variant="h4" fontWeight="bold">
              ㅇㄱㄹㅇ
            </Typography>
          </Flexbox>
          <Button
            variant="transparent"
            size="pico"
            endIcon={<Icon name="CaretSemiRightOutlined" />}
            onClick={handleClickMoreBest}
            customStyle={{
              color: text[mode].text1
            }}
          >
            더보기
          </Button>
        </Flexbox>
        {isLoadingBest && (
          <>
            <StorageBoardCardSkeleton variant="emphasize" />
            <Flexbox direction="vertical" gap={13}>
              <StorageBoardCardSkeleton variant="normal" />
              <StorageBoardCardSkeleton variant="normal" />
            </Flexbox>
          </>
        )}
        {!isLoadingBest && bestBoards.length > 2 && (
          <>
            <StorageBoardCard variant="emphasize" storageBoard={bestBoards[0]} hideSymbolismBadge />
            <Flexbox direction="vertical" gap={13}>
              <StorageBoardCard variant="normal" storageBoard={bestBoards[1]} hideSymbolismBadge />
              <StorageBoardCard variant="normal" storageBoard={bestBoards[2]} hideSymbolismBadge />
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
              variant="semiAccent"
              startIcon={<Icon name="ThumbsDownOutlined" width={14} height={14} color={red.main} />}
              customStyle={{
                padding: '0 6px',
                height: 21,
                borderRadius: 4,
                fontSize: 12,
                lineHeight: '18px',
                letterSpacing: '-0.6px',
                backgroundColor: red.bg,
                color: red.main
              }}
            >
              워스트
            </Tag>
            <Typography variant="h4" fontWeight="bold">
              와 선 넘네
            </Typography>
          </Flexbox>
          <Button
            variant="transparent"
            size="pico"
            endIcon={<Icon name="CaretSemiRightOutlined" />}
            onClick={handleClickMoreWorst}
            customStyle={{
              color: text[mode].text1
            }}
          >
            더보기
          </Button>
        </Flexbox>
        {isLoadingWorst && (
          <>
            <StorageBoardCardSkeleton variant="emphasize" />
            <Flexbox direction="vertical" gap={13}>
              <StorageBoardCardSkeleton variant="normal" />
              <StorageBoardCardSkeleton variant="normal" />
            </Flexbox>
          </>
        )}
        {!isLoadingWorst && worstBoards.length > 2 && (
          <>
            <StorageBoardCard
              variant="emphasize"
              storageBoard={worstBoards[0]}
              hideSymbolismBadge
            />
            <Flexbox direction="vertical" gap={13}>
              <StorageBoardCard variant="normal" storageBoard={worstBoards[1]} hideSymbolismBadge />
              <StorageBoardCard variant="normal" storageBoard={worstBoards[2]} hideSymbolismBadge />
            </Flexbox>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default IndexBestWorstStorageBoardGrid;
