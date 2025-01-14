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

    // スマホデザイン時のみ中心を調整
    if (window.matchMedia("(max-width: 768px)").matches) {
      const centerX = - canvas.clientWidth / 2;
      const centerY = - canvas.clientHeight / 2;
      context.translate(centerX, centerY);
    }
  }

  /**
   * キャンバス表示を更新します。
   * @param {string|number[][]} pairs テキストとウェイトの組の配列。組の1つ目の要素は string、2つ目は number。
   */
  update = pairs => {
    // レンダリング用にウェイトを最大50に制限
    const maxCount = Math.max(...pairs.map(x => x[1]));
    const scale = 50 / maxCount;
    pairs.forEach(x => x[1] = x[1] * scale);

    // 先頭300件のキーワードに制限
    pairs = pairs.sort((a, b) => b[1] - a[1]).slice(0, 300);

    // キャンバスを更新
    WordCloud(this.#canvas, {
      list: pairs,
      gridSize: 5,
      weightFactor: 2.5,
      fontFamily: 'Arial',
      color: 'random-dark',
      backgroundColor: '#fff',
      rotateRatio: 0.5,
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