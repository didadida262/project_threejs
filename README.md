# Three.js + React + TypeScript + Aceternity UI

使用 Vite 构建的现代化 3D 场景应用，集成了 Three.js、React、TypeScript 和 Aceternity UI。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **打包工具**: Vite 5
- **3D 引擎**: Three.js
- **UI 组件库**: Aceternity UI (基于 Tailwind CSS + Framer Motion)
- **包管理器**: Yarn

## 快速开始

### 安装依赖

```bash
yarn install
```

### 开发模式

```bash
yarn dev
```

应用将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
yarn build
```

### 预览生产构建

```bash
yarn preview
```

## 项目结构

```
project_threejs/
├── src/
│   ├── components/
│   │   ├── ui/              # Aceternity UI 组件
│   │   │   ├── Button.tsx
│   │   │   ├── ShimmerButton.tsx
│   │   │   ├── BorderBeam.tsx
│   │   │   ├── Spotlight.tsx
│   │   │   ├── Card.tsx
│   │   │   └── AnimatedTooltip.tsx
│   │   └── ThreeScene.tsx   # Three.js 场景组件
│   ├── lib/
│   │   └── utils.ts         # 工具函数
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── static/                  # 静态资源（模型、纹理等）
├── vite.config.ts           # Vite 配置
├── tsconfig.json            # TypeScript 配置
├── tailwind.config.js       # Tailwind CSS 配置
└── package.json
```

## 功能特性

- ✅ React + TypeScript 开发
- ✅ Vite 快速构建
- ✅ Three.js 3D 场景渲染
- ✅ Aceternity UI 现代化组件
- ✅ 响应式设计
- ✅ 动画效果（Framer Motion）
- ✅ Tailwind CSS 样式

## 使用说明

### 控制场景

- **鼠标左键拖拽**: 旋转视角
- **鼠标滚轮**: 缩放场景
- **鼠标右键拖拽**: 平移场景
- **自动旋转**: 场景默认开启自动旋转

### 静态资源

静态资源（模型、纹理等）应放在 `static/` 目录下，在代码中通过 `/` 路径引用。

例如：
- `static/Pistol_Model.glb` → `/Pistol_Model.glb`
- `static/earth.jpg` → `/earth.jpg`

## 开发

### 添加新的 Aceternity UI 组件

1. 在 `src/components/ui/` 目录下创建新组件
2. 使用 `cn()` 工具函数合并 Tailwind 类名
3. 在 `App.tsx` 或其他组件中导入使用

### 修改 Three.js 场景

编辑 `src/components/ThreeScene.tsx` 文件来修改 3D 场景。

## 许可证

ISC
