import isGitHubPage from './isGitHubPage';

/**
 * 実行しているページに応じてファイルパスを返す関数
 * @returns {string} ファイルパス、相対パス'../../'かルート相対''を返す
 */
export default function () {
  const path = (isGitHubPage())
    ? getRelativePath()
    : '';

  /**
   * 現在の階層に応じた相対パスを返す関数
   * location.pathnameが'/web/web/web/'の場合
   * 返ってくる相対パスは'../../../'
   * @returns {string} 相対パス
   */
  function getRelativePath() {
    let path = '';
    let pathArray = location.pathname.split('/');

    /**
     * 配列の中の'/'を取り除く
     */
    pathArray = pathArray.filter((path) => {
      return path !== '';
    });

    /**
     * 相対パスを生成する
     * https://hira777.github.io/p5.sound-visualizer/visualizer1/の場合
     * pathArrayは['p5.sound-visualizer', 'visualizer1']になる
     *
     * リポジトリであるp5.sound-visualizer/をルートとして想定しているため
     * pathArray.length - 1をした数だけfor文を回して相対パスを生成する
     * そのため、https://hira777.github.io/p5.sound-visualizer/visualizer1/の場合
     * 返ってくる相対パスは'..'
     */
    for (let index = 0, length = pathArray.length - 1; index < length; index += 1) {
      if (index === pathArray.length - 1) {
        path += '..';
      } else {
        path += '../';
      }
    }

    return path;
  }

  return path;
}