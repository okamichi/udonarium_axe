import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.queue(function(r){var S=r.module,y=r.klass,v=r.const_set,t=r.truthy,h=r.def,d=r.rb_minus,H=r.not,E=r.send,p=r.assign_ivar,T=r.rb_le,x=r.hash2,z=[],e=r.nil;return(function(B,k){var G=[S(B,`BCDice`)].concat(k);return(function(j,N){var g=[S(j,`GameSystem`)].concat(N),X=r.$r(g);return(function(q,F,P){var I=y(q,F,`KamitsubakiCityUnderConstructionNarrative`),f=[I].concat(P),n=r.$r(f),V=I.$$prototype;return V.randomizer=e,v(f[0],`ID`,`KamitsubakiCityUnderConstructionNarrative`),v(f[0],`NAME`,`神椿市建設中。NARRATIVE`),v(f[0],`SORT_KEY`,`かみつはきしけんせつちゆうならていふ`),v(f[0],`HELP_MESSAGE`,`\u30FB\u53EF\u7D44\uFF08KA\uFF09
\u3000KA6 \u884C\u52D5\u5224\u5B9A
\u3000KA8 \u6280\u80FD\u30ED\u30FC\u30EB
\u3000KA10 \u7279\u6280\u30ED\u30FC\u30EB
\u3000KA12 A\u30ED\u30FC\u30EB

\u30FB\u88CF\u7D44\uFF08RI\uFF09
\u3000RI6 \u884C\u52D5\u5224\u5B9A
\u3000RI8 \u6280\u80FD\u30ED\u30FC\u30EB
\u3000RI10 \u7279\u6280\u30ED\u30FC\u30EB
\u3000RI12 A\u30ED\u30FC\u30EB

\u30FB\u7FBD\u7D44\uFF08HA\uFF09
\u3000HA6 \u884C\u52D5\u5224\u5B9A
\u3000HA8 \u6280\u80FD\u30ED\u30FC\u30EB
\u3000HA10 \u7279\u6280\u30ED\u30FC\u30EB
\u3000HA12 A\u30ED\u30FC\u30EB

\u30FB\u661F\u7D44\uFF08SE\uFF09
\u3000SE6 \u884C\u52D5\u5224\u5B9A
\u3000SE8 \u6280\u80FD\u30ED\u30FC\u30EB
\u3000SE10 \u7279\u6280\u30ED\u30FC\u30EB
\u3000SE12 A\u30ED\u30FC\u30EB

\u30FB\u72D0\u7D44\uFF08CO\uFF09
\u3000CO6 \u884C\u52D5\u5224\u5B9A
\u3000CO8 \u6280\u80FD\u30ED\u30FC\u30EB
\u3000CO10 \u7279\u6280\u30ED\u30FC\u30EB
\u3000CO12 A\u30ED\u30FC\u30EB

\u30FBGM\u7528
\u3000GM6 \uFF08\u6210\u5426\u5224\u5B9A\u306A\u3057\uFF09
\u3000GM8 \u6280\u80FD\u30ED\u30FC\u30EB
\u3000GM10 \u7279\u6280\u30ED\u30FC\u30EB
\u3000Q12 Q\u30ED\u30FC\u30EB

\u30FB\u5B58\u5728\u8A3C\u660E EXI<=x
\u3000\u5B58\u5728\u8A3C\u660E\u306E\u5224\u5B9A\u3092\u884C\u3046
\u3000x: \u5B58\u5728\u5024
`),h(I,`$eval_game_system_specific_command`,function(M){var _=this,i=e;return t(i=_.$roll_kumi(M))?i:_.$roll_existence(M)}),I.$private(),h(I,`$roll_kumi`,function(M){var _=this,i=e;return i=n(`TABLES`)[`$[]`](M),t(i)?i.$roll(_.randomizer):e}),(function(w,M,_){var i=y(w,M,`KumiDice`),a=[i].concat(_),c=r.$r(a),R=i.$$prototype;return R.items=e,h(i,`$initialize`,function(m){var s=this;return s.items=m.$freeze()}),v(a[0],`CRITICAL`,`M`),v(a[0],`FUMBLE`,`Q`),h(i,`$roll`,function(m){var s=this,o=e,$=e,u=e,K=e,D=e;return o=m.$roll_once(s.items.$length()),$=s.items[`$[]`](d(o,1)),u=$[`$==`](c(`FUMBLE`)),K=$[`$==`](c(`CRITICAL`)),D=t(u)?`ファンブル`:t(K)?`マジック`:H($[`$empty?`]())?`成功`:`失敗`,E(c(`Result`).$new(),`tap`,[],function Q(A){var C,b=Q.$$s==null?this:Q.$$s,L=e;return b.items??=e,A??=e,A[`$critical=`](K),A[`$fumble=`](u),A[`$condition=`](t(L=$[`$empty?`]()[`$!`]())?A[`$fumble?`]()[`$!`]():L),C=[[`(D`+b.items.$length()+`)`,o,t($[`$empty?`]())?e:$,D].$compact().$join(` ＞ `)],E(A,`text=`,C),C[C.length-1]},{$$s:s})})})(f[0],null,f),(function(w,M,_){var i=y(w,M,`KumiD6`),a=[i].concat(_),c=r.$r(a);return h(i,`$initialize`,p(`success_symbol`)),v(a[0],`TABLE`,[`裏`,`羽`,`星`,`狐`,`可`,`Q`].$freeze()),h(i,`$roll`,function(l){var m=this,s=e,o=e;return s=l.$roll_once(6),o=c(`TABLE`)[`$[]`](d(s,1)),E(c(`Result`).$new(),`tap`,[],function $(u){var K,D=$.$$s==null?this:$.$$s,Q=e;return D.success_symbol??=e,u??=e,t(D.success_symbol[`$nil?`]())||(u[`$fumble=`](o[`$==`](`Q`)),u[`$condition=`](o[`$==`](D.success_symbol))),Q=t(u[`$fumble?`]())?`ファンブル`:t(u[`$success?`]())?`成功`:t(u[`$failure?`]())?`失敗`:e,K=[[`(D6)`,s,o,Q].$compact().$join(` ＞ `)],E(u,`text=`,K),K[K.length-1]},{$$s:m})})})(f[0],null,f),(function(w,M,_){var i=y(w,M,`QDice`),a=[i].concat(_),c=r.$r(a),R=i.$$prototype;return R.items=e,h(i,`$initialize`,function(m){var s=this;return s.items=m.$freeze()}),v(a[0],`CRITICAL`,`M`),h(i,`$roll`,function(m){var s=this,o=e,$=e,u=e,K=e;return o=m.$roll_once(s.items.$length()),$=s.items[`$[]`](d(o,1)),u=$[`$==`](c(`CRITICAL`)),K=t(u)?`マジック`:H($[`$empty?`]())?`成功`:`失敗`,E(c(`Result`).$new(),`tap`,[],function D(Q){var A,C=D.$$s==null?this:D.$$s;return C.items??=e,Q??=e,Q[`$critical=`](u),Q[`$condition=`]($[`$empty?`]()[`$!`]()),A=[[`(D`+C.items.$length()+`)`,o.$to_s(),t($[`$empty?`]())?e:$,K].$compact().$join(` ＞ `)],E(Q,`text=`,A),A[A.length-1]},{$$s:s})})})(f[0],null,f),h(I,`$roll_existence`,function(M){var _=this,i=e,a=e,c=e;return i=/^EXI<=(\d+)$/.$match(M),t(i)?(a=i[`$[]`](1).$to_i(),c=_.randomizer.$roll_once(20),E(n(`Result`).$new(),`tap`,[],function(l){var m,s=e,o=e,$=e;return l??=e,l[`$critical=`](c[`$==`](1)),l[`$fumble=`](c[`$==`](20)),l[`$condition=`](t(s=t(o=T(c,a))?l[`$fumble?`]()[`$!`]():o)?s:l[`$critical?`]()),$=t(l[`$critical?`]())?`M ＞ マジック`:t(l[`$fumble?`]())?`Q ＞ ファンブル`:t(l[`$success?`]())?`成功`:`失敗`,m=[[`(D20<=`+a+`)`,c,$].$join(` ＞ `)],E(l,`text=`,m),m[m.length-1]})):e}),v(f[0],`TABLES`,x([`KA6`,`KA8`,`KA10`,`KA12`,`RI6`,`RI8`,`RI10`,`RI12`,`HA6`,`HA8`,`HA10`,`HA12`,`SE6`,`SE8`,`SE10`,`SE12`,`CO6`,`CO8`,`CO10`,`CO12`,`GM6`,`GM8`,`GM10`,`Q12`],{KA6:n(`KumiD6`).$new(`可`),KA8:n(`KumiDice`).$new([`Q`,``,``,``,`可`,`可`,`可`,`M`]),KA10:n(`KumiDice`).$new([`Q`,``,``,`可`,`可`,`可`,`可`,`可`,`M`,`M`]),KA12:n(`KumiDice`).$new([`Q`,``,``,`可`,`可`,`可`,`可`,`可`,`可`,`可`,`M`,`M`]),RI6:n(`KumiD6`).$new(`裏`),RI8:n(`KumiDice`).$new([`Q`,``,``,``,`裏`,`裏`,`裏`,`M`]),RI10:n(`KumiDice`).$new([`Q`,``,``,`裏`,`裏`,`裏`,`裏`,`裏`,`M`,`M`]),RI12:n(`KumiDice`).$new([`M`,`M`,`裏`,`裏`,`裏`,`裏`,`裏`,`裏`,`裏`,``,``,`Q`]),HA6:n(`KumiD6`).$new(`羽`),HA8:n(`KumiDice`).$new([`Q`,``,``,``,`羽`,`羽`,`羽`,`M`]),HA10:n(`KumiDice`).$new([`Q`,``,``,`羽`,`羽`,`羽`,`羽`,`羽`,`M`,`M`]),HA12:n(`KumiDice`).$new([`Q`,`Q`,`羽`,`羽`,`羽`,``,``,``,`M`,`M`,`M`,`M`]),SE6:n(`KumiD6`).$new(`星`),SE8:n(`KumiDice`).$new([`Q`,``,``,``,`星`,`星`,`星`,`M`]),SE10:n(`KumiDice`).$new([`Q`,``,``,`星`,`星`,`星`,`星`,`星`,`M`,`M`]),SE12:n(`KumiDice`).$new([`星`,``,`星`,`星`,`M`,`Q`,`M`,`星`,`星`,`星`,``,`星`]),CO6:n(`KumiD6`).$new(`狐`),CO8:n(`KumiDice`).$new([`Q`,``,``,``,`狐`,`狐`,`狐`,`M`]),CO10:n(`KumiDice`).$new([`Q`,``,``,`狐`,`狐`,`狐`,`狐`,`狐`,`M`,`M`]),CO12:n(`KumiDice`).$new([`Q`,``,``,`狐狐狐`,`狐狐`,`狐`,`狐狐狐`,`狐狐`,`狐`,`狐`,`M`,`M`]),GM6:n(`KumiD6`).$new(e),GM8:n(`KumiDice`).$new([`Q`,``,``,``,`W`,`W`,`W`,`M`]),GM10:n(`KumiDice`).$new([`Q`,``,``,`W`,`W`,`W`,`W`,`W`,`M`,`M`]),Q12:n(`QDice`).$new([``,``,``,`Q`,`Q`,`Q`,`Q`,`Q`,`Q`,`Q`,`M`,`M`])}).$freeze()),I.$register_prefix(`EXI`,n(`TABLES`).$keys())})(g[0],X(`Base`),g)})(G[0],G)})(z[0],z)});