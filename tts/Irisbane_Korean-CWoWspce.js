import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/game_system/Irisbane`]=function(n){var m=n.module,M=n.klass,s=n.const_set,q=n.send2,w=n.find_super,b=n.def,e=n.truthy,x=n.rb_lt,N=n.rb_le,_=n.send,H=n.rb_times,S=n.hash2,h=n.rb_gt,P=n.thrower,p=n.rb_plus,U=n.rb_minus,L=[],r=n.nil,f=n.$$$;return(function(Y,F){var v=[m(Y,`BCDice`)].concat(F);return(function(B,J){var y=[m(B,`GameSystem`)].concat(J),X=n.$r(y);return(function(Z,O,nn){var A=M(Z,O,`Irisbane`),o=[A].concat(nn),a=n.$r(o),rn=A.$$prototype;return rn.randomizer=r,s(o[0],`ID`,`Irisbane`),s(o[0],`NAME`,`瞳逸らさぬイリスベイン`),s(o[0],`SORT_KEY`,`ひとみそらさぬいりすへいん`),s(o[0],`HELP_MESSAGE`,`\u25A0\u653B\u6483\u5224\u5B9A\uFF08 ATTACKx@y<=z \uFF09
x: \u653B\u6483\u529B
y: \u5224\u5B9A\u6570
z: \u76EE\u6A19\u5024
\uFF08\u203B ATTACK \u306F ATK \u307E\u305F\u306F AT \u3068\u7C21\u7565\u5316\u53EF\u80FD\uFF09
\u4F8B\uFF09 ATTACK2@3<=5
\u4F8B\uFF09 ATK10@2<=4
\u4F8B\uFF09 AT8@3<=2

\u4E0A\u8A18 x y z \u306B\u306F\u305D\u308C\u305E\u308C\u56DB\u5247\u6F14\u7B97\u3092\u6307\u5B9A\u53EF\u80FD\u3002
\u4F8B\uFF09 ATTACK2+7@3*2<=5-1

\u25A1\u653B\u6483\u5224\u5B9A\u306E\u30C0\u30E1\u30FC\u30B8\u5897\u6E1B\uFF08 ATTACKx@y<=z[+a]  ATTACKx@y<=z[-a]\uFF09
\u672B\u5C3E\u306B [+a] \u307E\u305F\u306F [-a] \u3068\u6307\u5B9A\u3059\u308B\u3068\u3001\u6700\u7D42\u7684\u306A\u30C0\u30E1\u30FC\u30B8\u3092\u5897\u6E1B\u3067\u304D\u308B\u3002
a: \u5897\u6E1B\u91CF
\u4F8B\uFF09 ATTACK2@3<=5[+10]
\u4F8B\uFF09 ATK10@2<=4[-8]
\u4F8B\uFF09 AT8@3<=2[-8+5]

