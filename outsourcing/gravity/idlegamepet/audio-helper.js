
            window.processPhaserAudio = function(audioDataUrl) {
                if (!audioDataUrl || typeof audioDataUrl !== 'string' || !audioDataUrl.startsWith('data:')) {
                    return audioDataUrl;
                }
                const base64 = audioDataUrl.split(',')[1];
                const binaryString = window.atob(base64);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                return bytes.buffer;
            };
            document.addEventListener('DOMContentLoaded', function() {
                const checkInterval = setInterval(function() {
                    if (window.Phaser && window.Phaser.Loader && window.Phaser.Loader.FileTypes && window.Phaser.Loader.FileTypes.AudioFile) {
                        clearInterval(checkInterval);
                        const originalOnProcess = Phaser.Loader.FileTypes.AudioFile.prototype.onProcess;
                        Phaser.Loader.FileTypes.AudioFile.prototype.onProcess = function() {
                            if (this.src && typeof this.src === 'string' && this.src.startsWith('data:')) {
                                this.src = window.processPhaserAudio(this.src);
                            } else if (this.src && Array.isArray(this.src)) {
                                this.src = this.src.map(url => {
                                    if (typeof url === 'string' && url.startsWith('data:')) {
                                        return window.processPhaserAudio(url);
                                    }
                                    return url;
                                });
                            }
                            return originalOnProcess.call(this);
                        };
                    }
                }, 100);
                setTimeout(function() {
                    clearInterval(checkInterval);
                }, 10000);
            });
        