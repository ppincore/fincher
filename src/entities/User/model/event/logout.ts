const eventName = 'logout-user';

const logoutEvent = new CustomEvent(eventName);

export const triggerLogoutEvent = () => document.dispatchEvent(logoutEvent);

export function listenLogoutEvent(cb: () => void) {
  document.addEventListener(eventName, cb);
  return {
    unsubscribeEvent: () => document.removeEventListener(eventName, cb),
  };
}
