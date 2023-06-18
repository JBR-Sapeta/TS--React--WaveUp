import PostSkeleton from './PostSkeleton';
import CommentSkeleton from './CommentSkeleton';

interface SkeletonProps {
  type: 'Posts' | 'Comments';
}

function Skeleton({ type }: SkeletonProps) {
  const array = ['1', '2', '3'];

  return (
    <div className="skeletons">
      {type === 'Posts'
        ? array.map((item) => <PostSkeleton key={item} />)
        : array.map((item) => <CommentSkeleton key={item} />)}
    </div>
  );
}

export default Skeleton;


