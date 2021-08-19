import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';
import userEvent from '@testing-library/user-event';

test('handle error for scoops and toppings route', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      ctx.status(500)
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      ctx.status(500)
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
  
});

test('disable order button if no scoops added', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderBtn = screen.getByRole('button', { name: /order sundae/i });
  expect(orderBtn).toBeDisabled();

  const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '1');
  expect(orderBtn).toBeEnabled();

  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '0');
  expect(orderBtn).toBeDisabled();
});
