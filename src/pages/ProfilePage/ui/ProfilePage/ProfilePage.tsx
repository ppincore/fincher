import { memo } from 'react';
import { ProfileForm } from '@features/Authentication';
import { Page } from '@widgets/Page';

const ProfilePage = memo(function ProfilePage() {
  return (
    <Page>
      <ProfileForm />
    </Page>
  );
});

ProfilePage.displayName = 'ProfilePage';

export default ProfilePage;
