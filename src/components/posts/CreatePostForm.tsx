import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '@/store';
import { clearValidationError, resetValidationErrors } from '@/store/posts';
import { PostResetAction } from '@/store/types';

import { NotificationContext } from '@/context/NotificationContext';

import convertToBase64 from '@/utils/convertToBase64';

import { useCreatePost } from '@/hooks';

import { BaseIcon, GrayButton, Avatar, PostImage } from '@/components';

import './CreatePostForm.css';

interface CreatePostFormProps {
  closeForm: () => void;
  username: string;
  avatar: string | null;
}

function CreatePostForm({ closeForm, username, avatar }: CreatePostFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { validationErrors } = useAppSelector((state) => state.posts.error);
  const notificationContext = useContext(NotificationContext);
  const { createPost } = useCreatePost(notificationContext);
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const contentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
    if (validationErrors?.content) {
      dispatch(clearValidationError({ field: PostResetAction.CONTENT }));
    }
  };

  const fileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    let file, base64;
    if (event.currentTarget.files) {
      file = event.currentTarget.files[0];
      base64 = await convertToBase64(file);
      if (typeof base64 === 'string') {
        setImage(base64);
        setFile(file);
      }
    }
    if (validationErrors?.file) {
      dispatch(clearValidationError({ field: PostResetAction.FILE }));
    }
  };

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    createPost(content, file, closeForm);
  };

  const closeHandler = () => {
    dispatch(resetValidationErrors());
    closeForm();
  };

  const resetHandler = () => {
    setContent('');
    setImage('');
    setFile(null);
    dispatch(resetValidationErrors());
  };

  const imageError = classNames('create-post__error', {
    'create-post__error--active': validationErrors?.file,
  });
  const contentError = classNames('create-post__error', {
    'create-post__error--active': validationErrors?.content,
  });

  return (
    <>
      <form className="create-post__form" onSubmit={formHandler}>
        <div className="create-post__header">
          <div className="create-post__profile">
            <Avatar isCircle size="50px" src={avatar || ''} />
            <div className="create-post__user">
              <p>{username}</p>
            </div>
          </div>
          <button
            type="button"
            className="create-post__exit"
            onClick={closeHandler}
            aria-label="Close comment form"
          >
            <BaseIcon name="RxCross2" />
          </button>
        </div>

        <div className="create-post__textarea">
          <textarea
            maxLength={1100}
            value={content}
            onChange={contentHandler}
            placeholder={t('placeholder_content_post') as string}
          />
          <p className={contentError}>{validationErrors?.content || ''}</p>
        </div>

        <PostImage size="600px" src={image} />

        <div className="create-post__upload-container">
          <div className="create-post__upload">
            <label htmlFor="image">
              <BaseIcon name="MdCloudUpload" />
              {t("button_upload")}
            </label>
            <input id="image" type="file" onChange={fileHandler} />
            <p className={imageError}>{validationErrors?.file || ''}</p>
          </div>
        </div>

        <div className="create-post_actions">
          <GrayButton
            type="button"
            height="36px"
            isRounded
            fixedWidth="160px"
            onClick={resetHandler}
          >
            <BaseIcon name="MdOutlineRefresh" />
            {t("button_reset")}
          </GrayButton>
          <GrayButton
            type="submit"
            height="36px"
            isRounded
            isGreen
            fixedWidth="160px"
          >
            <BaseIcon name="MdAdd" />
            {t("button_add")}
          </GrayButton>
        </div>
      </form>
    </>
  );
}

export default CreatePostForm;
