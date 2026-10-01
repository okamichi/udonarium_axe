import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.queue(function(n){var B=n.module,g=n.klass,a=n.const_set,y=n.hash2,t=n.truthy,f=n.def,I=n.eqeq,A=n.rb_gt,h=n.rb_lt,m=n.rb_le,E=[],r=n.nil,T=n.$$$;return(function(D,w){var d=[B(D,`BCDice`)].concat(w);return(function(S,W){var b=[B(S,`GameSystem`)].concat(W),x=n.$r(b);return(function(M,k,z){var s=g(M,k,`CastleInGray`),c=[s].concat(z),u=n.$r(c),G=s.$$prototype;return G.randomizer=r,a(c[0],`ID`,`CastleInGray`),a(c[0],`NAME`,`灰色城綺譚`),a(c[0],`SORT_KEY`,`はいいろしようきたん`),a(c[0],`HELP_MESSAGE`,`\u25A0 \u8272\u5360\u3044 (BnWm)
n: \u9ED2
m: \u767D
n, m \u306F1\uFF5E12\u306E\u7570\u306A\u308B\u6574\u6570

\u4F8B) B12W7
\u4F8B) B5W12

\u25A0 \u60AA\u610F\u306E\u6E26\u306B\u3088\u308B\u5360\u3044 (MALn)
n: \u60AA\u610F\u306E\u6E26
n \u306F1\uFF5E12\u306E\u6574\u6570

\u25A0 \u305D\u306E\u4ED6
\u30FB\u611F\u60C5\u8868 ET
\u30FB\u6697\u793A\u8868(\u9ED2) BIT
\u30FB\u6697\u793A\u8868(\u767D) WIT
`),a(c[0],`TABLES`,y([`ET`,`BIT`,`WIT`],{ET:T(u(`DiceTable`),`Table`).$new(`感情表`,`1D12`,[`友情(白)／敵視(黒)`,`恋慕(白)／嫌悪(黒)`,`信頼(白)／不信(黒)`,`同情(白)／憐憫(黒)`,`憧憬(白)／劣等感(黒)`,`尊敬(白)／蔑視(黒)`,`忠誠(白)／執着(黒)`,`有用(白)／邪魔(黒)`,`許容(白)／罪悪感(黒)`,`羨望(白)／嫉妬(黒)`,`共感(白)／拒絶(黒)`,`愛情(白)／狂信(黒)`]),BIT:T(u(`DiceTable`),`Table`).$new(`暗示表(黒)`,`1D12`,[`終わりなき夜に生まれつく者もあり`,`悪意もて真実を語らば`,`笑えども笑みはなし`,`影より抜け出ることあたわじ`,`心の赴くままに手をとれ`,`時ならぬ嵐の過ぎ去るを待つ`,`赦されぬと知るがゆえに`,`見張りは持ち場を離れる`,`誰もが盲いたる彷徨い人なり`,`落ちる日を眺めるがごとく`,`冷たく雨ぞ降りしきる`,`今日は笑む花も明日には枯れゆく`]),WIT:T(u(`DiceTable`),`Table`).$new(`暗示表(白)`,`1D12`,[`無垢なる者のみが真実を得る`,`げに慈悲深きは沈黙なり`,`懐かしき日々は去りぬ`,`束の間に光さす`,`迷える者に手を差し伸べよ`,`嵐の前には静けさがある`,`どうか責めないで`,`灯した明かりを絶やさぬように`,`目を開けて見よ`,`淑やかに訪れる`,`今こそ泣け、さもなくば二度と泣くな`,`時が許す間に薔薇を摘め`])}).$freeze()),s.$register_prefix(`B`,`MAL`,u(`TABLES`).$keys()),f(s,`$eval_game_system_specific_command`,function(_){var l=this,$=r,e=r;return t($=t(e=l.$roll_color(_))?e:l.$roll_mal(_))?$:l.$roll_tables(_,u(`TABLES`))}),f(s,`$roll_color`,function(_){var l=this,$=r,e=r,o=r,i=r;return $=/^B(\d{1,2})W(\d{1,2})$/.$match(_),!t($)||(e=$[`$[]`](1).$to_i(),o=$[`$[]`](2).$to_i(),!(t(e[`$between?`](1,12))&&t(o[`$between?`](1,12))))?r:(i=l.randomizer.$roll_once(12),I(e,o)?l.$color_text(e,o,i,`白と黒は重ねられません`):t(A(o,e))?l.$color_text(e,o,i,t(m(e,i))&&t(h(i,o))?`黒`:`白`):l.$color_text(e,o,i,t(m(o,i))&&t(h(i,e))?`白`:`黒`))}),f(s,`$color_text`,function(_,l,$,e){return`色占い(黒`+_+`白`+l+`) ＞ [`+$+`] ＞ `+e}),f(s,`$roll_mal`,function(_){var l=this,$=r,e=r,o=r,i=r;return $=/^MAL(\d{1,2})$/i.$match(_),!t($)||(e=$[`$[]`](1).$to_i(),!t(e[`$between?`](1,12)))?r:(o=l.randomizer.$roll_once(12),i=t(m(o,e))?`黒`:`白`,`悪意の渦(`+e+`) ＞ [`+o+`] ＞ `+i)})})(b[0],x(`Base`),b)})(d[0],d)})(E[0],E)});