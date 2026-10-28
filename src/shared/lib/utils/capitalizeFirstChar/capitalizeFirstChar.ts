/**
 * Function for make first letter of your string capital
 * @param str - just regular string
 * @returns string with first letter in upperCase
 */

export function capitalizeFirstChar<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}
