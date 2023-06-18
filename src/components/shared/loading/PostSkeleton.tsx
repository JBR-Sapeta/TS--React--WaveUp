import './PostSkeleton.css';

function PostSkeleton() {
  return (
    <article className="post-skeleton ">
      <div className="post-skeleton__info">
        <div className="post-skeleton__avatar skeleton-animation "></div>
        <div className="post-skeleton__header skeleton-animation"></div>
      </div>
      <div className="post-skeleton__data">
        <div className="post-skeleton__text skeleton-animation"></div>
        <div className="post-skeleton__text skeleton-animation"></div>
        <div className="post-skeleton__text skeleton-animation"></div>
        <div className="post-skeleton__text skeleton-animation"></div>
        <div className="post-skeleton__text skeleton-animation"></div>
      </div>
      <div className="post-skeleton__image skeleton-animation"></div>
      <div className="post-skeleton__actions">
        <div className="post-skeleton__buttons skeleton-animation"></div>
        <div className="post-skeleton__buttons skeleton-animation"></div>
      </div>
    </article>
  );
}

export default PostSkeleton;
