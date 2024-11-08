export const PORT = `${import.meta.env.PORT}`

const dbname = `${import.meta.env.DB_NAME}`
export const mongoDBUrl = `${import.meta.env.mongoDBUrl}/${dbname}`