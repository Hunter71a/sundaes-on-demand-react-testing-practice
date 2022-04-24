import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('checkbox is unchecked by default when page loads', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole('button', { name: /confirm order/i });
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('Clicking checkbox enables button and clicking a second time disables button', async () => {
  render(<SummaryForm />);
  // create the user
  const user = userEvent.setup();
  // get the checkbox
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  // get the button
  const button = screen.getByRole('button', { name: /confirm order/i });
  // check the checkbox
  await user.click(checkbox);
  expect(button).toBeEnabled();
  await user.click(checkbox);
  expect(button).toBeDisabled();
});
