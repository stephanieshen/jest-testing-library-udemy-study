import { waitForElementToBeRemoved } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test('checkbox is unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole('button', {
    name: /confirm order/i
  });
  expect(button).toBeDisabled();
});

test('checking the checkbox enables the button and unchecking it disables the button', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });
  const button = screen.getByRole('button', {
    name: /confirm order/i
  });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);

  // popover is hidden by default
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears when hovering on checbox label
  const tc = screen.getByText(/terms and conditions/i);
  userEvent.hover(tc);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  
  // popover disappears when mouse out
  userEvent.unhover(tc);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
