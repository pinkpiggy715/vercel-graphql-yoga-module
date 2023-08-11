import { Request, Response } from 'express';
import fs from 'fs';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import { getLocaleFromReq } from './request.controller';

export const getTranslationsController = (req: Request, res: Response): void => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const locale = getLocaleFromReq(req);
  const filePath = path.join(__dirname, '..', `public/translations/`);
  const options = {
    cacheControl: true,
    dotfiles: 'deny',
    maxAge: '12h',
    root: filePath,
  };

  if (fs.existsSync(path.join(filePath, `${locale}.json`))) {
    // @ts-ignore
    res.sendFile(`${locale}.json`, options);
  } else {
    // @ts-ignore
    res.sendFile(`en_US.json`, options);
  }
};
