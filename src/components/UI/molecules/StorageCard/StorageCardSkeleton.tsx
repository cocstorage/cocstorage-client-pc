import { CustomStyle, Flexbox, Skeleton } from 'cocstorage-ui';

interface StorageCardSkeletonProps {
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium';
  customStyle?: CustomStyle;
}

function StorageCardSkeleton({ direction, size, customStyle }: StorageCardSkeletonProps) {
  if (direction === 'vertical') {
    return (
      <Flexbox direction="vertical" alignment="center" gap={8} css={customStyle}>
        <Skeleton width={60} height={60} round={6} disableAspectRatio />
        <Skeleton width="100%" maxWidth={50} height={18} round={6} disableAspectRatio />
      </Flexbox>
    );
  }

  return (
    <Flexbox alignment="center" gap={8} css={customStyle}>
      <Skeleton
        width={size === 'small' ? 18 : 36}
        height={size === 'small' ? 18 : 36}
        round={size === 'small' ? 4 : 6}
        disableAspectRatio
      />
      <Skeleton width="100%" maxWidth={65} height={18} round={6} disableAspectRatio />
    </Flexbox>
  );
}

export default StorageCardSkeleton;
