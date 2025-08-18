# Stylist Console - React 版本开发计划

## 🎯 项目目标
用 React + TypeScript 重新实现 Flutter 版本的造型师控制台，提供更好的 web 体验和更容易的部署。

## 🏗️ 技术架构选择

### 方案 A: 简化架构 (推荐)
- **前端**: Next.js (React + TypeScript)
- **部署**: Vercel (零配置部署)
- **数据库**: Supabase (PostgreSQL + 实时功能)
- **认证**: Supabase Auth
- **实时通信**: Supabase Realtime
- **样式**: Tailwind CSS + Shadcn/ui

### 方案 B: 传统分离架构
- **前端**: React + Vite
- **后端**: Node.js + Express
- **数据库**: PostgreSQL (自托管)
- **部署**: 前端 Vercel，后端 Railway/Render

## 💡 为什么选择方案 A？

### 优势：
1. **简化部署**: 单个 Next.js 项目，Vercel 一键部署
2. **实时功能**: Supabase 内置实时订阅，无需 Socket.IO
3. **零配置**: 数据库、认证、API 都由 Supabase 提供
4. **类型安全**: TypeScript + Supabase 自动生成类型
5. **开发速度**: 专注业务逻辑，不用维护基础设施

### 对比传统架构：
- ❌ 传统方案需要维护两个项目（前端 + 后端）
- ❌ 需要配置数据库连接、认证系统
- ❌ 部署更复杂（两个服务）
- ❌ 实时功能需要额外配置 WebSocket

## 📋 核心功能模块

### 1. 认证与授权
- 造型师登录/登出
- 角色权限控制（stylist, senior_stylist, admin）
- 会话管理

### 2. 对话队列管理
- 显示待处理的客户对话
- SLA 倒计时（2分钟响应目标）
- 优先级排序
- 认领对话功能

### 3. 邮件撰写系统
- 可视化邮件编辑器
- 产品卡片模块
- 拖拽式布局
- 实时预览

### 4. 客户上下文面板
- 客户资料
- 购买历史
- 风格偏好
- 对话历史

### 5. 性能分析
- 响应时间统计
- 邮件打开率
- 转化率追踪
- 个人表现看板

## 🗂️ 项目结构 (方案 A)

```
stylist/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── dashboard/       # 主面板页面
│   │   ├── login/          # 登录页面
│   │   └── api/            # API 路由
│   ├── components/         # 可复用组件
│   │   ├── ui/             # 基础 UI 组件
│   │   ├── conversation/   # 对话相关组件
│   │   ├── email/          # 邮件编辑组件
│   │   └── analytics/      # 分析图表组件
│   ├── lib/                # 工具函数
│   │   ├── supabase.ts     # Supabase 客户端
│   │   ├── types.ts        # TypeScript 类型定义
│   │   └── utils.ts        # 通用工具函数
│   └── hooks/              # 自定义 React Hooks
├── public/                 # 静态资源
├── database/               # Supabase 迁移文件
├── package.json
└── next.config.js
```

## 🚀 实现计划

### Phase 1: 基础设置 (1-2天)
- [ ] 创建 Next.js 项目
- [ ] 配置 Supabase 数据库
- [ ] 设置认证系统
- [ ] 基础 UI 组件库

### Phase 2: 核心功能 (3-5天)
- [ ] 对话队列界面
- [ ] 客户上下文面板
- [ ] 基础邮件编辑器
- [ ] 实时更新功能

### Phase 3: 高级功能 (3-4天)
- [ ] 拖拽式邮件编辑
- [ ] 产品搜索集成
- [ ] 性能分析面板
- [ ] 移动端适配

### Phase 4: 优化与部署 (1-2天)
- [ ] 性能优化
- [ ] 错误处理
- [ ] 生产环境部署
- [ ] 文档编写

## 🔗 现有系统集成

### 数据迁移
- 从现有 PostgreSQL 导入用户数据
- 迁移对话记录
- 产品目录同步

### API 兼容
- 复用现有的产品搜索 API
- 集成 Gmail 发送接口
- 保持与 Flutter 版本的数据一致性

## 🎨 设计原则

1. **移动优先**: 响应式设计，支持平板/手机使用
2. **键盘友好**: 快捷键支持，提高操作效率
3. **实时反馈**: 即时更新，无需刷新页面
4. **可访问性**: 符合 WCAG 标准
5. **性能优先**: 快速加载，流畅交互

## 🔄 迁移策略

1. **并行运行**: React 版本与 Flutter 版本同时运行
2. **渐进迁移**: 逐个功能模块切换
3. **数据同步**: 确保两个版本数据一致
4. **用户培训**: 提供迁移指南和培训材料

---

**结论**: 推荐使用方案 A (Next.js + Supabase)，开发速度快，维护成本低，部署简单。
