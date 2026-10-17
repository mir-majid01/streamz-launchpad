FROM oven/bun:1.2.26 AS build

WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 8080

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
