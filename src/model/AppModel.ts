export type Action = () => void;

export class ModelWithSubscribe {
  #listeners: Set<Action> = new Set();
  #notifying: boolean = false;

  /**
   * For usage with useSyncExternalStore().
   * @param listener - called whenever the data has changed
   * @returns a function to unsubscribe.
   */
  public subscribeCallback = (listener: Action): Action => {
    if (this.#listeners.has(listener)) {
      // Could be supported but requires reference counting
      throw new Error('already subscribed');
    }

    this.#listeners.add(listener);

    return () => {
      this.#listeners.delete(listener);
    };
  };

  public notifyChanged(): void {
    this.onChanged();

    if (!this.#notifying) {
      this.#notifying = true;
      setTimeout(this.#onTimeoutCallback);
    }
  }

  protected onChanged(): void {}

  #onTimeoutCallback = () => {
    this.#notifying = false;
    for (const listener of this.#listeners) {
      listener();
    }
  };
}
