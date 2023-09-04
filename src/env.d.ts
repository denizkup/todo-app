declare global{
    namespace NodeJS{
        interface ProcessEnv{
            API_PORT     :string,
            NODE_ENV     :'development' | 'production',
            DATABASE_URL :string,
        }
    }
}

export {}