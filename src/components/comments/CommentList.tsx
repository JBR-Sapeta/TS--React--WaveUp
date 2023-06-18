import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store';
import { useGetComments } from '@/hooks';

import { Comment, CommentForm, CommentActions, Skeleton } from '@/components';

import './CommentList.css';
import { NotificationContext } from '@/context/NotificationContext';

interface CommentListProps {
  postId: number;
  closeList: () => void;
}

function CommentList({ postId, closeList }: CommentListProps) {
  const { t } = useTranslation();
  const comments = useAppSelector((state) => state.comments.list);
  const authData = useAppSelector((state) => state.auth.data);
  const notificationContext = useContext(NotificationContext);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getComments } = useGetComments(notificationContext);
  const closeForm = () => setIsFormOpen(false);

  const loadingHandler = (state: boolean) => {
    setIsLoading(state);
  };

  useEffect(() => {
    if (!comments[postId]) {
      getComments(postId, 0, loadingHandler);
    }
  }, []);

  const postHasComments = comments[postId] && comments[postId]?.data.length;
  const loadMore = comments[postId]?.page + 1 < comments[postId]?.totalPages;

  const loadComments = () => {
    if (loadMore) {
      getComments(postId, comments[postId]?.page + 1, loadingHandler);
    }
  };

  return (
    <>
      <hr className="comment-list__hr " />

      {postHasComments ? (
        <ul className="comments-list">
          {comments[postId].data.map((comment) => (
            <Comment
              key={comment.id}
              postId={postId}
              currentUserId={authData.id}
              isAdmin={authData.isAdmin}
              {...comment}
            />
          ))}
        </ul>
      ) : (
        <>
          {isLoading ? null : (
            <div className="comment-list__message">
              <p>{t('message_no_comments')}</p>
            </div>
          )}
        </>
      )}
      {isLoading ? <Skeleton type="Comments" /> : <></>}

      {isFormOpen && (
        <CommentForm
          postId={postId}
          commentId={null}
          content=""
          closeForm={closeForm}
        />
      )}
      <hr className="comment-list__hr " />
      <CommentActions
        loadMore={loadMore}
        handleForm={() => setIsFormOpen((state) => !state)}
        loadComments={loadComments}
        closeList={closeList}
      />
    </>
  );
}

export default CommentList;
