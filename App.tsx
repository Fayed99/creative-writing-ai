import React, { useState, useEffect, useRef, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import StoryDisplay from './components/StoryDisplay';
import { HeaderIcon } from './components/icons';
import { generateStoryFromImage, generateSpeechFromText } from './services/geminiService';
import { decode, decodeAudioData } from './utils/audio';

// Helper to read file as Data URL
const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
    const [story, setStory] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [genre, setGenre] = useState('Fantasy');
    const [style, setStyle] = useState('Descriptive');

    const audioContextRef = useRef<AudioContext | null>(null);

    const generateStory = useCallback(async (dataUrl: string, file: File) => {
        setIsLoading(true);
        setError(null);
        try {
            const newStory = await generateStoryFromImage(dataUrl, file.type, genre, style);
            setStory(newStory);
        } catch (err) {
            console.error(err);
            setError("Failed to generate the story. Please try again.");
            setStory(null);
        } finally {
            setIsLoading(false);
        }
    }, [genre, style]);

    const handleImageChange = async (file: File) => {
        setImageFile(file);
        try {
            const dataUrl = await fileToDataUrl(file);
            setImageDataUrl(dataUrl);
            generateStory(dataUrl, file);
        } catch (err) {
            console.error(err);
            setError("Failed to read the image file.");
        }
    };

    const handleReadAloud = async () => {
        if (!story || isSpeaking) return;

        setIsSpeaking(true);
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const audioContext = audioContextRef.current;
            await audioContext.resume(); // Ensure context is running

            const base64Audio = await generateSpeechFromText(story, style);
            const audioBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);

            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();
            source.onended = () => {
                setIsSpeaking(false);
            };
        } catch (err) {
            console.error(err);
            setError("Failed to play audio.");
            setIsSpeaking(false);
        }
    };
    
    // Regenerate story when genre or style changes
    useEffect(() => {
        if (imageDataUrl && imageFile) {
            generateStory(imageDataUrl, imageFile);
        }
    }, [genre, style, imageDataUrl, imageFile, generateStory]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4 sm:p-6 lg:p-8">
            <header className="flex items-center justify-center gap-4 mb-8">
                <HeaderIcon />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                    Creative Writing AI
                </h1>
            </header>

            <main className="flex-grow container mx-auto max-w-7xl">
                 {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-indigo-300">Upload Your World</h2>
                        {imageDataUrl ? (
                            <img src={imageDataUrl} alt="Uploaded scene" className="w-full h-96 object-cover rounded-lg shadow-lg" />
                        ) : (
                            <ImageUploader onImageChange={handleImageChange} isLoading={isLoading} />
                        )}
                    </div>
                    <div>
                        <StoryDisplay
                            story={story}
                            isLoading={isLoading}
                            isSpeaking={isSpeaking}
                            onReadAloud={handleReadAloud}
                            genre={genre}
                            onGenreChange={setGenre}
                            style={style}
                            onStyleChange={setStyle}
                        />
                    </div>
                </div>
            </main>

            <footer className="text-center text-gray-500 mt-12">
                <p>Powered by Gemini. Explore new worlds, one image at a time.</p>
            </footer>
        </div>
    );
};

export default App;