iRacing week planner
====================

This is a ES6/React/Webpack app.

## Setup

Install NPM packages:

```
npm install
```

Set environment variables `IWP_USERNAME` and `IWP_PASSWORD` to your iRacing login details and run the 'scrapeData' NPM script:

```
npm run scrapeData
```

If using **VS Code** you can just update the values in `.vscode/tasks.json` and run the 'Scrape data' configuration (from the Debug tab). 

```json
{
    /* ... */
    "env": {
        "IWP_USERNAME": "<IRACING USERNAME>",
        "IWP_PASSWORD": "<IRACING PASSWORD>"
    }
}
```

Start the server:

```
npm start
```

Open http://localhost:3000

## Debugging with VS Code

Press F5 (launch the 'Debug with Chrome' configuration) after starting the server with `npm start`.