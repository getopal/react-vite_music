import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
interface Track {
  id: string;
  title: string;
  text: string;
  audioUrl: string;
  artist: string;
}

export const Tracks: FC = () => {
  const user = JSON.parse(Cookies.get('user') ?? 'null'); // Handle case where cookie is not found
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      if (!user || !user.id) { // Handle case when user is null or user.id undefined
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/tracks/${user.id}`);
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        // Consider showing an error message to the user
      } finally {
        setLoading(false);
      }
    };

    void fetchTracks();
  }, [user]); // Include user in dependency array, as this value may change


  if (loading) return <div>Загрузка...</div>;

  if (!user || !user.id) return <p className="text-gray-500">Вы не авторизованы</p>

  return (
      <div className="flex flex-col justify-center mt-10">
        {tracks.map((track) => (
            <div key={track.id} className="p-4 border-b border-gray-200 rounded-lg bg-white shadow-md mb-4">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xl font-semibold text-gray-800">{track.artist}</p>
                <span className="text-gray-500">-</span>
                <h3 className="text-xl font-semibold text-gray-900">{track.title}</h3>
              </div>
              <div className="relative">
                <audio controls className="w-full rounded-md overflow-hidden">
                  <source src={track.audioUrl} type="audio/mpeg"/>
                  Your browser does not support the audio element.
                </audio>
                <div className="absolute top-0 left-0 right-0 h-full pointer-events-none">
                  <div className="absolute inset-0 bg-gray-200 opacity-0 hover:opacity-10 duration-300 transition-opacity"></div>
                </div>
              </div>
            </div>
        ))}
        {!tracks.length && <p className="text-gray-500">Вы ещё не добавили треки</p>}
      </div>

  );
};

export default Tracks;