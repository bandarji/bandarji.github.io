---
layout: default
title: Travel
permalink: /travel/
---

# Travel

Adventures, destinations, and travel experiences from around the world.

{% assign travel_posts = site.travel | sort: 'date' | reverse %}
{% for post in travel_posts %}
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

{% if travel_posts.size == 0 %}
<p>No travel posts yet. Check back soon!</p>
{% endif %}
