# SemanticGraphCodeHighlighter

SemanticGraph 用の Chrome 拡張機能です。 バッククォート 3 つで囲んだ中身をハイライトして表示します。

## 言語指定

Markdown と同様の方法で言語の指定ができます。指定がない場合でも汎用的な方法でハイライトされますが一部言語では上手くハイライトされないので言語指定するほうが良いです。

<pre>
例:SQLは以下のように指定します。もし指定がない場合大文字で書いたキーワードが色付けされません。

```sql
SELECT
        Id
    FROM
        Hoge
    WHERE
        Id = '00000000-0000-0000-0000-000000000000'
```
</pre>

### 対応言語

    - atom
    - bash
    - clike
    - css
    - csv
    - diff
    - docker
    - dockerfile
    - extend
    - go
    - groovy
    - html
    - insertBefore
    - javadoclike
    - javascript
    - js
    - jsx
    - markup
    - mathml
    - perl
    - plain
    - plaintext
    - rss
    - sass
    - scss
    - shell
    - sql
    - ssml
    - svg
    - text, txt
    - toml
    - ts
    - tsx
    - typescript
    - vim
    - xml
    - yaml, yml

## MetaKey + Enter で投稿

MetaKey(Mac だと Command Key)と Enter でメッセージが投稿出来ます
