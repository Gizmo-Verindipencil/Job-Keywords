import { Gateway } from "./gateway.js";
import { Option } from "./option.js";
import { WordCloudCanvas } from "./wordcloud-canvas.js"

class Index {
  /**
   * @type {WordCloudCanvas}
   */
  #canvas

  /**
   * @type {Gateway}
   */
  #gateway = new Gateway();

  /**
   * @type {Option}
   */
  #option

  /**
   * 初期化処理を実行します。
   */
  initialize = async () => {
    this.#option = new Option(
      document.getElementById("data-source"),
      document.getElementById("category1"),
      document.getElementById("category2"),
      document.getElementById("category3")
    );

    const dataSources = await this.#gateway.fetchDataSources();
    let categories = [];
    this.#option.dataSourceList.add("", "");
    dataSources.forEach(x => this.#option.dataSourceList.add(x.key.charAt(0).toUpperCase() + x.key.slice(1), x.uri));
    
    // データソース選択時にリストを更新
    this.#option.dataSourceList.raw.addEventListener("change", async (event) => {
      // 紐づくカテゴリを取得
      categories = await this.#gateway.fetchCategories(event.target.value);

      // カテゴリをクリア
      this.#option.category1List.clear();
      this.#option.category2List.clear();
      this.#option.category3List.clear();

      // 紐づくカテゴリを設定
      this.#option.category1List.add("", "");
      this.#option.category1List.value = "";
      const relatedCategories = categories.map(x => x.category1);
      new Set(relatedCategories).forEach(x => this.#option.category1List.add(x, x));
    });

    // カテゴリ1選択時にリストを更新
    this.#option.category1List.raw.addEventListener("change", async (event) => {
      // カテゴリをクリア
      this.#option.category2List.clear();
      this.#option.category3List.clear();

      // 紐づくカテゴリを設定
      const relatedCategories = categories
        .filter(x => x.category1 == event.target.value)
        .map(x => x.category2);
      this.#option.category2List.add("", "");
      this.#option.category2List.value = "";
      new Set(relatedCategories).forEach(x => this.#option.category2List.add(x, x));
    });

    // カテゴリ2選択時にリストを更新
    this.#option.category2List.raw.addEventListener("change", async (event) => {
      // カテゴリをクリア
      this.#option.category3List.clear();

      // 紐づくカテゴリを設定
      const category1 = this.#option.category1List.raw.value;
      const relatedCategories = categories
        .filter(x => x.category1 == category1 && x.category2 == event.target.value)
        .map(x => x.category3);
      this.#option.category3List.add("", "");
      this.#option.category3List.value = "";
      new Set(relatedCategories).forEach(x => this.#option.category3List.add(x, x));
    });

    // カテゴリ3選択時にリストを更新
    const canvas = new WordCloudCanvas(document.getElementById("wordcloud"));
    this.#option.category3List.raw.addEventListener("change", async (event) => {
      // カテゴリをクリア
      const category1 = this.#option.category1List.raw.value;
      const category2 = this.#option.category2List.raw.value;
      const category3 = event.target.value;

      // キャンバスを更新
      const selectedDataSource = this.#option.dataSourceList.raw.value;
      const dataSource = dataSources.find(x => x.uri == selectedDataSource);
      canvas.clear();
      if (!dataSource) return;
      const uri = `${dataSource.dataDirUri}/${category1}__${category2}__${category3}.csv`;
      const pairs = await this.#gateway.fetchKeywordAggregation(uri);
      
      console.log(pairs);
      
      canvas.update(pairs.map(x => [ x.keyword, x.count ]));
    });
  }
}

const instance = new Index();
export { instance as Index };