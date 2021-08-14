import { render, screen } from "../../../test-utils/testing-library-utils"; 
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
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(subTotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings"/>);

  // toppings subtotal by default should be $0.00
  const subTotal = screen.getByText("Toppings total $", { exact: false });
  expect(subTotal).toHaveTextContent('0.00');

  // check cherry topping and update subtotal
  const cherriesToppingCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
  userEvent.click(cherriesToppingCheckbox);
  expect(subTotal).toHaveTextContent('1.50');

  // check M&Ms topping and update subtotal
  const mAndMsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
  userEvent.click(mAndMsCheckbox);
  expect(subTotal).toHaveTextContent('3.00');
});
