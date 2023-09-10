import { AnyZodObject } from 'zod';

type requestValidaton = {
  params? : AnyZodObject,
  body?   : AnyZodObject,
  query?  : AnyZodObject,
}

export default requestValidaton; 