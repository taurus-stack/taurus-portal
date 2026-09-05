# ===== Stage 1: Build =====
FROM node:20-alpine AS builder

WORKDIR /app

# 容器内 corepack/pnpm 交互提示一律走 CI 模式
ENV CI=true \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH

# 包管理元数据单独复制，最大化层缓存
COPY package.json pnpm-lock.yaml* ./

# 安装 pnpm（node:20-alpine 默认自带 corepack）
RUN corepack enable && corepack prepare pnpm@latest-10 --activate && \
    pnpm config set fetch-retries 3 && \
    mkdir -p /pnpm

# 安装依赖：CI=true 跳过 pnpm approve-builds / simple-git-hooks 的 TTY 交互
RUN --mount=type=cache,id=taurus-portal-pnpm-store,target=/root/.local/share/pnpm/store \
    CI=true pnpm install --frozen-lockfile --ignore-scripts

# 拷贝源码并构建
COPY . .
RUN pnpm build && \
    node scripts/check-dist.mjs

# ===== Stage 2: Runtime (nginx) =====
FROM nginx:1.27-alpine AS runtime

# 自定义 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 产物
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
