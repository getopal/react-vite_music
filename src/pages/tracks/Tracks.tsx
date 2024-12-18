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
  const user = JSON.parse(Cookies.get('user') ?? 'null');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false); // new state to track if fetch happened

  useEffect(() => {
    const fetchTracks = async () => {
      if (!user || !user.id || hasFetched) { //  check if user is present and if data was already fetched
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/tracks/${user.id}`);
        setTracks(response.data);
        setError(null);
        setHasFetched(true); // set to true after a successful fetch
      } catch (err) {
        console.error('Error fetching tracks:', err);
        setError('Failed to load user tracks, please try again later');
      } finally {
        setLoading(false);
      }
    };

    void fetchTracks();
  }, [user, hasFetched]);  // hasFetched added to dependency array to run only on first render


  const handleDeleteTrack = async (trackId: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/tracks/${trackId}`);
      setTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackId));
      setError(null);
    } catch (err) {
      console.error('Error deleting track:', err);
      setError('Failed to delete track, please try again.');
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <div>Загрузка...</div>;

  if (!user || !user.id) return <p className="text-gray-500">Вы не авторизованы</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
      <div className="flex flex-col justify-center mt-10">
        {tracks.map((track) => (
            <div key={track.id} className="p-4 border-b border-gray-200 rounded-lg bg-white shadow-md mb-4 relative">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xl font-semibold text-gray-800">{track.artist}</p>
                <span className="text-gray-500">-</span>
                <h3 className="text-xl font-semibold text-gray-900">{track.title}</h3>
              </div>
              <div className="relative">
                <audio controls className="w-full rounded-md overflow-hidden">
                  <source src={track.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="absolute top-0 left-0 right-0 h-full pointer-events-none">
                  <div className="absolute inset-0 bg-gray-200 opacity-0 hover:opacity-10 duration-300 transition-opacity"></div>
                </div>
              </div>
              <button
                  className="absolute top-2 right-2 p-2 text-gray-700 hover:bg-gray-300 rounded-full"
                  onClick={() => handleDeleteTrack(track.id)}
                  aria-label="Delete track"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-4 w-4"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
        ))}
        {!tracks.length && <p className="text-gray-500">Вы ещё не добавили треки</p>}
      </div>
  );
};

export default Tracks;