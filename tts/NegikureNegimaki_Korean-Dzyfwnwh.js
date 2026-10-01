import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/game_system/NegikureNegimaki`]=function(u){var z=u.module,H=u.klass,f=u.const_set,$=u.truthy,g=u.def,D=u.send,x=u.rb_ge,v=u.hash2,I=u.rb_minus,L=u.rb_plus,M=[],e=u.nil;return(function(B,P){var C=[z(B,`BCDice`)].concat(P);return(function(E,Y){var A=[z(E,`GameSystem`)].concat(Y),w=u.$r(A);return(function(R,b,q){var d=H(R,b,`NegikureNegimaki`),y=[d].concat(q),m=u.$r(y),J=d.$$prototype;return J.randomizer=e,f(y[0],`ID`,`NegikureNegimaki`),f(y[0],`NAME`,`ネジクレネジマキ`),f(y[0],`SORT_KEY`,`ねしくれねしまき`),f(y[0],`HELP_MESSAGE`,`\u25A0 \u884C\u70BA\u5224\u5B9A
nNNx#y: n\u500B\u306ED6\u3092\u632F\u308A\u3001x\u4EE5\u4E0A\u306E\u51FA\u76EE\u306E\u500B\u6570\u3092\u6210\u529F\u30EC\u30D9\u30EB\u3068\u3057\u3066\u5224\u5B9A\u3059\u308B
n: \u30C0\u30A4\u30B9\u6570\uFF08\u7701\u7565\u66421\uFF09
x: \u96E3\u6613\u5EA6\uFF08\u7701\u7565\u66424\uFF09
y: \u8981\u6C42\u6210\u529F\u30EC\u30D9\u30EB\uFF08\u7701\u7565\u66421\u30010\u306F1\u3068\u3057\u3066\u6271\u3046\uFF09

\u25A0 \u6226\u95D8\u5224\u5B9A\uFF08\u30A2\u30BF\u30C3\u30AF\u5224\u5B9A\uFF09
nNAx#y: n\u500B\u306ED6\u3092\u632F\u308A\u3001x\u4EE5\u4E0A\u3092\u6210\u529F\u3068\u3059\u308B\u3002y\u4EE5\u4E0A\u306E\u6210\u529F\u306F\u76F4\u6483\u30C0\u30E1\u30FC\u30B8\u306B\u306A\u308B
n: \u30C0\u30A4\u30B9\u6570\uFF08\u7701\u7565\u66421\uFF09
x: \u96E3\u6613\u5EA6\uFF08\u7701\u7565\u66424\uFF09
y: \u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u5024\uFF08\u7701\u7565\u66426\u30010\u306F1\u3068\u3057\u3066\u6271\u3046\uFF09
\u901A\u5E38\u30C0\u30E1\u30FC\u30B8 = \u6210\u529F\u30EC\u30D9\u30EB - \u76F4\u6483\u30C0\u30E1\u30FC\u30B8
\u76F4\u6483\u30C0\u30E1\u30FC\u30B8 = \u6210\u529F\u3057\u305F\u51FA\u76EE\u306E\u3046\u3061 y \u4EE5\u4E0A\u306E\u500B\u6570
\u30AC\u30C3\u30C4\u6E1B\u5C11 = \u51FA\u76EE 1 \u306E\u500B\u6570

