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

test('popover starts out hidden', async () => {
  render(<SummaryForm />);
  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  await expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/);
  expect(popover).toBeInTheDocument();
  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  const nullPopoverAgain = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopoverAgain).not.toBeInTheDocument();
});
