import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test('order phases for happy path', async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '2');

  const cherriesTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
  userEvent.click(cherriesTopping);
  
  // find and click order button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.click(orderSummaryButton);

  // // SUMMARY PAGE: 
  //check summary info base on order
  const summaryPageHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryPageHeading).toBeInTheDocument();

  const scoopsSummary = screen.getByText('Scoops $', { exact: false });
  expect(scoopsSummary).toHaveTextContent('4.00');
  expect(screen.getByText('2 Vanilla')).toBeInTheDocument();

  const toppingsSummary = screen.getByText('Toppings $', { exact: false });
  expect(toppingsSummary).toHaveTextContent('1.50');
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // accept t&c and click confirm order btn
  const termsAndConditions = screen.getByRole('checkbox', { name: /terms and conditions/i });
  userEvent.click(termsAndConditions);

  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
  userEvent.click(confirmOrderButton);

  // CONFIRMATION PAGE: 

  // loading
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();

  // remove loading
  const loaded = screen.queryByText(/loading/i);
  expect(loaded).not.toBeInTheDocument();

  // confirm we have order number
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button in confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderButton);

  // BACK TO ORDER ENTRY
  // check that scoops and toppings subtotal have been reset
  const scoopsSubTotal = screen.getByText('Scoops total $', { exact: false });
  expect(scoopsSubTotal).toHaveTextContent('0.00');

  const toppingsSubTotal = screen.getByText('Toppings total $', { exact: false });
  expect(toppingsSubTotal).toHaveTextContent('0.00');

  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('do not display toppings heading if no toppings are ordered', async () => {
  render(<App />);

  // add ice cream scoops
  const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '2');

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.click(orderSummaryButton);


  // SUMMARY
  const summaryPageHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryPageHeading).toBeInTheDocument();

  const scoopsSummary = screen.getByText('Scoops $', { exact: false });
  expect(scoopsSummary).toBeInTheDocument();

  const toppingsSummary = screen.queryByText('Toppings $', { exact: false });
  expect(toppingsSummary).not.toBeInTheDocument();
});

