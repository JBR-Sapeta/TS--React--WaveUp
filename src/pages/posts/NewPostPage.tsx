import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAppSelector } from '@/store';

import { CreatePostForm } from '@/components';

import ROUTER_PATHS from '@/routes';

import './NewPostPage.css';

const pageAnimation = {
  initial: { x: 300  },
  animate: { x: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function NewPostPage() {
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth.data);

  const cloesFormHandler = () => {
    navigate(ROUTER_PATHS.posts);
  };

  return (
    <motion.section {...pageAnimation} className="new-post">
      <CreatePostForm
        closeForm={() => cloesFormHandler()}
        username={authState.username}
        avatar={authState.avatar}
      />
    </motion.section>
  );
}

export default NewPostPage;
