/**
 * WordCloud を利用するキャンバス関連処理を提供します。
 */
export class WordCloudCanvas {
  /**
   * @type {HTMLCanvasElement}
   */
  #canvas

  /**
   * インスタンスを初期化します。
   * @param {HTMLCanvasElement} canvas キャンバス要素。
   */
  constructor(canvas) {
    this.#canvas = canvas

    // デバイスピクセル比に応じた解像度設定
    const scale = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;
    const context = canvas.getContext("2d");
    context.scale(scale, scale);
  }

  /**
   * キャンバス表示を更新します。
   * @param {string|number[][]} pairs テキストとウェイトの組の配列。組の1つ目の要素は string、2つ目は number。
   */
  update = pairs => {
    WordCloud(this.#canvas, {
      list: pairs,
      gridSize: 2,
      weightFactor: 1,
      fontFamily: 'Arial',
      color: 'random-dark',
      backgroundColor: '#fff',
      rotateRatio: 0.25,
    });
  }

  /**
   * キャンバスをクリアします。
   */
  clear = () => {
    const context = this.#canvas.getContext("2d");
    context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }
}