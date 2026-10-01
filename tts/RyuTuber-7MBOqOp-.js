import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/dice_table/table`]=function(n){var f=n.module,h=n.klass,s=n.hash2,P=n.defs,H=n.truthy,o=n.def,v=n.rb_minus,_=[],a=n.nil;return(function(b,t){var d=[f(b,`BCDice`)].concat(t);return(function(A,B){var M=[f(A,`DiceTable`)].concat(B);return(function(J,m,w){var c=h(J,m,`Table`),y=[c].concat(w),D=n.$r(y),l=c.$$prototype;return l.times=l.sides=l.name=l.items=a,P(c,`$from_i18n`,function(e,$){var i=this,r=a;return r=D(`I18n`).$t(e,s([`locale`],{locale:$})),i.$new(r[`$[]`](`name`),r[`$[]`](`type`),r[`$[]`](`items`))}),o(c,`$initialize`,function(e,$,i){var r=this,u=a;return r.name=e,r.items=i.$freeze(),u=/(\d+)D(\d+)/i.$match($),H(u)||r.$raise(D(`ArgumentError`),`Unexpected table type: `+$),r.times=u[`$[]`](1).$to_i(),r.sides=u[`$[]`](2).$to_i()}),o(c,`$roll`,function(e){var $=this,i=a;return i=e.$roll_sum($.times,$.sides),$.$choice(i)}),o(c,`$choice`,function(e){var $=this,i=a;return i=v(e,$.times),D(`RollResult`).$new($.name,e,$.items[`$[]`](i))})})(M[0],null,M)})(d[0],d)})(_[0],_)};Opal.queue(function(n){var f=n.module,h=n.klass,s=n.const_set,P=n.truthy,H=n.def,o=n.hash2,v=n.rb_plus,_=n.top,a=[],b=n.nil,t=n.$$$;return _.$require(`bcdice/dice_table/table`),(function(S,d){var B=[f(S,`BCDice`)].concat(d);return(function(E,M){var m=[f(E,`GameSystem`)].concat(M),w=n.$r(m);return(function(c,y,D){var l=h(c,y,`RyuTuber`),T=[l].concat(D),e=n.$r(T);return s(T[0],`ID`,`RyuTuber`),s(T[0],`NAME`,`リューチューバーとちいさな奇跡`),s(T[0],`SORT_KEY`,`りゆうちゆうはあとちいさなきせき`),s(T[0],`HELP_MESSAGE`,`\u25C6\u5224\u5B9A
\u3000\u30FB\u5224\u5B9A\u3000nB6<=1
\u3000\u3000\u203B\u3000n:\u30B5\u30A4\u30B3\u30ED\u306E\u6570\u3000\u4F8B\uFF0912B6<=1\u3000\u30B5\u30A4\u30B3\u30ED\u306E\u657012\u500B\u306E\u5834\u5408
\u3000\u30FB\u5224\u5B9A\u30EB\u30FC\u30EB\u3092\u8868\u793A\u3059\u308B\u3000RTB
\u25C6\u8077\u696D\u3000\uFF08\u30AB\u30C3\u30B3\u5185\u306F\u4F7F\u3048\u305D\u3046\u306A\u6280\u80FD\uFF09
\u3000\u30FB\u8077\u696D\u8868\u3000JT
\u3000\u30FB\u5B66\u751F\u8868\u3000JST
\u3000\u30FB\u6280\u8853\u30FB\u5C02\u9580\u8077\u8868\u3000JTPT
\u3000\u30FB\u4E8B\u52D9\u30FB\u30B5\u30FC\u30D3\u30B9\u8077\u8868\u3000JOST
\u3000\u30FB\u30A8\u30F3\u30BF\u30E1\u8077\u8868\u3000JET
\u25C6\u8DA3\u5473\u3000\uFF08\u30AB\u30C3\u30B3\u5185\u306F\u4F7F\u3048\u305D\u3046\u306A\u6280\u80FD\uFF09
\u3000\u30FB\u8DA3\u5473\u8868\u3000HT
\u3000\u30FB\u591A\u4EBA\u6570\u3067\u3067\u304D\u308B\u8DA3\u5473\u8868\u3000HGT
\u3000\u30FB\u4E00\u4EBA\u3067\u3067\u304D\u308B\u30A4\u30F3\u30C9\u30A2\u8DA3\u5473\u8868A\u3000HIAT
\u3000\u30FB\u4E00\u4EBA\u3067\u3067\u304D\u308B\u30A4\u30F3\u30C9\u30A2\u8DA3\u5473\u8868B\u3000HIBT
\u3000\u30FB\u4E00\u4EBA\u3067\u3067\u304D\u308B\u30A2\u30A6\u30C8\u30C9\u30A2\u8DA3\u5473\u8868A\u3000HOAT
\u3000\u30FB\u4E00\u4EBA\u3067\u3067\u304D\u308B\u30A2\u30A6\u30C8\u30C9\u30A2\u8DA3\u5473\u8868B\u3000HOBT
\u25C6\u5947\u8DE1\u306E\u6F14\u76EE\u3092\u8868\u793A\u3059\u308B
\u3000\u30FB\u5E78\u904B\u306E\u98A8\u304C\u5439\u3044\u3066\u3044\u308B MPW
\u3000\u30FB\u56F0\u3063\u305F\u6642\u306F\u304A\u4E92\u3044\u69D8 MPT
\u3000\u30FB\u60AA\u3044\u4E88\u611F\u306F\u7684\u4E2D\u3059\u308B MPF
\u3000\u30FB\u3064\u3044\u3066\u3044\u3044\u5618\u3082\u3042\u308B MPL
\u3000\u30FB\u79C1\u306B\u306F\u661F\u304C\u898B\u3048\u3066\u3044\u308B MPS
\u3000\u30FB\u5FC3\u306F\u7ADC\u3068\u5171\u306B\u3042\u308A MPD
\u3000\u30FB\u4EBA\u306F\u77F3\u57A3\u3001\u4EBA\u306F\u57CE MPH
`),H(l,`$eval_game_system_specific_command`,function(i){var r=this,u=b,g=b;return P(u=r.$roll_tables(i,e(`TABLES`)))?u:P(g=e(`TEXTS`)[`$[]`](i))?g.$chomp():b}),s(T[0],`TEXTS`,o([`RTB`,`MPW`,`MPT`,`MPF`,`MPL`,`MPS`,`MPD`,`MPH`],{RTB:`\u5224\u5B9A\u30EB\u30FC\u30EB\u8868\u793A
\u2460\u67A0\u4E3B\u304C\u5224\u5B9A\u5185\u5BB9\u3092\u5BA3\u8A00\u3001\u5224\u5B9A\u53C2\u52A0\u8005\u304C\u884C\u52D5\u5BA3\u8A00
\u2461\u30B5\u30A4\u30B3\u30ED\u306F\u7ADC\u306E\u5DEB\u5973\u306A\u30896\u500B\u3001\u6280\u80FD\u30EC\u30D9\u30EB\u304B\u6307\u5B9A\u9B45\u529B\u306E\u5024\u500B\u3001\u5947\u8DE1\u306E\u6F14\u76EE\u30921\u3064\u4EE5\u4E0A\u30AF\u30EA\u30A2\u3067+6\u500B\u3001\u30B9\u30D1\u306E\u6D88\u8CBB\u6570\u500B
\u2462\u632F\u3063\u305F\u30B5\u30A4\u30B3\u30ED\u306E\u300C1\u306E\u76EE\u300D\u306E\u6570\u304C\u76EE\u6A19\u5024\u4EE5\u4E0A\u306A\u3089\u83EF\u9E97\u306B\u6210\u529F\u3001\u76EE\u6A19\u5024\u672A\u6E80\u306A\u3089\u3061\u3087\u3063\u3068\u6B8B\u5FF5\u306A\u7D50\u679C
`,MPW:`\u5E78\u904B\u306E\u98A8\u304C\u5439\u3044\u3066\u3044\u308B
\u5947\u8DE1\u3000\u4EE5\u964D\u30B2\u30FC\u30E0\u7D42\u4E86\u307E\u3067\u3001\u30B5\u30A4\u30B3\u30ED+1
\u2460\u5065\u6C17\u306B\u9811\u5F35\u308B\u59FF\u3092\u898B\u305B\u308B\u3002
\u2461\u5831\u308F\u308C\u308B\u3053\u3068\u306F\u306A\u304F\u3001\u3055\u3089\u306B\u6700\u60AA\u306E\u5C55\u958B\u306B\u3002
\u2462\u305D\u308C\u3067\u3082\u5065\u6C17\u306A\u3068\u3053\u308D\u3092\u898B\u305B\u308B\u3002
`,MPT:`\u56F0\u3063\u305F\u6642\u306F\u304A\u4E92\u3044\u69D8
\u5947\u8DE1\u3000\u305D\u306E\u30D7\u30EC\u30A4\u30E4\u30FC\u306E\u5224\u5B9A\u30B5\u30A4\u30B3\u30ED\u30921\u56DE\u632F\u308A\u76F4\u3057\u3067\u304D\u308B
\u2460\u3051\u3061\u306A\u69D8\u5B50\u3092\u898B\u305B\u308B\u3002
\u2461\u56F0\u3063\u3066\u3044\u308B\u4EBA\u306B\u65BD\u3057\u3092\u3059\u308B\u59FF\u3092\u898B\u3089\u308C\u308B\u3002
\u2462\u7AAE\u5730\u306B\u9665\u308B\u3002
`,MPF:`\u60AA\u3044\u4E88\u611F\u306F\u7684\u4E2D\u3059\u308B
\u5947\u8DE1\u30001\u5224\u5B9A\u3060\u3051\u3001\u30B5\u30A4\u30B3\u30ED+3
\u2460\u72A0\u7272\u8005\u304C\u60AA\u3044\u5642\u3092\u8033\u306B\u3059\u308B\u3002
\u2461\u72A0\u7272\u8005\u304C\u60AA\u3044\u5197\u8AC7\u3092\u8A00\u3046\u3002
\u2462\u72A0\u7272\u8005\u304C\u60AA\u3044\u4E88\u611F\u306B\u5FC3\u3055\u3056\u3081\u304D\u3001\u8AB0\u304B\u306B\u60AA\u3044\u4E88\u611F\u3092\u8A71\u3059\u3002
`,MPL:`\u3064\u3044\u3066\u3044\u3044\u5618\u3082\u3042\u308B
\u5947\u8DE1\u3000\u3064\u3044\u305F\uFF08\u3055\u3055\u3084\u304B\u306A\uFF09\u5618\u304C\u672C\u5F53\u306B\u306A\u308B\u3000\u67A0\u4E3B\u5224\u65AD\u3067\u3044\u3064\u304B\u767A\u52D5\u3059\u308B\u3002
\u2460\u5618\u3092\u8A00\u3046\u3002
\u2461\u5618\u306B\u3088\u3063\u3066\u7AAE\u5730\u306B\u7ACB\u3064\u3002
\u2462\u5618\u3092\u5618\u306B\u3057\u306A\u3044\u305F\u3081\u306B\u3042\u304C\u304F\u3002
`,MPS:`\u79C1\u306B\u306F\u661F\u304C\u898B\u3048\u3066\u3044\u308B
\u5947\u8DE1\u3000\u6307\u5B9A\u3057\u305F\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC\u306E\u6B21\u306E\u884C\u52D5\u304C\u308F\u304B\u308B
\u2460\u5C11\u3057\u5148\u306E\u3053\u3068\u3092\u8A00\u3044\u5F53\u3066\u308B\u3002
\u2461\u6C17\u5473\u304C\u60AA\u3044\u3068\u5642\u306B\u306A\u308B\u3002
\u2462\u8A00\u3044\u5F53\u3066\u308B\u529B\u3092\u4EBA\u9593\u89B3\u5BDF\u306B\u7528\u3044\u308B\u3002
`,MPD:`\u5FC3\u306F\u7ADC\u3068\u5171\u306B\u3042\u308A
\u5947\u8DE1\u3000\u8D77\u3053\u308A\u3046\u308B\u4E0D\u5E78\u3092\u963B\u6B62\u3059\u308B
\u2460\u5FC3\u6E05\u3044\u3072\u3068\u306B\u52A9\u3051\u3089\u308C\u308B\u3002
\u2461\u81EA\u5206\u306E\u6027\u6839\u60AA\u3055\u3092\u60B2\u3057\u3080\u3002
\u2462\u81EA\u5206\u306A\u308A\u306E\u3084\u308A\u65B9\u3067\u5FC3\u6E05\u3044\u884C\u3044\u3092\u3059\u308B\u3002
`,MPH:`\u4EBA\u306F\u77F3\u57A3\u3001\u4EBA\u306F\u57CE
\u5947\u8DE1\u3000\u611F\u5316\u3055\u308C\u305F\u5468\u308A\u306E\u4EBA\u304C\u624B\u4F1D\u3046\u3088\u3046\u306B\u306A\u308B
\u2460\u4EBA\u3005\u306E\u4E0D\u5E78\u3092\u898B\u3066\u3001\u89AA\u5207\u306B\u3057\u3066\u3057\u307E\u3046\u3002
\u2461\u3051\u306A\u3052\u306B\u9811\u5F35\u308B\u59FF\u3092\u898B\u3089\u308C\u308B\u3002
\u2462\u898B\u3066\u3044\u305F\u4EBA\u3005\u304C\u96C6\u307E\u3063\u3066\u304F\u308B\u3002
`}).$freeze()),s(T[0],`TABLES`,o([`JT`,`JST`,`JTPT`,`JOST`,`JET`,`HT`,`HGT`,`HIAT`,`HIBT`,`HOAT`,`HOBT`],{JT:t(e(`DiceTable`),`Table`).$new(`職業表`,`1D6`,[`学生表へ`,`技術・専門職表へ`,`技術・専門職表へ`,`事務・サービス職表へ`,`事務・サービス職表へ`,`エンタメ職表へ`]),JST:t(e(`DiceTable`),`Table`).$new(`学生表`,`1D6`,[`中学生　（ゲーム　運動する）`,`高校生（文系）　（仲良くする　文章を書く）`,`高校生（理系）　（仲良くする　科学の知識）`,`専門学校生　（ものづくり　設計する）`,`大学生（文系）　（社会の仕組み　外国語）`,`大学生（理系）　（すごい技術　科学の知識）`]),JTPT:t(e(`DiceTable`),`Table`).$new(`技術・専門職表`,`2D6`,[`勝負師・山師　（洞察力　精神力）`,`漁師/猟師　（自然の知識　料理する）`,`建築家、大工　（設計する　運転する）`,`料理人　（料理する　ものづくり）`,`職人　（ものづくり　丁寧）`,`農家　（自然の知識　育てる）`,`医療・福祉関係（医師、薬剤師、介護職）　（治す　科学の知識）`,`美容、スタイリスト　（見た目を整える　仲良くする）`,`プログラマー　（プログラム　設計する）`,`士業（税理士、弁護士、行政書士等）　（社会の仕組み　事務仕事）`,`研究者　（教える　すごい技術）`]),JOST:t(e(`DiceTable`),`Table`).$new(`事務・サービス職表`,`2D6`,[`宗教関係（巫女、僧侶など）　（お祈りする　地元知識）`,`観光、旅行　（外国語　地元知識）`,`教師、保育士　（教える　育てる）`,`運転手、配達員　（運転する　地元知識）`,`自宅警備員　（ゲーム　想像力）`,`サラリーマン　（事務仕事　仲良くする）`,`店員　（丁寧　商品知識）`,`公務員　（事務仕事　地元知識）`,`警察、自衛隊、消防士　（社会の仕組み　戦う）`,`投資家、金融業、不動産　（プレゼンする　事務仕事）`,`経営者　（社会の仕組み　仲良くする）`]),JET:t(e(`DiceTable`),`Table`).$new(`エンタメ職表`,`2D6`,[`ゲーム制作　（プログラム　ものづくり）`,`写真家　（自然の知識　絵を描く）`,`デザイナー　（設計する 見た目を整える）`,`ライター　（文章を書く　想像力）`,`イラストレーター　（絵を描く　見た目を整える）`,`専業配信者　（プレゼンする　カリスマ）`,`声優　（声を出す　演技する）`,`ミュージシャン　（声を出す　音楽）`,`アイドル・芸能人　（演技する　カリスマ）`,`プロゲーマー　（ゲーム　戦う）`,`プロスポーツ選手　（運動する　精神力）`]),HT:t(e(`DiceTable`),`Table`).$new(`趣味表`,`1D6`,[`多人数でできる趣味表へ`,`多人数でできる趣味表へ`,`一人でできるインドア趣味表Aへ`,`一人でできるインドア趣味表Bへ`,`一人でできるアウトドア趣味表Aへ`,`一人でできるアウトドア趣味表Bへ`]),HGT:t(e(`DiceTable`),`Table`).$new(`多人数でできる趣味表`,`1D6`,[`家族サービス　（仲良くする　育てる）`,`野球・フットサル　（仲良くする　運動する）`,`ボードゲーム／ＴＲＰＧ／囲碁／将棋　（ゲーム　想像する）`,`ボランティア　（忍耐力　カリスマ）`,`サバイバルゲーム　（戦う　隠れる）`,`バンド　（音楽　見た目を整える）`]),HIAT:t(e(`DiceTable`),`Table`).$new(`一人でできるインドア趣味表A`,`1D6`,[`工芸　（ものづくり　想像力）`,`編み物　（丁寧　見た目を整える）`,`陶芸　（ものづくり　想像力）`,`プラモ　（ものづくり　見た目を整える）`,`同人　（絵を描く　文章を書く）`,`読書　（外国語　社会の仕組み）`]),HIBT:t(e(`DiceTable`),`Table`).$new(`一人でできるインドア趣味表B`,`1D6`,[`仕事　（事務仕事　忍耐力）`,`資格集め　（社会の仕組み　商品知識）`,`お絵かき　（絵を描く　想像力）`,`料理　（料理する　設計する）`,`筋トレ　（運動する　忍耐力）`,`コンピューターゲーム　（ゲーム　プログラム）`]),HOAT:t(e(`DiceTable`),`Table`).$new(`一人でできるアウトドア趣味表A`,`1D6`,[`スポーツ観戦　（忍耐力　お祈りする）`,`水泳　（運動する　泳ぐ）`,`旅行／鉄道　（移動する　外国語）`,`写真　（自然の知識　想像力）`,`ジグソーパズル　（ゲーム　忍耐力）`,`マラソン　（運動する　忍耐力）`]),HOBT:t(e(`DiceTable`),`Table`).$new(`一人でできるアウトドア趣味表B`,`1D6`,[`スキー・スノーボード　（運動する　自然の知識）`,`自転車　（移動する　運動する）`,`盆栽・生花　（丁寧　育てる）`,`キャンプ　（自然の知識　精神力）`,`映画鑑賞　（演技する　想像力）`,`恋愛　（仲良くする　見た目を整える）`])}).$freeze()),l.$register_prefix(v(e(`TEXTS`).$keys(),e(`TABLES`).$keys()))})(m[0],w(`Base`),m)})(B[0],B)})(a[0],a)});