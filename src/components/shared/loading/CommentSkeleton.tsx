import './CommentSkeleton.css';

function CommentSkeleton() {
  return (
    <article className="comment-skeleton ">
      <div className="comment-skeleton__info">
        <div className="comment-skeleton__avatar skeleton-animation "></div>
        <div className="comment-skeleton__header skeleton-animation"></div>
      </div>
      <div>
        <div className="comment-skeleton__text skeleton-animation"></div>
        <div className="comment-skeleton__text skeleton-animation"></div>
        <div className="comment-skeleton__text skeleton-animation"></div>
      </div>
    </article>
  );
}

export default CommentSkeleton;
