declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }

  declare namespace Multer {
    export interface File {
      key: string;
      location?: string;
    }
  }
}
