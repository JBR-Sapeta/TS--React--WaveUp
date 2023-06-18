import notFound from '@/assets/not_found.svg';
import { motion } from 'framer-motion';

import './NoResults.css';

const noResultsAnimation = {
  initial: { scale: 0.1 },
  animate: { scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

function NoResults() {
  return (
    <motion.div {...noResultsAnimation} className="no-results">
      <picture className="no-results__picture ">
        <img src={notFound} alt="No results" className="no-results__img" />
      </picture>
    </motion.div>
  );
}

export default NoResults;
