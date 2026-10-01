import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.queue(function(n){var z=n.module,B=n.klass,G=n.const_set,Q=n.eqeqeq,S=n.def,$=n.truthy,a=n.eqeq,D=n.thrower,C=n.rb_lt,_=n.rb_plus,M=n.rb_times,y=n.rb_ge,g=n.rb_le,m=n.rb_divide,w=n.rb_minus,U=n.rb_gt,I=[],r=n.nil,q=n.$$$;return(function(H,K){var k=[z(H,`BCDice`)].concat(K);return(function(P,Y){var N=[z(P,`GameSystem`)].concat(Y),v=n.$r(N);return(function(F,J,V){var d=B(F,J,`RuneQuestRoleplayingInGlorantha`),b=[d].concat(V),o=n.$r(b),W=d.$$prototype;return W.randomizer=r,G(b[0],`ID`,`RuneQuestRoleplayingInGlorantha`),G(b[0],`NAME`,`ルーンクエスト：ロールプレイング・イン・グローランサ`),G(b[0],`SORT_KEY`,`るうんくえすと4`),G(b[0],`HELP_MESSAGE`,`\u30FB\u5224\u5B9A\u30B3\u30DE\u30F3\u30C9 \u6C7A\u5B9A\u7684\u6210\u529F\u3001\u52B9\u679C\u7684\u6210\u529F\u3001\u30D5\u30A1\u30F3\u30D6\u30EB\u3092\u542B\u3081\u305F\u5224\u5B9A\u3092\u884C\u3046\u3002
RQG<=\u6210\u529F\u7387      (\u57FA\u672C\u66F8\u5F0F)
RQG\u6210\u529F\u7387        (\u7701\u7565\u8A18\u6CD5)

\u4F8B1\uFF1ARQG<=80    \uFF08\u6280\u80FD\u502480\u3067\u5224\u5B9A\uFF09
\u4F8B2\uFF1ARQG<=80+20 \uFF08\u6280\u80FD\u5024100\u3067\u5224\u5B9A\uFF09
\u4F8B3\uFF1ARQG80      \uFF08\u7701\u7565\u66F8\u5F0F\u3067\u6280\u80FD\u502480\u306E\u5224\u5B9A\uFF09
\u4F8B4\uFF1ARQG80+20   \uFF08\u7701\u7565\u66F8\u5F0F\u3067\u6280\u80FD\u5024100\u306E\u5224\u5B9A\uFF09

\u30FB\u62B5\u6297\u5224\u5B9A\u30B3\u30DE\u30F3\u30C9\uFF08\u80FD\u52D5-\u53D7\u52D5\uFF09 \u6C7A\u5B9A\u7684\u6210\u529F\u3001\u52B9\u679C\u7684\u6210\u529F\u3001\u30D5\u30A1\u30F3\u30D6\u30EB\u3092\u542B\u3081\u305F\u5224\u5B9A\u3092\u884C\u3046\u3002
RES(\u80FD\u52D5\u80FD\u529B-\u53D7\u52D5\u80FD\u529B)m\u5897\u5F37\u5024
\u5897\u5F37\u5024\u306F\u7701\u7565\u53EF\u80FD\u3002

\u4F8B1\uFF1ARES(9-11)    (\u80FD\u52D5\u80FD\u529B9 vs \u53D7\u52D5\u80FD\u529B11\u3067\u5224\u5B9A)
\u4F8B2\uFF1ARES(9-11)m20 (\u80FD\u52D5\u80FD\u529B9 vs \u53D7\u52D5\u80FD\u529B11\u3001+20%\u306E\u5897\u5F37\u304C\u80FD\u52D5\u5074\u306B\u5165\u308B\u5224\u5B9A)
\u4F8B3\uFF1ARES(9)m50    (\u80FD\u52D5\u80FD\u529B\u3068\u53D7\u52D5\u80FD\u529B\u306E\u5DEE\u304C9\u3067\u3001+50%\u306E\u5897\u5F37\u304C\u80FD\u52D5\u5074\u306B\u5165\u308B\u5224\u5B9A)

\u30FB\u62B5\u6297\u5224\u5B9A\u30B3\u30DE\u30F3\u30C9(\u80FD\u52D5\u5074\u306E\u307F) \u6C7A\u5B9A\u7684\u6210\u529F\u3001\u52B9\u679C\u7684\u6210\u529F\u3001\u30D5\u30A1\u30F3\u30D6\u30EB\u306F\u542B\u3081\u305A\u5224\u5B9A\u3092\u884C\u3046\u3002
RSA(\u80FD\u52D5\u80FD\u529B)m\u5897\u5F37\u5024
\u5897\u5F37\u5024\u306F\u7701\u7565\u53EF\u80FD\u3002

\u4F8B1\uFF1ARSA(9)       (\u80FD\u52D5\u80FD\u529B9\u3067\u5224\u5B9A)
\u4F8B2\uFF1ARSA(9)m20    (\u80FD\u52D5\u80FD\u529B9\u3067\u5224\u5B9A\u3001+20%\u306E\u5897\u5F37\u304C\u80FD\u52D5\u5074\u306B\u5165\u308B\u5224\u5B9A)

`),d.$register_prefix(`RQG`,`RES`,`RSA`),S(d,`$eval_game_system_specific_command`,function(c){var s=this,t=r;return Q(/RQG/i,t=c)?s.$do_ability_roll(c):Q(/RES/i,t)?s.$do_resistance_roll(c):Q(/RSA/i,t)?s.$do_resistance_active_characteristic_roll(c):r}),d.$private(),S(d,`$do_ability_roll`,function(c){try{D(`eval_return`);var t=this,e=r,R=r,i=r,u=r,h=r;return e=/^(RQG)((<=)?([+-\/*\d]+))?$/.$match(c),$(e)?(R=t.randomizer.$roll_once(100),$(e[`$[]`](4))?(i=o(`Arithmetic`).$eval(e[`$[]`](4),q(o(`RoundType`),`ROUND`)),u=`(1D100<=`+i+`) ＞`,a(i,0)?o(`Result`).$failure(``+u+` 失敗`):(h=``+u+` `+R+` ＞`,t.$get_roll_result(h,i,R))):`(1D100) ＞ `+R):r}catch(f){if(f===n.t_eval_return)return f.$v;throw f}}),S(d,`$do_resistance_roll`,function(c){try{D(`eval_return`);var t=this,e=r,R=r,i=r,u=r,h=r;return e=/^(RES)([+-\/*\d]+)(M([+-\/*\d]+))?$/.$match(c),!$(e)||!$(e[`$[]`](2))?r:(R=o(`Arithmetic`).$eval(e[`$[]`](2),q(o(`RoundType`),`ROUND`)),$(C(R,-10))&&(R=-10),i=_(50,M(R,5)),$(e[`$[]`](4))&&(i=_(i,o(`Arithmetic`).$eval(e[`$[]`](4),q(o(`RoundType`),`ROUND`)))),u=t.randomizer.$roll_once(100),h=`(1D100<=`+i+`) ＞ `+u+` ＞`,t.$get_roll_result(h,i,u))}catch(f){if(f===n.t_eval_return)return f.$v;throw f}}),S(d,`$do_resistance_active_characteristic_roll`,function(c){try{D(`eval_return`);var t=this,e=r,R=r,i=r,u=r,h=r,f=r,E=r;return e=/^(RSA)(\d+)(M([+-\/*\d]+))?$/.$match(c),!$(e)||!$(e[`$[]`](2))?r:(R=e[`$[]`](2).$to_i(),a(R,0)?`0は指定できません。`:(i=$(e[`$[]`](4))?o(`Arithmetic`).$eval(e[`$[]`](4),q(o(`RoundType`),`ROUND`)):0,u=t.randomizer.$roll_once(100),h=_(M(R,5),i),f=`(1D100<=`+h+`) ＞ `+u+` ＞`,E=`決定的成功、効果的成功、ファンブルは未処理。必要なら確認すること。`,$(y(u,96))?o(`Result`).$failure(``+f+` \u5931\u6557
`+E):$(g(u,5))||$(g(u,i))?o(`Result`).$success(``+f+` \u6210\u529F
`+E):``+f+` 相手側能力値`+_(R,m(w(_(50,i),u),5).$floor())+`\u307E\u3067\u6210\u529F
`+E))}catch(T){if(T===n.t_eval_return)return T.$v;throw T}}),S(d,`$get_roll_result`,function(c,s,t){var e=r,R=r,i=r;return e=m(s.$to_f(),20).$round(),R=m(s.$to_f(),5).$round(),i=m(w(100,s.$to_f()),20).$round(),a(t,1)||$(g(t,e))?o(`Result`).$critical(``+c+` 決定的成功`):a(t,100)||$(y(t,_(w(100,i),1)))?o(`Result`).$fumble(``+c+` ファンブル`):$(y(t,96))||$(U(t,s))&&$(U(t,5))?o(`Result`).$failure(``+c+` 失敗`):$(g(t,R))?o(`Result`).$success(``+c+` 効果的成功`):$(g(t,5))||$(g(t,s))?o(`Result`).$success(``+c+` 成功`):o(`Result`).$failure(``+c+` エラー`)})})(N[0],v(`Base`),N)})(k[0],k)})(I[0],I)});