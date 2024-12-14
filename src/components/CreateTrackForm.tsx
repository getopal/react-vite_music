import React, { useState } from 'react';
import axios from 'axios';

interface Track {
    title: string;
    text: string;
    cover: string;
    artist: string;
}


const CreateTrackForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [cover, setCover] = useState('http://localhost:3000/uploads/audio/e8857e8c-d319-4a68-b52a-a2c9755577c0.mp3');
    const [artist, setArtist] = useState('');
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoverFile(e.target.files?.[0]);
        if (e.target.files && e.target.files[0]){
            const reader = new FileReader();
            reader.onload = (e) => {
                setCover(e.target.result as string);
            }
            reader.readAsDataURL(e.target.files[0]);
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const newTrack: Track = { title, text, cover, artist };
            await axios.post('http://localhost:3000/tracks', newTrack);

            setTitle('');
            setText('');
            setCover('');
            setArtist('');
            alert('Track created successfully!');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create track');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New Track</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
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
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="text">
                        Text
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
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="cover">
                        Cover Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file"
                        id="cover"
                        onChange={handleCoverChange}
                        accept="image/*"
                    />
                    {cover && <img src={cover} alt="Cover Preview" className="w-32 h-32 mt-2" />}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="artist">
                        Artist
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
                        {isLoading ? 'Creating...' : 'Create Track'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTrackForm;
