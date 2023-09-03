declare global{
    namespace NodeJS{
        interface ProcessEnv{
            API_PORT    :string,
            NODE_ENV    :'development' | 'production',
            DB_USERNAME :string,
            DB_PASSWORD :string,
            DB_DATABASE :string,
            DB_HOST     :string
        }
    }
}

export {}