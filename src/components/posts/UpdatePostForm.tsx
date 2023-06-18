import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { useAppDispatch } from '@/store';
import { clearValidationError, resetValidationErrors } from '@/store/posts';
import { PostResetAction, FileData } from '@/store/types';

import { NotificationContext } from '@/context/NotificationContext';

import { useUpdatePost } from '@/hooks';

import formattedDate from '@/utils/formattedDate';

import { BaseIcon, Avatar, PostImage, BlueButton } from '@/components';

import './UpdatePostForm.css';

interface CreatePostFormProps {
  postId: number;
  username: string;
  avatar: string | null;
  content: string;
  file: FileData | null;
  createdAt: string;
  closeForm: () => void;
}

function UpdatePostForm({
  postId,
  username,
  avatar,
  content,
  file,
  createdAt,
  closeForm,
}: CreatePostFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const notificationContext = useContext(NotificationContext);
  const [contentValue, setContentValue] = useState<string>(content);
  const [validationError, setValidationError] = useState<string>('');
  const { updatePost } = useUpdatePost(notificationContext);

  const contentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(event.currentTarget.value);
    if (validationError) {
      dispatch(clearValidationError({ field: PostResetAction.CONTENT }));
      setValidationError('');
    }
  };

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    updatePost(postId, contentValue, closeForm, setValidationError);
  };

  const closeHandler = () => {
    dispatch(resetValidationErrors());
    closeForm();
  };

  const postDate = formattedDate(createdAt, 'Y-ML-D');

  const contentError = classNames('update-post__error', {
    'update-post__error--active': validationError,
  });

  return (
    <>
      <form className="update-post__form" onSubmit={formHandler}>
        <div className="update-post__header">
          <div className="update-post_user">
            <Avatar isCircle size="50px" src={avatar || ''} />
            <div className="update-post_info">
              <p className="update-post_name">{username || ''}</p>
              <p className="update-post_date">{postDate}</p>
            </div>
          </div>

          <button
            type="button"
            className="update-post__exit"
            onClick={closeHandler}
            aria-label="Close comment form"
          >
            <BaseIcon name="RxCross2" />
          </button>
        </div>

        <div className="update-post__textarea">
          <textarea
            maxLength={600}
            value={contentValue}
            onChange={contentHandler}
            placeholder={t('placeholder_content_post') as string}
          />
          <p className={contentError}>{validationError}</p>
        </div>

        {file ? (
          <PostImage size="600px" src={file?.filename} />
        ) : (
          <hr className="update-post_hr" />
        )}

        <div className="update-post_actions">
          <BlueButton type="submit" isRounded>
            {t('button_save')}
          </BlueButton>
        </div>
      </form>
    </>
  );
}

export default UpdatePostForm;
