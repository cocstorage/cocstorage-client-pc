import { Flexbox, Skeleton } from 'cocstorage-ui';

import { Wrapper } from './StorageBoardCard.styles';

import { StorageBoardCardProps } from '.';

function StorageBoardCardSkeleton({ variant }: Pick<StorageBoardCardProps, 'variant'>) {
  if (variant === 'emphasize') {
    return (
      <Wrapper variant={variant} hasThumbnail>
        <Skeleton ratio="16:9" maxWidth={183} round={12} />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          gap={6}
          customStyle={{ height: '100%' }}
        >
          <Flexbox direction="vertical" gap={8}>
            <Skeleton width="100%" maxWidth={70} height={14} disableAspectRatio />
            <Skeleton width="100%" maxWidth={200} height={17.5} disableAspectRatio />
          </Flexbox>
          <Flexbox gap={12}>
            <Skeleton width={30} height={18} disableAspectRatio />
            <Skeleton width={30} height={18} disableAspectRatio />
            <Skeleton width={30} height={18} disableAspectRatio />
          </Flexbox>
        </Flexbox>
      </Wrapper>
    );
  }

  if (variant === 'normal') {
    return (
      <Wrapper variant={variant} hasThumbnail>
        <Skeleton ratio="4:3" maxWidth={82} round={6} />
        <Flexbox
          direction="vertical"
          justifyContent="space-between"
          gap={6}
          customStyle={{ height: '100%' }}
        >
          <Skeleton width="100%" maxWidth={200} height={17.5} disableAspectRatio />
          <Flexbox gap={12}>
            <Skeleton width={30} height={16} disableAspectRatio />
            <Skeleton width={30} height={16} disableAspectRatio />
            <Skeleton width={30} height={16} disableAspectRatio />
            <Skeleton width={50} height={16} disableAspectRatio />
          </Flexbox>
        </Flexbox>
      </Wrapper>
    );
  }

  return (
    <Wrapper variant={variant} hasThumbnail>
      <Flexbox direction="vertical" gap={6}>
        <Skeleton width="100%" maxWidth={200} height={17.5} disableAspectRatio />
        <Flexbox gap={12}>
          <Skeleton width={30} height={14} disableAspectRatio />
          <Skeleton width={30} height={14} disableAspectRatio />
          <Skeleton width={30} height={14} disableAspectRatio />
          <Skeleton width={50} height={14} disableAspectRatio />
        </Flexbox>
      </Flexbox>
      <Skeleton ratio="16:9" round={8} />
    </Wrapper>
  );
}

export default StorageBoardCardSkeleton;
