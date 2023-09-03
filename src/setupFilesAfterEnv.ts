import connection from "./db";

global.afterAll( async() => {

  await new Promise(res => setTimeout(res, 500)); // avoid jest open handle error
  await connection.close();

});
