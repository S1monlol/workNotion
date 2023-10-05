FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY . ./
EXPOSE 8080
RUN bun install

CMD ["bun", "index.ts"]