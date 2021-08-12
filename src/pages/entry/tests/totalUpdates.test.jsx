import { render, screen } from "@testing-library/react"; 
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // subtotal by default should be $0.00
  const subTotal = screen.getByText('Scoops total $', { exact: false });
  expect(subTotal).toHaveTextContent('0.00');

  // update vanilla scoop to 1 and update subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);     // *clear - clear text inside an input
  userEvent.type(vanillaInput, '1'); // *type - writes text inside an input
  expect(subTotal).toHaveTextContent('2.00');

  // update chocolate scoop to 2 and update subtotal
  const chocolateInput = screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(subTotal).toHaveTextContent('6.00');
});