\u25A0\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\uFF08p115\uFF09
SceneSituation, SSi
`),s(o[0],`ATTACK_ROLL_REG`,/^AT(TACK|K)?([+\-*\/()\d]+)@([+\-*\/()\d]+)<=([+\-*\/()\d]+)(\[([+-])([+\-*\/()\d]+)\])?/i.$freeze()),A.$register_prefix(`AT(TACK|K)?`),b(A,`$initialize`,function T($){T.$$p;var i=this;return T.$$p=null,q(i,w(i,`initialize`,T,!1,!0),`initialize`,[$],null),i.sort_barabara_dice=!0,i.round_type=f(a(`RoundType`),`CEIL`)}),b(A,`$eval_game_system_specific_command`,function($){var l=this,i=r,t=r;return $=e(i=a(`ALIAS`)[`$[]`]($))?i:$,e(t=a(`ATTACK_ROLL_REG`).$match($))?l.$roll_attack(t[`$[]`](2),t[`$[]`](3),t[`$[]`](4),t[`$[]`](6),t[`$[]`](7)):l.$roll_tables($,f(l.$class(),`TABLES`))}),A.$private(),b(A,`$roll_attack`,function($,l,i,t,u){try{P(`eval_return`);var K=this,z=r,D=r,d=r,g=r,Q=r,V=r,R=r,C=r,c=r;return z=a(`Arithmetic`).$eval($,f(a(`RoundType`),`CEIL`)),D=a(`Arithmetic`).$eval(l,f(a(`RoundType`),`CEIL`)),d=a(`Arithmetic`).$eval(i,f(a(`RoundType`),`CEIL`)),g=e(u[`$nil?`]())?r:a(`Arithmetic`).$eval(u,f(a(`RoundType`),`CEIL`)),e(z[`$nil?`]())||e(D[`$nil?`]())||e(d[`$nil?`]())||e(t)&&e(g[`$nil?`]())?r:(e(x(z,0))&&(z=0),d=d.$clamp(1,6),Q=K.$make_command_text(z,D,d,t,g),e(N(D,0))?``+Q+` ＞ `+K.$translate(`Irisbane.zero_dice_count`):(V=K.randomizer.$roll_barabara(D,6).$sort(),R=_(V,`count`,[],function(E){return E??=r,N(E,d)}),C=H(R,z),c=[],c[`$<<`](Q),c[`$<<`](V.$join(`,`)),c[`$<<`](K.$translate(`Irisbane.success_dice_count`,S([`count`],{count:R}))),e(h(R,0))&&c[`$<<`](K.$translate(`Irisbane.attack_power`,S([`power`],{power:z}))),e(h(R,0))&&(e(t)&&e(g)?(c[`$<<`](K.$translate(`Irisbane.damage_with_mod`,S([`damage`,`operator`,`mod_value`],{damage:C,operator:t,mod_value:g}))),C=K.$parse_operator(t).$call(C,g),e(x(C,0))&&(C=0),c[`$<<`](C.$to_s())):c[`$<<`](K.$translate(`Irisbane.damage`,S([`damage`],{damage:C})))),_(a(`Result`).$new(c.$join(` ＞ `)),`tap`,[],function(E){var j;return E??=r,j=[h(R,0)],_(E,`condition=`,j),j[j.length-1]})))}catch(G){if(G===n.t_eval_return)return G.$v;throw G}}),b(A,`$make_command_text`,function($,l,i,t,u){var I=r;return I=`(ATTACK`+$+`@`+l+`<=`+i,e(t)&&(I=p(I,`[`+t+u+`]`)),I=p(I,`)`),I}),b(A,`$parse_operator`,function($){var l=this;switch($.valueOf()){case`+`:return _(l,`lambda`,[],function(t,u){return t??=r,u??=r,p(t,u)});case`-`:return _(l,`lambda`,[],function(t,u){return t??=r,u??=r,U(t,u)});default:return r}}),(function(T,$){var l=[T].concat($),i=n.$r(l);return T.$private(),b(T,`$translate_tables`,function(u){return S([`SCENESITUATION`],{SCENESITUATION:f(i(`DiceTable`),`D66LeftRangeTable`).$from_i18n(`Irisbane.SceneSituation`,u)})})})(n.get_singleton_class(A),o),s(o[0],`TABLES`,A.$translate_tables(`ja_jp`).$freeze()),s(o[0],`ALIAS`,_(_(S([`SSi`],{SSi:`SceneSituation`}),`transform_keys`,[],`upcase`.$to_proc()),`transform_values`,[],`upcase`.$to_proc()).$freeze()),A.$register_prefix(a(`TABLES`).$keys(),a(`ALIAS`).$keys())})(y[0],X(`Base`),y)})(v[0],v)})(L[0],L)};Opal.queue(function(n){var m=n.module,M=n.klass,s=n.const_set,q=n.send2,w=n.find_super,b=n.def,e=n.top,x=[];n.nil;return e.$require(`bcdice/game_system/Irisbane`),(function(_,H){var h=[m(_,`BCDice`)].concat(H);return(function(P,p){var L=[m(P,`GameSystem`)].concat(p),r=n.$r(L);return(function(f,Y,F){var k=M(f,Y,`Irisbane_Korean`),v=[k].concat(F);return s(v[0],`ID`,`Irisbane:Korean`),s(v[0],`NAME`,`눈 돌리지 않는 이리스베인`),s(v[0],`SORT_KEY`,`国際化:Korean:눈 돌리지 않는 이리스베인`),s(v[0],`HELP_MESSAGE`,`\u25A0\uACF5\uACA9 \uD310\uC815\uFF08 ATTACKx@y<=z \uFF09
x: \uACF5\uACA9\uB825
y: \uD310\uC815 \uC218
z: \uBAA9\uD45C\uAC12
\uFF08\u203B ATTACK \uC740 ATK \uB610\uB294 AT \uB85C \uC904\uC5EC \uC4F8 \uC218 \uC788\uC2B5\uB2C8\uB2E4\uFF09
\uC608\uFF09 ATTACK2@3<=5
\uC608\uFF09 ATK10@2<=4
\uC608\uFF09 AT8@3<=2

\uC704 x y z \uC5D0\uB294 \uAC01\uAC01 \uC0AC\uCE59\uC5F0\uC0B0\uC744 \uC9C0\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
\uC608\uFF09 ATTACK2+7@3*2<=5-1

\u25A1\uACF5\uACA9 \uD310\uC815\uC758 \uB370\uBBF8\uC9C0 \uC99D\uAC10\uFF08 ATTACKx@y<=z[+a]  ATTACKx@y<=z[-a]\uFF09
\uB9D0\uBBF8\uC5D0 [+a] \uB610\uB294 [-a] \uB97C \uC9C0\uC815\uD558\uBA74 \uCD5C\uC885 \uB370\uBBF8\uC9C0\uB97C \uC99D\uAC10\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
a: \uC99D\uAC10\uB7C9
\uC608\uFF09 ATTACK2@3<=5[+10]
\uC608\uFF09 ATK10@2<=4[-8]
\uC608\uFF09 AT8@3<=2[-8+5]

\u25A0\uC2DC\uCD94\uC5D0\uC774\uC158\uFF08p115\uFF09
SceneSituation, SSi
`),b(k,`$initialize`,function B(J){B.$$p;var y=this;return B.$$p=null,q(y,w(y,`initialize`,B,!1,!0),`initialize`,[J],null),y.locale=`ko_kr`}),s(v[0],`TABLES`,k.$translate_tables(`ko_kr`).$freeze()),k.$register_prefix_from_super_class()})(L[0],r(`Irisbane`),L)})(h[0],h)})(x[0],x)});