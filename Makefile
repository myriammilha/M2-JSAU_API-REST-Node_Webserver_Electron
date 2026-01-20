# Global env (portable)
export JSAU_REPOSITORY_FILE_PATH := $(CURDIR)/jsau-data
export NODE_ENV ?= development

.PHONY: help \
install install-apiserver install-webserver install-desktop install-npmpackage \
start-apiserver start-webserver start-desktop \
test test-apiserver test-webserver test-desktop test-npmpackage \
lint lint-apiserver lint-webserver lint-desktop lint-npmpackage \
build build-webserver build-desktop \
stylelint stylelint-webserver stylelint-desktop \
clean clean-apiserver clean-webserver clean-desktop clean-npmpackage

help:
	@echo "Commands:"
	@echo "  make install-*       Install dependencies for a module"
	@echo "  make start-*         Start a module (run in separate terminals)"
	@echo "  make test-*          Run tests for a module"
	@echo "  make lint-*          Run ESLint for a module"
	@echo "  make build-*         Build a module (if supported)"
	@echo "  make clean-*         Remove node_modules and build artifacts"
	@echo "  make test            Run tests for apiserver/webserver/desktop"
	@echo "  make lint            Run lint for apiserver/webserver/desktop"
	@echo ""
	@echo "Env:"
	@echo "  JSAU_REPOSITORY_FILE_PATH=$(JSAU_REPOSITORY_FILE_PATH)"
	@echo "  NODE_ENV=$(NODE_ENV)"

# =========================
# Install
# =========================
install: install-apiserver install-webserver install-desktop install-npmpackage

install-apiserver:
	cd JSAU/jsau-apiserver && npm install

install-webserver:
	cd JSAU/jsau-webserver && npm install

install-desktop:
	cd JSAU/jsau-desktop && npm install

install-npmpackage:
	cd JSAU/jsau-npmpackage && npm install || true

# =========================
# Start (run in separate terminals)
# =========================
start-apiserver:
	cd JSAU/jsau-apiserver && npm run start

start-webserver:
	cd JSAU/jsau-webserver && npm run start

start-desktop:
	cd JSAU/jsau-desktop && npm run start

# =========================
# Tests
# =========================
test: test-apiserver test-webserver test-desktop

test-apiserver:
	cd JSAU/jsau-apiserver && npm run test

test-webserver:
	cd JSAU/jsau-webserver && npm run test

test-desktop:
	cd JSAU/jsau-desktop && npm run test

test-npmpackage:
	cd JSAU/jsau-npmpackage && npm run test || true

# =========================
# Lint
# =========================
lint: lint-apiserver lint-webserver lint-desktop

lint-apiserver:
	cd JSAU/jsau-apiserver && npm run lint

lint-webserver:
	cd JSAU/jsau-webserver && npm run lint

lint-desktop:
	cd JSAU/jsau-desktop && npm run lint

lint-npmpackage:
	cd JSAU/jsau-npmpackage && npm run lint || true

# =========================
# Stylelint (if available)
# =========================
stylelint-webserver:
	cd JSAU/jsau-webserver && npm run stylelint || true

stylelint-desktop:
	cd JSAU/jsau-desktop && npm run stylelint || true

# =========================
# Build (if available)
# =========================
build-webserver:
	cd JSAU/jsau-webserver && npm run build || true

build-desktop:
	cd JSAU/jsau-desktop && npm run build || true

build: build-webserver build-desktop

# =========================
# Clean
# =========================
clean: clean-apiserver clean-webserver clean-desktop clean-npmpackage

clean-apiserver:
	cd JSAU/jsau-apiserver && rm -rf node_modules coverage .nyc_output package-lock.json

clean-webserver:
	cd JSAU/jsau-webserver && rm -rf node_modules dist build coverage .nyc_output package-lock.json

clean-desktop:
	cd JSAU/jsau-desktop && rm -rf node_modules dist build coverage .nyc_output package-lock.json

clean-npmpackage:
	cd JSAU/jsau-npmpackage && rm -rf node_modules dist build coverage .nyc_output package-lock.json
