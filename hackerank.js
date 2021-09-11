let puppeteer = require('puppeteer');
let solutionsObj = require('./solutions');

let browserStartPromise = puppeteer.launch({
    //visibles
    headless:false,
    //type 1 second
    // slwoMo:1000,
    defaultViewport:null,
    //settings
    args:["--start-maximized","--disable-notifications"]
});

let page,browser;

(async function fn() {
    try{
        let browserObj = await browserStartPromise;
        console.log("Browser opened");
        browser = browserObj;
        //NEW TAB
        page = await browserObj.newPage();
        console.log("new tab opened");
        await page.goto("https://www.google.com/");
        console.log("Google Home Page Opened");
        await page.type("input[title='Search']","Hacker rank",{delay: 100});
        await page.keyboard.press('Enter',{delay: 100});
        await page.waitForSelector(".mslg.dmenKe .usJj9c .l",{visible:true});
        let array = await page.$$(".mslg.dmenKe .usJj9c .l");
        await array[0].click({delay:200});
        await page.waitForSelector('input[type="text"]',{visible:true});
        console.log("Enter id & password");
        await page.type('input[type="text"]',"gigere5125@drlatvia.com",{delay:50});
        await page.type('input[type="password"]',"gigere5125",{delay:50});
        await page.click('button[type="submit"]');
        await waitAndClick("#base-card-1-link",page);
        await waitAndClick('a[data-attr1="warmup"]',page);
        await page.waitForSelector('.content--list_body');
        let questionsArr = await page.$$('.content--list_body');
        console.log(questionsArr.length);
        await questionSolver(page, questionsArr[0],solutionsObj.array[0]);
    }catch(err){
        console.log(err);
    }
    
}) ()

function waitAndClick(selector,cPage) {
    (async function fn(){
        
        await cPage.waitForSelector(selector,{visible:true});
        await cPage.click(selector,{delay: 100});
    }) ()
}

function questionSolver(page,question,answer){

    (async function fn(){
            
        await question.click();
        await page.waitFor(3000);
        await waitAndClick(".checkbox-input",page);
        await page.waitForSelector('#input-1',{visible: true});
        await page.type("#input-1",answer);
        await page.keyboard.down("Control");
        await page.keyboard.press("A");
        await page.keyboard.press("X");
        await page.keyboard.up("Control");
        await page.click(".monaco-editor.no-user-select .vs");
        await page.keyboard.down("Control");
        await page.keyboard.press("A");
        await page.keyboard.press("V");
        await page.keyboard.up("Control");
        await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
        await page.waitForSelector('.ui-card.submission-congratulations.ui-layer-2');
        await page.click('a[data-attr1="Warm-up Challenges"]');
        
    
    }) ()
}

    

