---
layout: default
title: Blog
permalink: /blog/
---

# Blog Post Categories

{% assign category_pages = site.pages | where: "layout", "category" | where_exp: "item", "item.category != 'africa'" | where_exp: "item", "item.category != 'travel'" | where_exp: "item", "item.category != 'coding'" | where_exp: "item", "item.category != 'hiatus'" | where_exp: "item", "item.category != 'reno'" | where_exp: "item", "item.category != 'music'" | sort: "title" %}
{% if category_pages.size > 0 %}
{% assign count = category_pages.size %}
{% assign columns = count %}
{% if count > 6 %}
  {% assign columns = 6 %}
  {% assign best_empty = count | modulo: 6 %}
  {% if best_empty != 0 %}
    {% assign best_empty = 6 | minus: best_empty %}
  {% endif %}
  {% assign empty5 = count | modulo: 5 %}
  {% if empty5 != 0 %}
    {% assign empty5 = 5 | minus: empty5 %}
  {% endif %}
  {% if empty5 < best_empty %}
    {% assign columns = 5 %}
    {% assign best_empty = empty5 %}
  {% endif %}
  {% assign empty4 = count | modulo: 4 %}
  {% if empty4 != 0 %}
    {% assign empty4 = 4 | minus: empty4 %}
  {% endif %}
  {% if empty4 < best_empty %}
    {% assign columns = 4 %}
  {% endif %}
{% endif %}
{% assign base = count | divided_by: columns %}
{% assign extra = count | modulo: columns %}
{% assign rows = base %}
{% if extra != 0 %}
  {% assign rows = base | plus: 1 %}
{% endif %}
<nav class="blog-categories" aria-label="Categories">
  <table>
    <caption>Travel By Country</caption>
    {% for row_page in category_pages limit: rows %}
      {% assign row = forloop.index0 %}
      <tr>
      {% for col_page in category_pages limit: columns %}
        {% assign col = forloop.index0 %}
        {% if col < extra %}
          {% assign height = base | plus: 1 %}
          {% assign index = col | times: height | plus: row %}
        {% else %}
          {% assign height = base %}
          {% assign col_offset = col | minus: extra %}
          {% assign index = extra | times: rows %}
          {% assign chunk = col_offset | times: base %}
          {% assign index = index | plus: chunk | plus: row %}
        {% endif %}
        {% if row < height %}
          {% assign category_page = category_pages[index] %}
          <td><a href="{{ category_page.url | relative_url }}">{{ category_page.title }}</a></td>
        {% endif %}
      {% endfor %}
      </tr>
    {% endfor %}
    </table>
  {% assign coding_pages = site.pages | where: "layout", "category" | where_exp: "item", "item.category == 'coding'" %}
  {% assign music_pages = site.pages | where: "layout", "category" | where_exp: "item", "item.category == 'music'" %}
  {% assign reno_pages = site.pages | where: "layout", "category" | where_exp: "item", "item.category == 'reno'" %}
  {% assign other_pages = coding_pages | concat: music_pages | concat: reno_pages | sort: "title" %}
  {% if other_pages.size > 0 %}
  <div class="other-categories">
    <h2>Other Blog Categories</h2>
    <ul>
      {% for category_page in other_pages %}
        <li><a href="{{ category_page.url | relative_url }}">{{ category_page.title }}</a></li>
      {% endfor %}
    </ul>
  </div>
  {% endif %}
</nav>
{% endif %}

# Ten Latest Blog Posts

{% assign blog_posts = site.blog | sort: 'date' | reverse %}
{% for post in blog_posts limit: 10 %}
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