\u25A0 \u30B9\u30C8\u30E9\u30A4\u30AF\u306E\u5224\u5B9A
nNS: n\u500B\u306ED6\u3092\u632F\u308A\u3001\u51FA\u76EE 1 \u306E\u500B\u6570\u3060\u3051\u30AC\u30C3\u30C4\u6E1B\u5C11\u3092\u7B97\u51FA\u3059\u308B
n: \u30C0\u30A4\u30B9\u6570\uFF08\u7701\u7565\u66421\uFF09
\u30AC\u30C3\u30C4\u6E1B\u5C11\u304C 0 \u306A\u3089\u6210\u529F\u30011 \u4EE5\u4E0A\u306A\u3089\u5931\u6557
`),d.$register_prefix(`\\d*NN\\d*(#\\d+)?`,`\\d*NA\\d*(#\\d+)?`,`\\d*NS`),g(d,`$eval_game_system_specific_command`,function(c){var i=this,t=e,s=e;return $(t=$(s=i.$eval_action_command(c))?s:i.$eval_attack_command(c))?t:i.$eval_guts_command(c)}),d.$private(),g(d,`$eval_action_command`,function(c){var i,t,s,a=this,n=e,_=e,r=e,l=e,o=e,K=e,N=e,j=e,G=e;return n=/^(\d+)?NN(\d+)?(?:#(\d+))?$/i.$match(c),!$(n)||(_=$(r=(i=n[`$[]`](1),i===e||i==null?e:i.$to_i()))?r:1,l=$(r=(t=n[`$[]`](2),t===e||t==null?e:t.$to_i()))?r:4,o=[$(r=(s=n[`$[]`](3),s===e||s==null?e:s.$to_i()))?r:1,1].$max(),$(_[`$zero?`]()))?e:(K=`(`+_+`NN`+l+`#`+o+`)`,N=a.randomizer.$roll_barabara(_,6),j=D(N,`count`,[],function(S){return S??=e,x(S,l)}),G=`[`+N.$join(`,`)+`]`,a.$build_result(K,G,j,o))}),g(d,`$eval_attack_command`,function(c){var i,t,s,a=this,n=e,_=e,r=e,l=e,o=e,K=e,N=e,j=e,G=e,F=e,S=e;return n=/^(\d+)?NA(\d+)?(?:#(\d+))?$/i.$match(c),!$(n)||(_=$(r=(i=n[`$[]`](1),i===e||i==null?e:i.$to_i()))?r:1,l=$(r=(t=n[`$[]`](2),t===e||t==null?e:t.$to_i()))?r:4,o=[$(r=(s=n[`$[]`](3),s===e||s==null?e:s.$to_i()))?r:6,1].$max(),$(_[`$zero?`]()))?e:(K=`(`+_+`NA`+l+`#`+o+`)`,N=a.randomizer.$roll_barabara(_,6),j=D(N,`count`,[],function(k){return k??=e,x(k,l)}),G=D(N,`count`,[],function(k){return k??=e,$(r=x(k,l))?x(k,o):r}),F=N.$count(1),S=`[`+N.$join(`,`)+`]`,a.$build_attack_result(K,S,j,G,F))}),g(d,`$eval_guts_command`,function(c){var i,t=this,s=e,a=e,n=e,_=e,r=e,l=e,o=e;return s=/^(\d+)?NS$/i.$match(c),!$(s)||(a=$(n=(i=s[`$[]`](1),i===e||i==null?e:i.$to_i()))?n:1,$(a[`$zero?`]()))?e:(_=`(`+a+`NS)`,r=t.randomizer.$roll_barabara(a,6),l=r.$count(1),o=`[`+r.$join(`,`)+`]`,t.$build_guts_result(_,o,l))}),g(d,`$build_result`,function(c,i,t,s){var a=this,n=e,_=e,r=e,l=e;return n=x(t,s),_=$(n)?a.$translate(`success`):a.$translate(`failure`),r=a.$translate(`NegikureNegimaki.result_level`,v([`success_level`,`required_level`],{success_level:t,required_level:s})),l=``+c+` ＞ `+i+` ＞ `+r+` ＞ `+_,$(n)?m(`Result`).$success(l):m(`Result`).$failure(l)}),g(d,`$build_attack_result`,function(c,i,t,s,a){var n=this,_=e,r=e,l=e,o=e;return _=[I(t,s),0].$max(),r=t[`$positive?`](),l=n.$translate(`NegikureNegimaki.damage`,v([`normal_damage`,`direct_damage`],{normal_damage:_,direct_damage:s})),$(a[`$positive?`]())&&(l=L(l,`/`+n.$translate(`NegikureNegimaki.guts_loss`,v([`guts_loss`],{guts_loss:a})))),o=``+c+` ＞ `+i+` ＞ `+n.$translate(`NegikureNegimaki.success_level`,v([`success_level`],{success_level:t}))+` ＞ `+l,$(r)?m(`Result`).$success(o):m(`Result`).$failure(o)}),g(d,`$build_guts_result`,function(c,i,t){var s=this,a=e,n=e;return a=t[`$zero?`](),n=``+c+` ＞ `+i+` ＞ `+s.$translate(`NegikureNegimaki.guts_loss`,v([`guts_loss`],{guts_loss:t})),$(a)?m(`Result`).$success(n):m(`Result`).$failure(n)})})(A[0],w(`Base`),A)})(C[0],C)})(M[0],M)};Opal.queue(function(u){var z=u.module,H=u.klass,f=u.const_set,$=u.send2,g=u.find_super,D=u.def,x=u.top,v=[];u.nil;return x.$require(`bcdice/game_system/NegikureNegimaki`),(function(L,M){var B=[z(L,`BCDice`)].concat(M);return(function(P,T){var E=[z(P,`GameSystem`)].concat(T),Y=u.$r(E);return(function(p,A,w){var R=H(p,A,`NegikureNegimaki_Korean`),b=[R].concat(w);return f(b[0],`ID`,`NegikureNegimaki:Korean`),f(b[0],`NAME`,`네지쿠레 네지마키`),f(b[0],`SORT_KEY`,`国際化:Korean:네지쿠레 네지마키`),f(b[0],`HELP_MESSAGE`,`\u25A0 \uD589\uC704 \uD310\uC815
nNNx#y: n\uAC1C\uC758 D6\uC744 \uAD74\uB824, x \uC774\uC0C1\uC758 \uC8FC\uC0AC\uC704 \uACB0\uACFC\uAC12\uC758 \uAC1C\uC218\uB97C \uC131\uACF5 \uB808\uBCA8\uB85C \uD310\uC815.
n: \uC8FC\uC0AC\uC704 \uC218\uFF08\uC0DD\uB7B5 \uC2DC 1\uFF09
x: \uB09C\uC774\uB3C4\uFF08\uC0DD\uB7B5 \uC2DC 4\uFF09
y: \uC694\uAD6C \uC131\uACF5 \uB808\uBCA8\uFF08\uC0DD\uB7B5 \uC2DC 1, 0\uC740 1\uB85C \uCC98\uB9AC\uFF09

\u25A0 \uC804\uD22C \uD310\uC815\uFF08\uACF5\uACA9 \uD310\uC815\uFF09
nNAx#y: n\uAC1C\uC758 D6\uC744 \uAD74\uB824, x \uC774\uC0C1\uC744 \uC131\uACF5\uC73C\uB85C \uAC04\uC8FC. y \uC774\uC0C1\uC758 \uC131\uACF5\uC740 \uC9C1\uACA9 \uD53C\uD574\uAC00 \uB41C\uB2E4.
n: \uC8FC\uC0AC\uC704 \uC218\uFF08\uC0DD\uB7B5 \uC2DC 1\uFF09
x: \uB09C\uC774\uB3C4\uFF08\uC0DD\uB7B5 \uC2DC 4\uFF09
y: \uD06C\uB9AC\uD2F0\uCEEC \uAC12\uFF08\uC0DD\uB7B5 \uC2DC 6, 0\uC740 1\uB85C \uCC98\uB9AC\uFF09
\uC77C\uBC18 \uD53C\uD574 = \uC131\uACF5 \uB808\uBCA8 - \uC9C1\uACA9 \uD53C\uD574
\uC9C1\uACA9 \uD53C\uD574 = \uC131\uACF5\uD55C \uB208 \uC911 y \uC774\uC0C1\uC758 \uAC1C\uC218
\uAC70\uCE20 \uAC10\uC18C = \uC8FC\uC0AC\uC704 \uACB0\uACFC\uAC12 1\uC758 \uAC1C\uC218

\u25A0 \uC2A4\uD2B8\uB77C\uC774\uD06C \uD310\uC815
nNS: n\uAC1C\uC758 D6\uC744 \uAD74\uB824, \uC8FC\uC0AC\uC704 \uACB0\uACFC\uAC12 1\uC758 \uAC1C\uC218\uB9CC\uD07C \uAC70\uCE20 \uAC10\uC18C\uB97C \uC0B0\uCD9C\uD55C\uB2E4
n: \uC8FC\uC0AC\uC704 \uC218\uFF08\uC0DD\uB7B5 \uC2DC 1\uFF09
\uAC70\uCE20 \uAC10\uC18C\uAC00 0\uC774\uBA74 \uC131\uACF5, 1 \uC774\uC0C1\uC774\uBA74 \uC2E4\uD328
`),R.$register_prefix_from_super_class(),D(R,`$initialize`,function q(d){q.$$p;var m=this;return q.$$p=null,$(m,g(m,`initialize`,q,!1,!0),`initialize`,[d],null),m.locale=`ko_kr`})})(E[0],Y(`NegikureNegimaki`),E)})(B[0],B)})(v[0],v)});