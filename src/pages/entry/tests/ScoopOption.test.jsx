import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test('add invalid class when scoop option has invalid value', async () => {
  render(<Options optionType="scoops" />);

  // negative value
  const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '-1');
  expect(vanillaScoop).toHaveClass('is-invalid');

  // decimal value
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '4.5');
  expect(vanillaScoop).toHaveClass('is-invalid');

  // too high
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '30');
  expect(vanillaScoop).toHaveClass('is-invalid');

  // replace to valid value
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '2');
  expect(vanillaScoop).not.toHaveClass('is-invalid');
});

