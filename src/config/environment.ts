import 'dotenv/config'

const config = {
  db: process.env.DB_URL,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_API_KEY,
  SUPABASE_BUCKET: process.env.SUPABASE_BUCKET
}

export default config
