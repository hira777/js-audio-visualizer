/**
 * JSを実行しているページがGitHubPageかどうか判定する関数
 * @returns {boolean}
 */
export default function () {
  return (location.host.indexOf('github.io') !== -1)
}