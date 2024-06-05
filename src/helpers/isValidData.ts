import { TaskData } from '../types';

export const isValidData = (data: unknown): data is TaskData[] => {
  if (typeof data !== 'string') return false;

  const jsonData = JSON.parse(data);

  if (!Array.isArray(jsonData)) return false;

  for (const item of jsonData) {
    if (!isValidDataFields(item)) {
      return false;
    }
  }

  return true;
};

export const isValidDataFields = (item: unknown): item is TaskData => {
  if (!item || typeof item !== 'object') {
    return false;
  }

  if (!('id' in item) || !('title' in item) || !('state' in item)) {
    return false;
  }

  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    (item.state === 'active' || item.state === 'completed')
  );
};
