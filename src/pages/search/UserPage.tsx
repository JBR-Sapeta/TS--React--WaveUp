import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/store';
import getUser from '@/store/users/thunks/getUser';

import { UserView, UserPostList, NoResults } from '@/components';

import './UserPage.css';

function UserPage() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const {
    auth: { data },
    users: { user },
  } = useAppSelector((state) => state);
  const id = Number(userId);

  useEffect(() => {
    if (id) {
      dispatch(getUser({ userId: id }));
    }
  }, [userId]);

  return (
    <section className="user">
      {user && (
        <>
          <UserView isModerator={data.isAdmin} {...user} />
          <UserPostList userId={id} username={user.username} />
        </>
      )}
      {!user && <NoResults />}
    </section>
  );
}

export default UserPage;
