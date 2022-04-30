import React from 'react';
import {
  useTheme,
  Grid,
  Alert,
  Icon,
  IconButton,
  Tag,
  Typography,
  Button,
  Layout
} from 'cocstorage-ui';

import {
  Footer,
  Header,
  StorageCard,
  StorageBoardCard,
  SideAccordion,
  IssueKeywordCard
} from '@components/molecules';
import { GeneralTemplate } from '@components/templeates';

function Index() {
  const {
    theme: { type, palette }
  } = useTheme();

  return (
    <GeneralTemplate header={<Header />}>
      <Grid container columnGap={20}>
        <Grid item lgHidden>
          <Layout direction="vertical" gap={30} customStyle={{ minWidth: 183 }}>
            <SideAccordion title="인기 게시판">
              <StorageCard
                src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
                name="인터넷 방송"
              />
              <StorageCard
                src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
                name="스트리머"
              />
            </SideAccordion>
          </Layout>
        </Grid>
        <Grid
          item
          auto
          customStyle={{
            display: 'flex',
            flexDirection: 'column',
            gap: 30
          }}
        >
          <Layout direction="vertical" gap={20}>
            <Alert
              severity="info"
              action={
                <IconButton rotation={180} aria-label="Notice Route">
                  <Icon name="CaretLeftOutlined" />
                </IconButton>
              }
            >
              업데이트 내용입니다.
            </Alert>
            <Grid container columnGap={18} rowGap={30}>
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
                <Layout justifyContent="space-between" gap={4}>
                  <Layout justifyContent="space-between" gap={8}>
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
                  </Layout>
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
                </Layout>
                <StorageBoardCard variant="emphasize" />
                <Layout direction="vertical" gap={13}>
                  <StorageBoardCard variant="normal" />
                  <StorageBoardCard variant="normal" />
                </Layout>
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
                <Layout justifyContent="space-between" gap={4}>
                  <Layout justifyContent="space-between" gap={8}>
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
                  </Layout>
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
                </Layout>
                <StorageBoardCard variant="emphasize" />
                <Layout direction="vertical" gap={13}>
                  <StorageBoardCard variant="normal" />
                  <StorageBoardCard variant="normal" />
                </Layout>
              </Grid>
            </Grid>
          </Layout>
          <Layout direction="vertical" gap={18}>
            <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
              최신 게시글
            </Typography>
            <Grid container columnGap={20} rowGap={20}>
              <Grid item xs={1} sm={1} md={2}>
                <StorageBoardCard />
              </Grid>
              <Grid item xs={1} sm={1} md={2}>
                <StorageBoardCard />
              </Grid>
            </Grid>
          </Layout>
        </Grid>
        <Grid item>
          <Layout direction="vertical" gap={20} customStyle={{ minWidth: 183 }}>
            <SideAccordion title="지금 막 뜨고 있어요!">
              {Array.from({ length: 10 }).map((_, index) => (
                <IssueKeywordCard
                  key={`issue-keyword-${index + 1}`}
                  issueKeyword={{
                    number: index + 1,
                    keyword: '개념글 저장소',
                    isUp: true,
                    isDown: false,
                    isNew: false,
                    keywordId: 1,
                    path: 'cocstorage'
                  }}
                  isTopTier={index <= 2}
                />
              ))}
            </SideAccordion>
            <Footer />
          </Layout>
        </Grid>
      </Grid>
    </GeneralTemplate>
  );
}

export default Index;
