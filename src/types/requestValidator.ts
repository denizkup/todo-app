import { AnyZodObject } from 'zod';

type requestValidator = {
  params? : AnyZodObject,
  body?   : AnyZodObject,
  query?  : AnyZodObject,
}

export default requestValidator; 