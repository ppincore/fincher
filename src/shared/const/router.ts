export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  TRANSACTIONS = 'transactions',
  LOGIN = 'login',
  REGISTER = 'register',
  CONFIRM_EMAIL = 'confirm_email',
  RESET_PASSWORD = 'reset_password',
  SIDEBAR_LAYOUT = 'sidebar_layout',

  // last-one
  NOT_FOUND = 'not_found',
}

export enum Sections {
  TRANSACTIONS = 'Transactions',
}

export const getRouteMain = () => '/';
export const getRouteProfile = () => '/profile';
export const getRouteLogin = () => '/login';
export const getRouteResetPassword = () => '/reset-password';
export const getRouteRegister = () => '/register';
export const getRouteConfirmEmail = () => '/email-confirm';
export const getRouteTransactions = () => '/transactions';
