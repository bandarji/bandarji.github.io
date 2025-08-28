# Build and run: docker build -t sje-jekyll . && docker run -p 4000:4000 sje-jekyll
# Live updating: docker run -it -p 4000:4000 -v "$PWD":/srv/jekyll sje-jekyll
FROM ruby:latest
WORKDIR /srv/jekyll
COPY . /srv/jekyll
RUN gem install jekyll
EXPOSE 4000
CMD ["jekyll", "serve", "--host", "0.0.0.0"]
