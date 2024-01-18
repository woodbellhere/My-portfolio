declare module "express" {
  interface Express {
    (): App;
    Router(): Router;
  }
  interface Router {
    get(path: string, cb: (req: any, res: any) => void): void;
  }
  interface App {
    use(path: string, router: any): void;
    listen(port: number, callback: () => void): void;
  }

  const express: Express;

  export default express;
}
