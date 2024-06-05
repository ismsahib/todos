import { isValidData } from './isValidData';

describe('isValidData function to validate data from localstorage', () => {
  test('"[{"id": "1", "title": "test", "state": "active"}]" should result in "true"', () => {
    expect(isValidData('[{ "id": "1", "title": "test", "state": "active" }]')).toBe(true);
  });
  test('"["test"]" should result in "false"', () => {
    expect(isValidData('["test"]')).toBe(false);
  });
  test('"[{ "id": "1", "title": "test", "state": "hello" }]" should result in "false"', () => {
    expect(isValidData('["test"]')).toBe(false);
  });
  test('"[]" should result in "true"', () => {
    expect(isValidData('[]')).toBe(true);
  });
  test('"[{ "id": "1", "title": "test", "state": "completed" }]" should result in "true"', () => {
    expect(isValidData('[{ "id": "1", "title": "test", "state": "completed" }]')).toBe(true);
  });
  test('"[{ "id": 1, "title": "test", "state": "completed" }]" should result in "false"', () => {
    expect(isValidData('[{ "id": 1, "title": "test", "state": "completed" }]')).toBe(false);
  });
  test('"[{ "id": "1", "title": 2, "state": "completed" }]" should result in "false"', () => {
    expect(isValidData('[{ "id": "1", "title": 2, "state": "completed" }]')).toBe(false);
  });
  test('"[{ "id": "1", "title": "test" }]" should result in "false"', () => {
    expect(isValidData('[{ "id": "1", "title": "test" }]')).toBe(false);
  });
  test('"[{ "id": "1", "state": "completed" }]" should result in "false"', () => {
    expect(isValidData('[{ "id": "1", "state": "completed" }]')).toBe(false);
  });
  test('"[{"state": "completed", "title": "test" }]" should result in "false"', () => {
    expect(isValidData('[{ "state": "completed", "title": "test" }]')).toBe(false);
  });
});
