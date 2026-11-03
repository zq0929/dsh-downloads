# DSH Desktop 下载页

DeepSeek Harness 桌面版的下载门户：**RC 稳定线**与 **Alpha 尝鲜线**，覆盖 macOS Intel、
macOS Apple Silicon 与 Windows x64。

- 页面：`index.html`（纯静态，GitHub Pages 托管）
- 数据：`data.json`，由 `.github/workflows/refresh.yml` 每小时从
  [dsh-rc](https://github.com/zq0929/dsh-rc) 与 [dsh-alpha](https://github.com/zq0929/dsh-alpha)
  的 Release 重新生成
- 页面优先读取 `data.json`；如果它缺失或为空，则回退到直接调用 GitHub API

## 本地预览

```sh
python3 -m http.server 8080    # 然后打开 http://localhost:8080/
```

需要先有 `data.json`：

```sh
GH_TOKEN=$(gh auth token) node scripts/collect.mjs
```
