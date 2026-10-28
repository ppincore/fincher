import { FC, lazy } from 'react';

export const ProfilePageAsync = lazy<FC>(() => import('./ProfilePage'));
