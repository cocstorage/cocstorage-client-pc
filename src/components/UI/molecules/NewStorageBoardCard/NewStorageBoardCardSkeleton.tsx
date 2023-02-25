import { Box, Flexbox, Skeleton, Typography, useTheme } from 'cocstorage-ui';

function NewStorageBoardCardSkeleton() {
  const {
    theme: {
      mode,
      palette: { box, text }
    }
  } = useTheme();

  return (
    <Flexbox
      alignment="center"
      gap={20}
      customStyle={{
        padding: '20px 0',
        borderBottom: `1px solid ${box.stroked.normal}`,
        cursor: 'pointer'
      }}
    >
      <Flexbox
        direction="vertical"
        customStyle={{
          flex: 1
        }}
      >
        <Skeleton width="100%" maxWidth={250} height={20} round={6} disableAspectRatio />
        <Skeleton
          width="100%"
          maxWidth={300}
          height={36}
          round={6}
          disableAspectRatio
          customStyle={{
            marginTop: 4
          }}
        />
        <Flexbox
          gap={32}
          customStyle={{
            marginTop: 20
          }}
        >
          <Flexbox gap={2}>
            <Skeleton
              width={16}
              height={16}
              round="50%"
              disableAspectRatio
              customStyle={{
                marginRight: 2
              }}
            />
            <Skeleton width={32} height={16} round={6} disableAspectRatio />
            <Typography
              variant="s1"
              color={text[mode].text2}
              customStyle={{
                minWidth: 8
              }}
            >
              ∙
            </Typography>
            <Skeleton width={42} height={16} round={6} disableAspectRatio />
          </Flexbox>
          <Flexbox gap={12}>
            <Skeleton width={42} height={16} round={6} disableAspectRatio />
            <Skeleton width={42} height={16} round={6} disableAspectRatio />
            <Skeleton width={42} height={16} round={6} disableAspectRatio />
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Box
        // TODO 부모를 감싸주고 width 를 지정해야 ratio 가 동작하는 문제 수정
        customStyle={{
          minWidth: 144,
          maxWidth: 144
        }}
      >
        <Skeleton ratio="4:3" round={6} />
      </Box>
    </Flexbox>
  );
}

export default NewStorageBoardCardSkeleton;
