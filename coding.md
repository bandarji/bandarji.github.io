---
layout: default
title: Coding Notes
permalink: /coding/
---

# Coding Notes

Thoughts, tutorials, and technical discoveries from my software engineering journey.

{% assign coding_posts = site.coding | sort: 'date' | reverse %}
{% for post in coding_posts %}
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

{% if coding_posts.size == 0 %}
<p>No coding posts yet. Check back soon!</p>
{% endif %} 