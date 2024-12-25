import { FC, useEffect, useState, useRef } from 'react';
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
  const [hasFetched, setHasFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    const fetchTracks = async () => {
      if (!user || !user.id || hasFetched) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/tracks/${user.id}`);
        setTracks(response.data);
        setFilteredTracks(response.data)
        setError(null);
        setHasFetched(true);
      } catch (err) {
        console.error('Error fetching tracks:', err);
        setError('Failed to load user tracks, please try again later');
      } finally {
        setLoading(false);
      }
    };

    void fetchTracks();
  }, [user, hasFetched]);


  useEffect(() => {
    const filterTracks = () => {
      if (!searchTerm) {
        setFilteredTracks(tracks);
        return;
      }
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = tracks.filter((track) => {
        return (
            track.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            track.artist.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
      setFilteredTracks(filtered);
    };
    filterTracks();
  }, [searchTerm, tracks]);

  const handleDeleteTrack = async (trackId: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/tracks/${trackId}`);
      setTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackId));
      setFilteredTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackId));
      setError(null);
      if(playingTrackId === trackId) {
        setPlayingTrackId(null);
      }
    } catch (err) {
      console.error('Error deleting track:', err);
      setError('Failed to delete track, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePlayTrack = (trackId: string) => {
    if (playingTrackId === trackId) {
      if (audioRefs.current[trackId]) {
        audioRefs.current[trackId].pause();
      }
      setPlayingTrackId(null);
    } else {
      if (playingTrackId && audioRefs.current[playingTrackId]) {
        audioRefs.current[playingTrackId].pause();
        audioRefs.current[playingTrackId].currentTime = 0;
      }
      setPlayingTrackId(trackId);
      if(audioRefs.current[trackId]){
        audioRefs.current[trackId].play();
      }
    }
  };

  const playNextTrack = () => {
    if (!playingTrackId) return;

    const currentIndex = filteredTracks.findIndex((track) => track.id === playingTrackId);

    if (currentIndex < filteredTracks.length - 1) {
      handlePlayTrack(filteredTracks[currentIndex + 1].id);
    } else {
      setPlayingTrackId(null)
    }
  };

  if (loading) return <div>Загрузка...</div>;

  if (!user || !user.id) return <p className="text-gray-500">Вы не авторизованы</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
      <div className="flex flex-col justify-center mt-10">
        <div className="mb-4 flex justify-center ">
          <input
              type="text"
              placeholder="Поиск треков..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded-full bg-slate-800 text-white border-gray-700"
          />
        </div>
        {filteredTracks.map((track) => (
            <div key={track.id} className="p-4 border-b border-gray-200 rounded-lg bg-white shadow-md mb-4 relative">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xl font-semibold text-gray-800">{track.artist}</p>
                <span className="text-gray-500">-</span>
                <h3 className="text-xl font-semibold text-gray-900">{track.title}</h3>
              </div>
              <div className="relative">
                <audio
                    controls
                    ref={el => {if(el) audioRefs.current[track.id] = el}}
                    className="w-full rounded-md overflow-hidden"
                    onEnded={playNextTrack}
                    src={track.audioUrl}
                    type="audio/mpeg"
                >
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
              <button
                  onClick={() => handlePlayTrack(track.id)}
                  className='absolute top-2 right-12 p-2 text-gray-700 hover:bg-gray-300 rounded-full'
              >
                {playingTrackId === track.id ? '⏸️' : '▶️'}
              </button>
            </div>
        ))}
        {!filteredTracks.length && <p className="text-gray-500">Нет треков, соответствующих поисковому запросу</p>}
      </div>
  );
};

export default Tracks;