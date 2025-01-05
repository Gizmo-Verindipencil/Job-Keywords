/**
 * データアクセス処理を提供します。
 */
export class Gateway {
  /**
   * データソース情報を取得します。
   * @returns {Promise<{ key: string, url: string }[]>} 取得結果を返します。
   */
  fetchDataSources = async() => {
    try {
      const response = await fetch("assets/data-source.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return JSON.parse(await response.text());
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  /**
   * ランサーズのカテゴリを取得します。
   * @param uri URI。
   * @returns {Promise<{ category1: string, category2: string, category3: string }[]>} 取得結果を返します。
   */
  fetchCategories = async(uri) => {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return JSON.parse(await response.text());
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  /**
   * キーワード集計を取得します。
   * @param {string} uri URI。
   * @returns {Promise<{ keyword: string, count: number }>} 取得結果を返します。
   */
  fetchKeywordAggregation = async(uri) => {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const text = await response.text();
      return text.split("\n")
        .filter(x => x)
        .map(x => {
            const i = x.lastIndexOf(",");
            const keyword = x.substring(0, i);
            const count = x.substring(i + 1);
            return {
            keyword: keyword,
            count: Number(count)
            }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
}