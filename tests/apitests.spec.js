import { test, expect, request } from '@playwright/test';
import { DashBoardPage } from '../src/pages/DashBoardPage';
import { GaragePage } from '../src/pages/GaragePage';
import { LoginForm } from '../src/pages/LoginForm';

/** @type {DashBoardPage} */
let dashBoardPage;
/** @type {GaragePage} */
let garagePage;
/** @type {LoginForm} */
let loginForm;

test.describe('API tests', () => {

    test('Can mock username on API', async ({ page }) => {
        
        await page.route('https://qauto.forstudy.space/api/users/profile', async route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                json: {
                    data: {
                        userId: 261546,
                        photoFilename: "default-user.png",
                        name: "John",
                        lastName: "Smith",
                    }
                }
            });
        });

        await page.goto('/panel/profile')
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/profile')
        await expect(page.locator('.profile_name')).toHaveText('John Smith');
    });

    test('Can successfully add a car', async ({ request }) => {

        const response = await request.post('/api/cars',
            {
                data: {
                    carBrandId: 1,
                    carModelId: 1,
                    mileage: 122
                }

            }
        )
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body).toEqual(
            expect.objectContaining({
                data: expect.objectContaining({
                    carBrandId: 1,
                    carModelId: 1,
                    mileage: 122,
                }),
            })
        );
    });

     test('Error if mileage is more than 999999', async ({ request }) => {

        const response = await request.post('/api/cars',
            {
                data: {
                    carBrandId: 1,
                    carModelId: 1,
                    mileage: 1000000
                }

            }
        )
        expect(response.status()).toBe(400);
        
    });

    test('Error if mileage is blank', async ({ request }) => {

        const response = await request.post('/api/cars',
            {
                data: {
                    carBrandId: 1,
                    carModelId: 1                
                }

            }
        )
        expect(response.status()).toBe(400);
        
    });


})
