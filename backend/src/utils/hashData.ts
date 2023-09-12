import bcrypt from "bcrypt";

const saltRounds = 12;
let txtPrefix    = process.env.HASH_PREFIX ||  "top-secret-hash-prefix";


async function hash(text:string):Promise<string>{
    return await bcrypt.hash(`${txtPrefix}${text}`,saltRounds);
}

async function compare(text:string,hashed_text:string):Promise<boolean>{
    return await bcrypt.compare(`${txtPrefix}${text}`,hashed_text);
}

export default {
    hash,
    compare
}