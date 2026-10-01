# DSH Eye Care

[English](README.md) | 中文

暖色浅色、暖色暗色，自动跟随系统。

这是一个 DeepSeek Harness Web Profile Bundle：用六套暖色语义主题替换冷白界面配色，同时保持原生外观偏好不被破坏。

<p align="center">
  <img src="assets/eye-care-light.png" alt="DSH Eye Care 设置行：暖色日间主题，已选择日间和温暖" width="49%">
  <img src="assets/eye-care-dark.png" alt="DSH Eye Care 设置行：暖色夜间主题，已选择自动和温暖" width="49%">
</p>

## 功能

DSH Web 内置的 Light 与 Dark 主题偏冷。护眼模式在不使用全局 sepia 滤镜或图片变换的前提下，提供暖色浅色、暖色暗色和自动明暗切换。

- **四种模式：** `off`、`auto`、`light`、`dark`。
- **三档暖色强度：** `soft`、`balanced`、`warm`。
- **六套具体主题**通过官方 ThemeService 注册。
- **真正的语义 token**覆盖背景、文字、边框、按钮、sidebar、bubble、输入框、代码块、滚动条与 Shiki 配色。
- **原生外观仍然权威：** 选择浅色、深色或跟随系统会关闭护眼模式，并保留新选择的主题。
- **Loopback 持久化**把选择保存到 Host settings；远程浏览器则把选择保留在当前进程。

## 预览

上方截图分别展示暖色日间与暖色夜间状态下的 General 设置行。日间与夜间是显式模式；自动模式会按所选暖色强度跟随 `prefers-color-scheme`。设置行还提供 `aria-live` 状态提示和键盘可见的焦点状态。

## 安装

把公共 npm 包一键安装到 Web Profile：

```sh
dsh plugin --profile web add @anionex/dsh-eye-care
```

本地开发时，把包名替换为 checkout 的绝对路径或本地打包的 tarball。`DSH_HOME` 默认指向 `~/.dsh`；只想试用而不改动主 Profile 时，可把它指向一个临时目录。

重启或启动 Web UI：

```sh
dsh web
```

打开 **设置 → 通用设置 → 护眼模式**，选择模式与暖色强度。

## 主题矩阵

| 明暗 | 柔和 | 均衡 | 温暖 |
|---|---|---|---|
| 浅色 | `eye-care-light-soft` | `eye-care-light-balanced` | `eye-care-light-warm` |
| 暗色 | `eye-care-dark-soft` | `eye-care-dark-balanced` | `eye-care-dark-warm` |

## 工作原理

Host 半区使用旧版 `eye-care` Settings 命名空间或新版 `dsh-eye-care` Config 投影，并提供仅限 loopback 的 `/eye-care` RPC 路由。写入串行执行，并以 `expectedRevision` 做版本栅栏；发生冲突时重新读取 Host 快照，再重试最新意图。

Browser 半区注册六套配色，并注入 General 设置行。在新版宿主中使用公开的主题 token 层，避免 ConfigForms 刷新清除暖色；原始内置外观选择会跨刷新保留，并在关闭护眼时恢复。旧版宿主继续使用注册主题。控制器销毁时清除监听、主题和 token 层。远程浏览器的选择仅在当前浏览器生效。

## 兼容性与限制

- 候选版 0.1.2 面向 DSH `0.2.0-rc.2`；已实测 Web 安装、加载、模式切换和持久化，并用 `0.1.5-rc.1` Profile 回归。尚未发布。
- 需要包含标准 `settings`、`connection`、`locale`、`slots` 和 `theme` 服务的 DeepSeek Harness Web Profile。
- 原生外观切换按设计视为明确退出护眼模式。
- 远程浏览器会话不会把护眼选择回写到 Host。
- 不使用全局颜色滤镜；所有颜色都来自命名的语义 token。
- 该包处于预发布阶段，遵循 Profile Bundle 格式；只要 bundle 已安装，其生成的主题 id 就保持稳定。

## 开发

```sh
cd dsh-eye-care
pnpm install --frozen-lockfile
pnpm run check
pnpm run test
pnpm run build
```

运行可选的干净 Profile 安装测试：

```sh
DSH_EYE_CARE_PROFILE_E2E=1 pnpm exec vitest run tests/profile-install.e2e.spec.ts
```

## 许可证

[MIT](LICENSE)
