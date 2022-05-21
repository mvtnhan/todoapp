export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const objectKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>;
