import dbConnect from '../../lib/dbConnect'

export default async function handler(req, res) {
  try {
    await dbConnect()
    res.status(200).json({ message: 'Database connected successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to database', error: error.message })
  }
}