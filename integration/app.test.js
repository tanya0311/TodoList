describe('AddItemForm', () => {
   it('base example, visually looks correct', async () => {
       // APIs from jest-puppeteer
       await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-for-exampl&viewMode=story');
       const image = await page.screenshot();

       // API from jest-image-snapshot
       expect(image).toMatchImageSnapshot();
   });
});
describe('AppWithRedux', () => {
   it('base example, visually looks correct', async () => {
       // APIs from jest-puppeteer
       await page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-example&viewMode=story');
       const image = await page.screenshot();

       // API from jest-image-snapshot
       expect(image).toMatchImageSnapshot();
   });
});
describe('TaskIsDone', () => {
   it('base example, visually looks correct', async () => {
       // APIs from jest-puppeteer
       await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-done-example&viewMode=story');
       const image = await page.screenshot();

       // API from jest-image-snapshot
       expect(image).toMatchImageSnapshot();
   });
});
describe('TaskNotDone', () => {
   it('base example, visually looks correct', async () => {
       // APIs from jest-puppeteer
       await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-not-done-example&viewMode=story');
       const image = await page.screenshot();

       // API from jest-image-snapshot
       expect(image).toMatchImageSnapshot();
   });
});
