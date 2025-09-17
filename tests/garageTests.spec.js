import { test } from '../src/fixtures/authorized';
import { LoginForm } from '../src/pages/LoginForm';
import { DashBoardPage } from '../src/pages/DashBoardPage';
import { GaragePage } from '../src/pages/GaragePage';

test('Garage page can be opened', async ({ garagePage }) => {
    await garagePage.isVisible();
    await garagePage.clickAddCarBtn();
    await garagePage.fillCarMileage('120');
    await garagePage.clickAddBtn();
    await garagePage.checkCarExists();

})