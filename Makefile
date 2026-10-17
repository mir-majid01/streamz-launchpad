.PHONY: test build run

test:
	@if command -v bun >/dev/null 2>&1; then bun run test; else npm run test; fi

build:
	npm run build

run:
	npm run dev -- --host 0.0.0.0
