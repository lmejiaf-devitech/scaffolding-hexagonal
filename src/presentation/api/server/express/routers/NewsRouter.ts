import express, { Request, Response, Router, NextFunction } from "express";




const newsRouterV1: Router = express.Router();

newsRouterV1.post("/create-news", (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log(request.body)
});

newsRouterV1.get("/read-news", (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log(request.body)
});

newsRouterV1.put("/update-news", (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log(request.body)
});

newsRouterV1.delete("/delete-news", (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log(request.body)
});

// const newsRouterV2: Router = express.Router();
// const newsRouterV3: Router = express.Router();
// const newsRouterVN: Router = express.Router();


export { newsRouterV1 }