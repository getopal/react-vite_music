import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CreateTrackPayload {
  userId: number;
  title: string;
  text: string;
  audioUrl: string;
  artist: string;
}

const CreateTrackForm: FC = () => {
  const user = JSON.parse(Cookies.get('user') ?? '');

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioFileError, setAudioFileError] = useState<string>('');

  const [artist, setArtist] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAudioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAudioFileError('');
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'audio/mpeg') {
        setAudioFileError('Выберите файл формата MP3.');
        setAudioFile(null);
        return;
      }
      setAudioFile(file);
    }
  };

  useEffect(() => {
    if (audioFile) {
      const formData = new FormData();
      formData.append('audio', audioFile);

      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setAudioUrl(data.url);
          });
    }
  }, [audioFile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!audioFile) {
      setError('Выберите аудио файл.');
      setIsLoading(false);
      return;
    }

    if (audioFileError) {
      setError(audioFileError);
      setIsLoading(false);
      return;
    }

    try {
      const newTrack: CreateTrackPayload = { title, text, audioUrl, artist, userId: user.id };
      await axios.post('http://localhost:3000/tracks', newTrack);

      setTitle('');
      setText('');
      setAudioFile(null);
      setAudioUrl('');
      setArtist('');
      setAudioFileError('');
      alert('Track created successfully!');
    } catch (err) {
      setError('Failed to create track, please try again.');
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-full max-w-lg mx-auto p-6  mt-10 bg-slate-800  rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold mb-4">Добавить трек</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="title">
              Название
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="text">
              Описание
            </label>
            <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="cover">
              Добавить файл
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                id="audio"
                accept="audio/mpeg"
                onChange={handleAudioChange}
            />
            {audioFileError && (
                <p className="text-red-500 text-sm mt-1">{audioFileError}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="artist">
              Исполнитель
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading}
            >
              {isLoading ? 'Добавление...' : 'Добавить трек'}
            </button>
          </div>
        </form>
      </div>
  );
};

export default CreateTrackForm;