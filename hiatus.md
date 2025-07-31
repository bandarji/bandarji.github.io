---
layout: default
title: Hiatus
permalink: /hiatus/
---

# Hiatus

I decided to take a break from work in the summer of 2025. These posts will highlight trips I take during my one year off.

{% assign hiatus_posts = site.hiatus | sort: 'date' | reverse %}
{% for post in hiatus_posts %}
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

{% if hiatus_posts.size == 0 %}
<p>No hiatus posts yet. Check back soon!</p>
{% endif %} 