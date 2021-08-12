import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  // find images where name ends with 'scoop'
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altTexts = scoopImages.map(element => element.alt);
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  // find images where name ends with 'topping'
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altTexts = toppingImages.map((element) => element.alt);
  expect(altTexts).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping'
  ]);
});
