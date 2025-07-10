import { type BucketId, RemarkModel } from './RemarkModel.js';

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

export class AppModel extends ModelWithSubscribe {
  #remarks: Set<RemarkModel> = new Set();
  #selectedBucketId: BucketId = 'not-ready';
  #selectedItem: RemarkModel | undefined = undefined;

  // Cache
  #remarksByBucketId: Map<BucketId, RemarkModel[]> = new Map();

  #generation: number = 0;

  protected override onChanged(): void {
    this.#remarksByBucketId.clear(); // clear the cache
    ++this.#generation;
  }

  public get remarks(): ReadonlySet<RemarkModel> {
    return this.#remarks;
  }

  /**
   * Used for change detection; incremented whenever this object or any
   * of its children has changed in any way.
   */
  public get generation(): number {
    return this.#generation;
  }

  public get selectedBucketId(): BucketId {
    return this.#selectedBucketId;
  }
  public set selectedBucketId(value: BucketId) {
    this.#selectedBucketId = value;
    this.notifyChanged();
  }

  public get selectedItem(): RemarkModel | undefined {
    return this.#selectedItem;
  }
  public set selectedItem(value: RemarkModel | undefined) {
    this.#selectedItem = value;
    this.notifyChanged();
  }

  public addRemark(remark: RemarkModel): void {
    if (remark.appModel !== this) {
      throw new Error('Wrong model');
    }
    this.#remarks.add(remark);
    this.notifyChanged();
  }

  public createRemark(
    bucketId: BucketId,
    title: string,
    details?: string
  ): RemarkModel {
    const remark: RemarkModel = new RemarkModel(this);
    remark.bucketId = bucketId;
    remark.title = title;
    remark.details = details ?? '';
    this.addRemark(remark);
    return remark;
  }

  public deleteRemark(remark: RemarkModel): void {
    this.#remarks.delete(remark);
    this.notifyChanged();
  }

  public listBucket(bucketId: BucketId): readonly RemarkModel[] {
    let list: RemarkModel[] | undefined = this.#remarksByBucketId.get(bucketId);

    if (list === undefined) {
      list = Array.from(this.#remarks).filter((x) => x.bucketId === bucketId);
      this.#remarksByBucketId.set(bucketId, list);
    }

    return list;
  }

  public findRemarkById(remarkId: number): RemarkModel | undefined {
    // TODO: optimize
    for (const remark of this.#remarks) {
      if (remark.remarkId === remarkId) {
        return remark;
      }
    }
    return undefined;
  }
}
