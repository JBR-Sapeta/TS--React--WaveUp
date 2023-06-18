import { UserPreviewData } from '@/store/types';

import { UserPreview, NoResults } from '@/components';

import './UserList.css';

interface UserListProsp {
  data: Array<UserPreviewData>;
}

function UsersList({ data }: UserListProsp) {
  return (
    <ul className="users__list">
      {data.map((user) => (
        <UserPreview key={user.id} {...user} />
      ))}
    </ul>
  );
}

export default UsersList;
