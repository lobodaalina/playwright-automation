import { test as base } from '@playwright/test';
import { DashBoardPage } from '../pages/DashBoardPage';
import { GaragePage } from '../pages/GaragePage';

export const test = base.extend({
    dashBoardPage: async ({ page }, use) => {
        const dashBoardPage = new DashBoardPage(page);
        await dashBoardPage.visit();
        await dashBoardPage.isVisible();
        await use(dashBoardPage)
    },

    garagePage: async ({ authorized }, use) => {
        const garagePage = new GaragePage(authorized);
        await garagePage.visit();
        await use(garagePage)
    },

    authorized: async ({ page, request }, use) => {
        /*await request.fetch('https://qauto.forstudy.space/api/auth/signin', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            data: {
                "email": "lobodaalina99@gmail.com",
                "password": "123456Test",
                "remember": false
            }
        })*/
        await use(page);
    }

})