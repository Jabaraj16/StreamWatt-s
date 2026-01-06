class StreamRetryManager {
    constructor({ maxRetries = 2, onRetry, onMaxRetriesReached }) {
        this.maxRetries = maxRetries;
        this.retryCount = 0;
        this.retryTimer = null;
        this.onRetry = onRetry;
        this.onMaxRetriesReached = onMaxRetriesReached;
        this.isCancelled = false;
    }

    // Calculate exponential backoff delay
    getRetryDelay() {
        const delays = [1000, 3000]; // 1s, 3s
        return delays[Math.min(this.retryCount, delays.length - 1)];
    }

    // Attempt to retry the stream
    retry() {
        if (this.isCancelled) {
            return;
        }

        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            const delay = this.getRetryDelay();

            console.log(`Retrying stream (attempt ${this.retryCount}/${this.maxRetries}) after ${delay}ms`);

            this.retryTimer = setTimeout(() => {
                if (!this.isCancelled && this.onRetry) {
                    this.onRetry(this.retryCount);
                }
            }, delay);
        } else {
            console.log('Max retries reached');
            if (this.onMaxRetriesReached) {
                this.onMaxRetriesReached();
            }
        }
    }

    // Reset retry count
    reset() {
        this.retryCount = 0;
        this.clearTimer();
        this.isCancelled = false;
    }

    // Cancel pending retries
    cancel() {
        this.isCancelled = true;
        this.clearTimer();
    }

    // Clear retry timer
    clearTimer() {
        if (this.retryTimer) {
            clearTimeout(this.retryTimer);
            this.retryTimer = null;
        }
    }

    // Get current retry count
    getRetryCount() {
        return this.retryCount;
    }

    // Check if max retries reached
    isMaxRetriesReached() {
        return this.retryCount >= this.maxRetries;
    }
}

export default StreamRetryManager;
