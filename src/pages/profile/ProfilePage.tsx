import { useState } from 'react';
import { useAppSelector } from '@/store';

import {
  ProfileView,
  EditeProfileForm,
  ProfilePostList,
} from '@/components';

import './ProfilePage.css';

function ProfilePage() {
  const { data, error } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <section className="profile">
      {!isEditing && (
        <ProfileView {...data} openEditMode={() => setIsEditing(true)} />
      )}

      {isEditing && (
        <EditeProfileForm
          closeEditMode={() => setIsEditing(false)}
          {...data}
          errors={error.validationErrors}
        />
      )}

      <ProfilePostList userId={data.id} />


    </section>
  );
}

export default ProfilePage;
