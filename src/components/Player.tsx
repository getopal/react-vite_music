import {FC, useRef, useState} from "react";

const AudioPlayer: FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Воспроизведение или пауза
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Обновление прогресса аудио
    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(currentProgress);
    };

    // Обработка перемотки
    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = (parseFloat(event.target.value) / 100) * audio.duration;
        audio.currentTime = newTime;
        setProgress(parseFloat(event.target.value));
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-5 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-white text-lg font-semibold mb-4">Audio Player</h2>
            <audio
                ref={audioRef}
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                onTimeUpdate={handleTimeUpdate}
            ></audio>

            <div className="flex items-center space-x-4">
                {/* Кнопка воспроизведения/паузы */}
                <button
                    onClick={togglePlay}
                    className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full text-white hover:bg-blue-600 focus:outline-none"
                >
                    {isPlaying ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.25 5.25l13.5 6.75-13.5 6.75V5.25z"
                            />
                        </svg>
                    )}
                </button>

                {/* Ползунок прогресса */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="flex-1 appearance-none h-2 bg-gray-600 rounded-lg overflow-hidden cursor-pointer focus:outline-none"
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
