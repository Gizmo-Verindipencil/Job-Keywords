/**
 * ドロップダウンリスト関連処理を提供します。
 */
export class SelectList {
  /**
   * @type {HTMLSelectElement}
   */
  raw

  /**
   * インスタンスを初期化します。
   * @param {HTMLSelectElement} SelectList ドロップダウンリスト。
   */
  constructor(selectList) {
    this.raw = selectList;
  }

  /**
   * アイテムを追加します。
   * @param {string} text アイテムのテキスト。
   * @param {string} value アイテムの値。
   */
  add = (text, value) => {
    const option = document.createElement("option");
    option.text = text;
    option.value = value;
    this.raw.add(option);
  }

  /**
   * クリアします。
   */
  clear = () => {
    this.raw.innerHTML = "";
  }
}