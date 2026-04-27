# 我的大作业（学生模板）

> 本模板来自课程助教批量初始化。首次打开请先阅读
> [`作业手册.md`](./作业手册.md) 以及本文件。

## 目录结构

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # 【不要修改】截止后由助教触发，将作品发布到 GitHub Pages
├── metadata.json           # 【必须填写】你的作品信息，展示主页会读取
├── README.md               # 可补充项目说明
├── 作业手册.md           # 助教编写的作业手册
├── .vscode/                # VSCode 推荐插件和任务
├── docs/                   # 放 PDF 设计文档、视频链接等
└── public/                 # 【所有作业文件放这里】
    ├── index.html          # 入口页（必须）
    ├── style.css
    ├── script.js
    └── thumbnail.png       # 首页卡片缩略图（800×500 左右）
```

## 3 步完成提交

### 1. 填写 `metadata.json`

```jsonc
{
  "studentId": "2024001",
  "name": "张三",
  "projectTitle": "快速排序可视化",
  "track": "A",                 // A=算法可视化, B=交互游戏
  "category": "排序算法",        // 会作为展示主页的筛选标签
  "tags": ["quicksort", "sorting", "visualization"],
  "description": "交互式演示快速排序的递归与分区过程，支持速度与数组大小调节。",
  "thumbnail": "thumbnail.png",
  "video": "",                  // 可选：B 站 / YouTube 链接
  "submittedAt": "2025-06-06"
}
```

### 2. 把作业放进 `public/`

- 入口必须是 `public/index.html`
- 外部资源（图片、字体、JS 库）可放在 `public/assets/` 下
- **使用相对路径引用资源**（如 `./style.css`），否则部署后会找不到文件
- 如果用 React/Vue 打包：
  - Vite：在 `vite.config.ts` 里设置 `base: './'`，把 `dist/` 内容复制到 `public/`
  - Create React App：在 `package.json` 加 `"homepage": "."`，把 `build/` 内容复制到 `public/`

### 3. 本地预览 → 提交

**本地预览**（推荐用 VSCode Live Server 插件）：

```bash
# 或命令行
python3 -m http.server -d public 8000
# 浏览器打开 http://localhost:8000
```

**提交代码**：

```bash
git add .
git commit -m "submit: 快速排序可视化 v1"
git push origin main
```

> 截止日期后，助教会统一触发 GitHub Pages 部署，你的作品将出现在展示主页上。  
> 在此之前，请通过本地预览确认效果。

## 设计文档提交位置

把 `学号_姓名_设计文档.pdf` 放到 `docs/` 下并 push。
演示视频 `学号_姓名_演示视频.mp4` 过大建议传 B 站 / 腾讯视频，
然后把公开链接填到 `metadata.json` 的 `"video"` 字段里。

## 禁止事项

- 不要修改 `.github/workflows/` 下的文件
- 不要把 `node_modules/` 等大型目录 commit 进仓库
- 不要直接复制他人的项目；AI 生成的代码须做修改并写入 AI 协作记录
