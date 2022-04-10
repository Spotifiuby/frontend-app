import { render } from '@testing-library/react-native';
import App from '../App';

test('basic test', () => {
  const { getByText } = render(<App />);

  const mainText = getByText(/Open up/);
  expect(mainText).not.toBeEmpty();
});
