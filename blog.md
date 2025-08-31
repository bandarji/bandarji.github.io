---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Thoughts, adventures, and discoveries from my journey through software engineering, travel, and life.

{% assign blog_posts = site.blog | sort: 'date' | reverse %}
{% for post in blog_posts %}
<article class="post-preview">
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <p class="post-meta">
    <time datetime="{{ post.date | date_to_xmlschema }}">
      {{ post.date | date: "%B %-d, %Y" }}
    </time>
    {% if post.categories %}
      • {{ post.categories | join: ", " }}
    {% endif %}
  </p>
  {% if post.excerpt %}
    <p>{{ post.excerpt }}</p>
  {% endif %}
</article>
{% endfor %}

{% if blog_posts.size == 0 %}
<p>No blog posts yet. Check back soon!</p>
{% endif %}
