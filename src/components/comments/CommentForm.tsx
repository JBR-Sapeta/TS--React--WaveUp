import { useState, FormEvent, useContext, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { useAppSelector } from '@/store';

import { NotificationContext } from '@/context/NotificationContext';

import { useCreateComment, useUpdateComment } from '@/hooks';

import formattedDate from '@/utils/formattedDate';

import { Avatar, BaseIcon, BlueButton } from '@/components';

import './CommentForm.css';

interface CommentFormProps {
  postId: number;
  commentId: number | null;
  closeForm: () => void;
  content: string;
}

function CommentForm({
  postId,
  commentId,
  closeForm,
  content,
}: CommentFormProps) {
  const { t } = useTranslation();
  const authData = useAppSelector((state) => state.auth.data);
  const notificationContext = useContext(NotificationContext);
  const [contentValue, setContentValue] = useState<string>(content);
  const [validationError, setValidationError] = useState<string>('');
  const { createComment } = useCreateComment(notificationContext);
  const { updateComment } = useUpdateComment(notificationContext);

  const contentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(event.currentTarget.value);
    if (validationError) {
      setValidationError('');
    }
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (commentId) {
      updateComment(
        commentId,
        postId,
        contentValue,
        closeForm,
        setValidationError
      );
    } else {
      createComment(postId, contentValue, closeForm, setValidationError);
    }
  };

  const now = new Date().toDateString();
  const date = formattedDate(now, 'Y-ML-D');

  const commentError = classNames('comment-form__error', {
    'comment-form__error--active': validationError,
  });

  return (
    <form onSubmit={submitHandler} className="comment-form">
      <div className="comment-form__header">
        <div className="comment-form__user">
          <Avatar isCircle size="32px" src={authData.avatar || ''} alt="User" />

          <div className="comment-form__info">
            <p className="comment-form__name">{authData.username}</p>
            <p className="comment-form__date">{date}</p>
          </div>
        </div>

        <button
          type="button"
          className="comment-form__exit"
          onClick={closeForm}
          aria-label="Close comment form"
        >
          <BaseIcon name="RxCross2" />
        </button>
      </div>

      <div className="comment-form__input">
        <textarea
          placeholder={t('placeholder_content_comment') as string}
          maxLength={550}
          value={contentValue}
          onChange={contentHandler}
        ></textarea>
        <p className={commentError}>{validationError}</p>
      </div>

      <div className="comment-form__submit">
        <BlueButton isRounded type="submit">
          {t('button_save')}
        </BlueButton>
      </div>
    </form>
  );
}

export default CommentForm;
