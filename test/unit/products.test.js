//describe로 그룹화
describe('calucation', () => {
  test('2 더하기 2는 4', () => {
    expect(2 + 2).toBe(4);
  });

  test('2 더하기 2는 5가 아님', () => {
    expect(2 + 2).not.toBe(5);
  });
});
