import { render, screen } from "../../../test-utils/testing-library-utils"; 
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total $", { exact: false });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesTopping);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total $", { exact: false });
    expect(grandTotal).toHaveTextContent('0.00');

    const cherriesTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesTopping);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total $", { exact: false });
    expect(grandTotal).toHaveTextContent('0.00');

    // add cherries
    const cherriesTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesTopping);
    expect(grandTotal).toHaveTextContent('1.50');

    // add 2 vanilla scoops
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');

    // remove 1 scoop and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });
});
