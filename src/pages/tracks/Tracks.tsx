import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

interface Track {
  id: string
  title: string
  text: string
  audioUrl: string
  artist: string
}

export const Tracks: FC = () => {
  const user = JSON.parse(Cookies.get('user') ?? '')

  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tracks/${user.id}`)
        setTracks(response.data)
      } finally {
        setLoading(false)
      }
    }

    void fetchTracks()
  }, [])

  if (loading) return <div>Загрузка...</div>

  return (
    <div className="flex flex-col justify-center mt-10">
      {tracks.map((track) => (
        <div key={track.id} className="p-4 border-b border-gray-200">
          <h3 className="text-xl font-bold">{track.title}</h3>
          <p className="text-gray-600">{track.artist}</p>
          <audio controls className="w-full mt-2">
            <source src={track.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
      {!tracks.length && <p className="text-gray-500">Вы ещё не добавили треки</p>}
    </div>
  )
}

export default Tracks
