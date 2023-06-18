import { BaseIcon, GrayButton } from '@/components';
import { useTranslation } from 'react-i18next';

import './CommentActions.css';

interface CommentActionsProps {
  loadMore: boolean;
  handleForm: () => void;
  loadComments: () => void;
  closeList: () => void;
}

function CommentActions({
  loadMore,
  handleForm,
  loadComments,
  closeList,
}: CommentActionsProps) {
  const { t } = useTranslation();
  return (
    <div className="comment-list__actions">
      <GrayButton
        onClick={handleForm}
        type="button"
        height="36px"
        fixedWidth="160px"
        isRounded
        isGreen
      >
        <BaseIcon name="MdAdd" />
        {t('button_add')}
      </GrayButton>
      <GrayButton
        type="button"
        height="36px"
        fixedWidth="160px"
        isRounded
        isDisabled={!loadMore}
        onClick={loadComments}
      >
        <BaseIcon name="MdOutlineRefresh" />
        {t('button_more')}
      </GrayButton>
      <GrayButton
        type="button"
        height="36px"
        fixedWidth="160px"
        isRounded
        isRed
        onClick={closeList}
      >
        <BaseIcon name="MdClose" />
        {t('button_close')}
      </GrayButton>
    </div>
  );
}

export default CommentActions;
