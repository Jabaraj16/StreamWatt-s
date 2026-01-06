import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import StreamRetryManager from './StreamRetryManager';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import './VideoPlayer.css';

const VideoPlayer = ({ streamUrl, autoPlay = true, onError, onRetry }) => {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const retryManagerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRetrying, setIsRetrying] = useState(false);

    useEffect(() => {
        retryManagerRef.current = new StreamRetryManager({
            maxRetries: 2,
            onRetry: (retryCount) => {
                console.log(`Auto-retrying stream (${retryCount}/2)`);
                setError(null);
                setLoading(true);
                setIsRetrying(true);
                loadStream();
            },
            onMaxRetriesReached: () => {
                console.log('Max auto-retries reached');
                setIsRetrying(false);
                setLoading(false);
                if (onRetry) {
                    onRetry(retryManagerRef.current.getRetryCount());
                }
            }
        });

        return () => {
            if (retryManagerRef.current) {
                retryManagerRef.current.cancel();
            }
        };
    }, []);

    const handleStreamError = (errorType, errorData) => {
        console.error(`Stream error (${errorType}):`, errorData);
        setLoading(false);
        setError(errorType);

        if (retryManagerRef.current && !retryManagerRef.current.isMaxRetriesReached()) {
            retryManagerRef.current.retry();
        } else {
            setIsRetrying(false);
        }

        if (onError) {
            onError({ type: errorType, data: errorData });
        }
    };

    const loadStream = () => {
        if (!streamUrl || !videoRef.current) return;

        const video = videoRef.current;
        setLoading(true);
        setError(null);

        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }

        if (streamUrl.includes('.m3u8')) {
            if (Hls.isSupported()) {
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 90,
                    maxLoadingDelay: 4,
                    maxBufferLength: 30,
                    maxMaxBufferLength: 60
                });

                hls.loadSource(streamUrl);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    setLoading(false);
                    setIsRetrying(false);
                    if (retryManagerRef.current) {
                        retryManagerRef.current.reset();
                    }
                    if (autoPlay) {
                        video.play().catch(err => {
                            console.error('Autoplay failed:', err);
                            setIsPlaying(false);
                        });
                    }
                });

                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                handleStreamError('NETWORK_ERROR', data);
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                handleStreamError('MEDIA_ERROR', data);
                                hls.recoverMediaError();
                                break;
                            default:
                                handleStreamError('FATAL_ERROR', data);
                                break;
                        }
                    }
                });

                hlsRef.current = hls;
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = streamUrl;
                video.addEventListener('loadedmetadata', handleLoadedMetadata);
                video.addEventListener('error', handleVideoError);
            } else {
                handleStreamError('UNSUPPORTED_FORMAT', 'HLS not supported');
            }
        } else {
            video.src = streamUrl;
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('error', handleVideoError);
        }

        video.addEventListener('stalled', handleStalled);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('suspend', handleSuspend);
    };

    const handleLoadedMetadata = () => {
        setLoading(false);
        setIsRetrying(false);
        if (retryManagerRef.current) {
            retryManagerRef.current.reset();
        }
        if (autoPlay && videoRef.current) {
            videoRef.current.play().catch(err => {
                console.error('Autoplay failed:', err);
                setIsPlaying(false);
            });
        }
    };

    const handleVideoError = (e) => {
        const video = e.target;
        let errorType = 'VIDEO_ERROR';

        if (video.error) {
            switch (video.error.code) {
                case video.error.MEDIA_ERR_ABORTED:
                    errorType = 'ABORTED';
                    break;
                case video.error.MEDIA_ERR_NETWORK:
                    errorType = 'NETWORK_ERROR';
                    break;
                case video.error.MEDIA_ERR_DECODE:
                    errorType = 'DECODE_ERROR';
                    break;
                case video.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorType = 'UNSUPPORTED_FORMAT';
                    break;
                default:
                    errorType = 'UNKNOWN_ERROR';
            }
        }

        handleStreamError(errorType, video.error);
    };

    const handleStalled = () => {
        console.warn('Video playback stalled');
    };

    const handleWaiting = () => {
        console.warn('Video is waiting for data');
    };

    const handleSuspend = () => {
        console.warn('Video data loading has been suspended');
    };

    useEffect(() => {
        loadStream();

        return () => {
            const video = videoRef.current;
            if (video) {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('error', handleVideoError);
                video.removeEventListener('stalled', handleStalled);
                video.removeEventListener('waiting', handleWaiting);
                video.removeEventListener('suspend', handleSuspend);
            }

            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }

            if (retryManagerRef.current) {
                retryManagerRef.current.cancel();
            }
        };
    }, [streamUrl, autoPlay]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };

    if (error && !isRetrying) {
        return null;
    }

    return (
        <div className="video-player">
            {loading && (
                <div className="player-overlay">
                    <div className="player-loader"></div>
                    <p>{isRetrying ? 'Retrying...' : 'Loading stream...'}</p>
                </div>
            )}

            <video
                ref={videoRef}
                className="video-element"
                controls={false}
                playsInline
            />

            <div className="player-controls">
                <button className="control-btn" onClick={togglePlay}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </button>
                <button className="control-btn" onClick={toggleMute}>
                    {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </button>
                <button className="control-btn" onClick={toggleFullscreen}>
                    <FullscreenIcon />
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;
