import { SelectList } from "./select-list.js";

/**
 * オプション関連処理を提供します。
 */
export class Option {
  /**
   * @type {SelectList}
   */
  dataSourceList

  /**
   * @type {SelectList}
   */
  category1List

  /**
   * @type {SelectList}
   */
  category2List

  /**
   * @type {SelectList}
   */
  category3List

  /**
   * インスタンスを初期化します。
   * @param {HTMLSelectElement} dataSourceDDList データソースドロップダウンリスト。
   * @param {HTMLSelectElement} category1DDList カテゴリ1ドロップダウンリスト。
   * @param {HTMLSelectElement} category2DDList カテゴリ2ドロップダウンリスト。
   * @param {HTMLSelectElement} category3DDList カテゴリ3ドロップダウンリスト。
   */
  constructor(dataSourceDDList, category1DDList, category2DDList, category3DDList) {
    this.dataSourceList = new SelectList(dataSourceDDList);
    this.category1List = new SelectList(category1DDList);
    this.category2List = new SelectList(category2DDList);
    this.category3List = new SelectList(category3DDList);
  }
}