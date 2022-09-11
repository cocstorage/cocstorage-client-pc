import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { Button, Flexbox, Grid, Icon, Tag, Typography, useTheme } from 'cocstorage-ui';

import StorageBoardCard from '@components/UI/molecules/StorageBoardCard';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';

import {
  fetchIndexPopularStorageBoards,
  fetchIndexWorstStorageBoards
} from '@api/v1/storage-boards';

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
            endIcon={<Icon name="CaretSemiRightOutlined" width={16} height={16} />}
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
            <Link href={`/storages/${bestBoards[0].storage.path}/${bestBoards[0].id}`}>
              <a>
                <StorageBoardCard
                  variant="emphasize"
                  storageBoard={bestBoards[0]}
                  hideSymbolismBadge
                />
              </a>
            </Link>
            <Flexbox direction="vertical" gap={13}>
              <Link href={`/storages/${bestBoards[1].storage.path}/${bestBoards[1].id}`}>
                <a>
                  <StorageBoardCard
                    variant="normal"
                    storageBoard={bestBoards[1]}
                    hideSymbolismBadge
                  />
                </a>
              </Link>
              <Link href={`/storages/${bestBoards[2].storage.path}/${bestBoards[2].id}`}>
                <a>
                  <StorageBoardCard
                    variant="normal"
                    storageBoard={bestBoards[2]}
                    hideSymbolismBadge
                  />
                </a>
              </Link>
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
            endIcon={<Icon name="CaretSemiRightOutlined" width={16} height={16} />}
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
            <Link href={`/storages/${worstBoards[0].storage.path}/${worstBoards[0].id}`}>
              <a>
                <StorageBoardCard
                  variant="emphasize"
                  storageBoard={worstBoards[0]}
                  hideSymbolismBadge
                />
              </a>
            </Link>
            <Flexbox direction="vertical" gap={13}>
              <Link href={`/storages/${worstBoards[1].storage.path}/${worstBoards[1].id}`}>
                <a>
                  <StorageBoardCard
                    variant="normal"
                    storageBoard={worstBoards[1]}
                    hideSymbolismBadge
                  />
                </a>
              </Link>
              <Link href={`/storages/${worstBoards[2].storage.path}/${worstBoards[2].id}`}>
                <a>
                  <StorageBoardCard
                    variant="normal"
                    storageBoard={worstBoards[2]}
                    hideSymbolismBadge
                  />
                </a>
              </Link>
            </Flexbox>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default IndexBestWorstStorageBoardGrid;
