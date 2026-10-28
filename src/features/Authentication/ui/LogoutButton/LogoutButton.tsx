import { memo, useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useSelector } from 'react-redux';
import { userSelectors, userActions } from '@entities/User';
import { IconLucidLogout } from '@shared/assets/icons';
import { Icon } from '@shared/ui/Icon';
import { useAppDispatch } from '@shared/lib/hooks';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton = memo(function LogoutButton(
  props: LogoutButtonProps,
) {
  const { className } = props;
  const userEmail = useSelector(userSelectors.getUserEmail);
  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <Button
      onClick={logout}
      theme={ButtonTheme.OUTLINE}
      size={ButtonSize.S}
      className={className}
      addonRight={<Icon Svg={IconLucidLogout} />}
    >
      {userEmail}
    </Button>
  );
});

LogoutButton.displayName = 'LogoutButton';
