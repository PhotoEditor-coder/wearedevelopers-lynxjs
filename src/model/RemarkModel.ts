import type { AppModel } from './AppModel.js';

export type BucketId = 'ready' | 'not-ready' | 'archived' | 'deleted' | number;

export class RemarkModel {
  public readonly appModel: AppModel;

  #generation: number = 0;

  #title: string = 'Untitled';
  #details: string = '';
  #bucketId: BucketId = 'not-ready';
 

  public constructor(appModel: AppModel) {
    this.appModel = appModel;
  }

  /**
   * Used for change detection; incremented whenever this object
   * has changed in any way.
   */
  public get generation(): number {
    return this.#generation;
  }

  public get title(): string {
    return this.#title;
  }
  public set title(value: string) {
    if (this.#title !== value) {
      this.#title = value;
      ++this.#generation;
      this.appModel.notifyChanged();
    }
  }

  public get details(): string {
    return this.#details;
  }
  public set details(value: string) {
    if (this.#details !== value) {
      this.#details = value;
      ++this.#generation;
      this.appModel.notifyChanged();
    }
  }

  public get bucketId(): BucketId {
    return this.#bucketId;
  }
  public set bucketId(value: BucketId) {
    if (this.#bucketId !== value) {
      this.#bucketId = value;
      ++this.#generation;
      this.appModel.notifyChanged();
    }
  }
}
