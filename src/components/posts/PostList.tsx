import { useAppSelector } from '@/store';

import { NoResults, PostItem } from '@/components';

import { PostData } from '@/store/types';

import './PostList.css';

interface PostListProps {
  data: Array<PostData>;
  isLoading: boolean;
}

function PostList({ data, isLoading }: PostListProps) {
  const { id: userId, isAdmin } = useAppSelector((state) => state.auth.data);

  const showNoResults = data.length === 0 && !isLoading;

  return (
    <>
      <ul className="posts__lists">
        {data.length !== 0 &&
          data.map((post) => (
            <PostItem
              key={post.id}
              currentUserId={userId}
              isAdmin={isAdmin}
              {...post}
            />
          ))}
      </ul>

      {showNoResults && <NoResults />}
    </>
  );
}

export default PostList;
