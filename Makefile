.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dev: ## Start a development git branch
	@git checkout -b dev

pr: ## Create a pull request
	@git add -A
	@git commit -m "chore: unknown update"
	@git push -u origin dev

site: ## Deploy a local service
	@docker run -it -p 4000:4000 -v "./":/srv/jekyll sje-jekyll

pull: ## Pull the latest changes
	@git pull
