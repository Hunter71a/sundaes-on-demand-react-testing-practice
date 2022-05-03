import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType='scoops' />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'vanilla',
  });
  user.clear(vanillaInput);
  user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check the subtotal (which should be 6.00 with 3 scoops total at $2 per scoop)
  const chocolateInput = await screen.findAllByRole('spinbutton', {
    name: 'chocolate',
  });
  user.clear(chocolateInput);
  user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
