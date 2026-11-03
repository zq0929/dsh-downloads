# DSH Desktop 下载页

**https://dl.968887.xyz/** — DeepSeek Harness 桌面版的下载门户：**RC 稳定线**与
**Alpha 尝鲜线**，覆盖 macOS Intel、macOS Apple Silicon 与 Windows x64。

- 页面：`index.html`（纯静态，GitHub Pages 托管，自定义域名走 Cloudflare DNS）
- 数据：`data.json`，由 `.github/workflows/refresh.yml` 每小时从
  [dsh-rc](https://github.com/zq0929/dsh-rc) 与 [dsh-alpha](https://github.com/zq0929/dsh-alpha)
  的 Release 重新生成；Release 没变时不会产生提交
- 页面优先读取 `data.json`；如果它缺失或为空，则回退到直接调用 GitHub API
- 域名解析：Cloudflare `968887.xyz` 的 `dl` CNAME → `zq0929.github.io`（DNS only，
  让 GitHub 能签发并自动续期 Let's Encrypt 证书）

## 本地预览

```sh
GH_TOKEN=$(gh auth token) node scripts/collect.mjs
python3 -m http.server 8080    # http://localhost:8080/
```
