import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/game_system/Alsetto`]=function(n){var v=n.module,I=n.klass,s=n.const_set,N=n.send2,P=n.find_super,g=n.def,i=n.truthy,C=n.eqeqeq,L=n.hash2,z=n.rb_gt,E=n.send,q=n.rb_le,$=n.rb_plus,R=n.rb_times,S=[],e=n.nil;return(function(k,T){var D=[v(k,`BCDice`)].concat(T);return(function(j,x){var u=[v(j,`GameSystem`)].concat(x),w=n.$r(u);return(function(Q,y,O){var l=I(Q,y,`Alsetto`),K=[l].concat(O),ee=l.$$prototype;return ee.randomizer=e,s(K[0],`ID`,`Alsetto`),s(K[0],`NAME`,`詩片のアルセット`),s(K[0],`SORT_KEY`,`うたかたのあるせつと`),s(K[0],`HELP_MESSAGE`,`\u30FB\u6210\u529F\u5224\u5B9A\uFF1AnAL[m]\u3000\u3000\u3000\u3000\u30FB\u30C8\u30E9\u30A4\u30A2\u30F3\u30D5\u7121\u3057\uFF1AnALC[m]
\u30FB\u547D\u4E2D\u5224\u5B9A\uFF1AnAL[m]*p\u3000\u3000\u3000\u30FB\u30C8\u30E9\u30A4\u30A2\u30F3\u30D5\u7121\u3057\uFF1AnALC[m]*p
\u30FB\u547D\u4E2D\u5224\u5B9A\uFF08\u30AC\u30F3\u30B9\u30EA\u30F3\u30AC\u30FC\u306E\u6839\u6E90\u8A69\uFF09\uFF1AnALG[m]*p
[]\u5185\u306F\u7701\u7565\u53EF\u80FD\u3002

AL\u30B3\u30DE\u30F3\u30C9\u306F\u30C8\u30E9\u30A4\u30A2\u30F3\u30D5\u306E\u5206\u3060\u3051\u3001\u81EA\u52D5\u3067\u632F\u308A\u8DB3\u3057\u51E6\u7406\u3092\u884C\u3044\u307E\u3059\u3002
\u300Cn\u300D\u3067\u30C0\u30A4\u30B9\u6570\u3092\u6307\u5B9A\u3002
\u300Cm\u300D\u3067\u76EE\u6A19\u5024\u3092\u6307\u5B9A\u3002\u7701\u7565\u6642\u306F\u3001\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u300C3\u300D\u304C\u4F7F\u7528\u3055\u308C\u307E\u3059\u3002
\u300Cp\u300D\u3067\u653B\u6483\u529B\u3092\u6307\u5B9A\u3002\u300C*\u300D\u306F\u300Cx\u300D\u3067\u3082\u53EF\u3002
\u653B\u6483\u529B\u6307\u5B9A\u3067\u547D\u4E2D\u5224\u5B9A\u3068\u306A\u308A\u3001\u6210\u529F\u6570\u3067\u306F\u306A\u304F\u3001\u30C0\u30E1\u30FC\u30B8\u3092\u7D50\u679C\u8868\u793A\u3057\u307E\u3059\u3002

ALC\u30B3\u30DE\u30F3\u30C9\u306F\u30C8\u30E9\u30A4\u30A2\u30F3\u30D5\u7121\u3057\u3067\u3001\u6210\u529F\u6570\u3001\u30C0\u30E1\u30FC\u30B8\u3092\u7D50\u679C\u8868\u793A\u3057\u307E\u3059\u3002
ALG\u30B3\u30DE\u30F3\u30C9\u306F\u300C2\u4EE5\u4E0B\u300D\u3067\u30C8\u30E9\u30A4\u30A2\u30F3\u30D5\u51E6\u7406\u3092\u884C\u3044\u307E\u3059\u3002

\u3010\u66F8\u5F0F\u4F8B\u3011
\u30FB5AL \u2192 5d6\u3067\u76EE\u6A19\u50243\u3002
\u30FB5ALC \u2192 5d6\u3067\u76EE\u6A19\u50243\u3002\u30C8\u30E9\u30A4\u30A2\u30F3\u30D5\u7121\u3057\u3002
\u30FB6AL2 \u2192 6d6\u3067\u76EE\u6A19\u50242\u3002
\u30FB4AL*5 \u2192 4d6\u3067\u76EE\u6A19\u50243\u3001\u653B\u6483\u529B5\u306E\u547D\u4E2D\u5224\u5B9A\u3002
\u30FB7AL2x10 \u2192 7d6\u3067\u76EE\u6A19\u50242\u3001\u653B\u6483\u529B10\u306E\u547D\u4E2D\u5224\u5B9A\u3002
\u30FB8ALC4x5 \u2192 8d6\u3067\u76EE\u6A19\u50244\u3001\u653B\u6483\u529B5\u3001\u30C8\u30E9\u30A4\u30A2\u30F3\u30D5\u7121\u3057\u306E\u547D\u4E2D\u5224\u5B9A\u3002
`),l.$register_prefix(`\\d+AL[CG]?`),g(l,`$initialize`,function h(_){h.$$p;var t=this;return h.$$p=null,N(t,P(t,`initialize`,h,!1,!0),`initialize`,[_],null),t.sort_add_dice=!0}),g(l,`$eval_game_system_specific_command`,function(_){return this.$check_roll(_)}),l.$private(),g(l,`$parse_check_roll`,function(_){var r,t=e,d=e,p=e,a=e,m=e,f=e,c=e;return t=/(\d+)AL(C|G)?(\d+)?((x|\*)(\d+))?$/i.$match(_),i(t)?(d=t[`$[]`](1).$to_i(),p=i(a=t[`$[]`](2)[`$nil?`]())?a:t[`$[]`](2)[`$==`](`G`),m=C(`G`,a=t[`$[]`](2))?2:C(`C`,a)?0:1,f=i(a=(r=t[`$[]`](3),r===e||r==null?e:r.$to_i()))?a:3,c=t[`$[]`](6).$to_i(),L([`rapid`,`enable_critical`,`critical_number`,`target`,`damage`],{rapid:d,enable_critical:p,critical_number:m,target:f,damage:c})):e}),g(l,`$check_roll`,function(_){var r=this,t=e,d=e,p=e,a=e,m=e,f=e,c=e,M=e,o=e,B=e,H=e,U=e,F=e,J=e,V=e,W=e,X=e,G=e,Z=e;if(t=r.$parse_check_roll(_),!i(t))return e;for(d=t[`$[]`](`rapid`),p=t[`$[]`](`enable_critical`),a=t[`$[]`](`critical_number`),m=t[`$[]`](`target`),f=t[`$[]`](`damage`),c=0,M=0,o=``,B=d;i(z(B,0))&&(H=r.randomizer.$roll_barabara(B,6).$sort(),U=H.$join(`,`),F=E(H,`count`,[],function(A){return A??=e,q(A,m)}),J=E(H,`count`,[],function(A){return A??=e,q(A,a)}),c=$(c,F),i(z(J,0))&&(M=$(M,1)),i(o[`$empty?`]())||(o=$(o,`+`)),o=$(o,``+F+`[`+U+`]`),!!i(p));)B=J;return V=f[`$!=`](0),i(V)?(W=R(c,f),X=r.$translate(`Alsetto.damage`,L([`total_damage`],{total_damage:W})),G=`(`+d+`D6<=`+m+`) ＞ `+o+` ＞ Hits：`+c+`*`+f+` ＞ `+X):(Z=r.$translate(`Alsetto.success_count`,L([`success_count`],{success_count:c})),G=`(`+d+`D6<=`+m+`) ＞ `+o+` ＞ `+Z),i(p)&&(G=$(G,r.$translate(`Alsetto.triumph`,L([`critical_count`],{critical_count:M})))),G})})(u[0],w(`Base`),u)})(D[0],D)})(S[0],S)};Opal.queue(function(n){var v=n.module,I=n.klass,s=n.const_set,N=n.send2,P=n.find_super,g=n.def,i=n.top,C=[];n.nil;return i.$require(`bcdice/game_system/Alsetto`),(function(z,E){var $=[v(z,`BCDice`)].concat(E);return(function(R,S){var k=[v(R,`GameSystem`)].concat(S),T=n.$r(k);return(function(Y,D,j){var x=I(Y,D,`Alsetto_Korean`),b=[x].concat(j);return s(b[0],`ID`,`Alsetto:Korean`),s(b[0],`NAME`,`시편의 알세토`),s(b[0],`SORT_KEY`,`国際化:Korean:시편의 알세토`),s(b[0],`HELP_MESSAGE`,`\u30FB\uC131\uACF5 \uD310\uC815\uFF1AnAL[m]\u3000\u3000\u3000\u3000\u30FB\uD2B8\uB77C\uC774\uC5C4\uD504 \uC5C6\uC74C\uFF1AnALC[m]
\u30FB\uBA85\uC911 \uD310\uC815\uFF1AnAL[m]*p\u3000\u3000\u3000\u30FB\uD2B8\uB77C\uC774\uC5C4\uD504 \uC5C6\uC74C\uFF1AnALC[m]*p
\u30FB\uBA85\uC911 \uD310\uC815(\uAC74\uC2AC\uB9C1\uAC70\uC758 \uADFC\uC6D0\uC2DC)\uFF1AnALG[m]*p
[] \uB0B4\uBD80\uB294 \uC0DD\uB7B5 \uAC00\uB2A5.

AL \uCEE4\uB9E8\uB4DC\uB294 \uD2B8\uB77C\uC774\uC5C4\uD504 \uC218\uB9CC\uD07C, \uC790\uB3D9\uC73C\uB85C \uCD94\uAC00 \uC8FC\uC0AC\uC704 \uAD74\uB9BC \uCC98\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4.
\u300Cn\u300D\uC73C\uB85C \uC8FC\uC0AC\uC704 \uC218\uB97C \uC9C0\uC815.
\u300Cm\u300D\uC73C\uB85C \uBAA9\uD45C\uCE58\uB97C \uC9C0\uC815. \uC0DD\uB7B5 \uC2DC\uC5D0\uB294 \uAE30\uBCF8\uAC12\uC778 \u300C3\u300D\uC774 \uC0AC\uC6A9\uB429\uB2C8\uB2E4.
\u300Cp\u300D\uB85C \uACF5\uACA9\uB825\uC744 \uC9C0\uC815. \u300C*\u300D \uB300\uC2E0 \u300Cx\u300D\uB3C4 \uC0AC\uC6A9 \uAC00\uB2A5.
\uACF5\uACA9\uB825\uC744 \uC9C0\uC815\uD558\uBA74 \uBA85\uC911 \uD310\uC815\uC774 \uB418\uBA70, \uC131\uACF5\uC218\uAC00 \uC544\uB2CC \uB300\uBBF8\uC9C0\uB97C \uACB0\uACFC\uB85C \uD45C\uC2DC\uD569\uB2C8\uB2E4.

ALC \uCEE4\uB9E8\uB4DC\uB294 \uD2B8\uB77C\uC774\uC5C4\uD504 \uC5C6\uC774 \uC131\uACF5\uC218, \uB300\uBBF8\uC9C0\uB97C \uACB0\uACFC\uB85C \uD45C\uC2DC\uD569\uB2C8\uB2E4.
ALG \uCEE4\uB9E8\uB4DC\uB294 \u300C2 \uC774\uD558\u300D\uC5D0\uC11C \uD2B8\uB77C\uC774\uC5C4\uD504 \uCC98\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4.

\u3010\uC0AC\uC6A9 \uC608\uC2DC\u3011
\u30FB5AL \u2192 5d6\uC5D0\uC11C \uBAA9\uD45C\uCE58 3.
\u30FB5ALC \u2192 5d6\uC5D0\uC11C \uBAA9\uD45C\uCE58 3. \uD2B8\uB77C\uC774\uC5C4\uD504 \uC5C6\uC74C.
\u30FB6AL2 \u2192 6d6\uC5D0\uC11C \uBAA9\uD45C\uCE58 2.
\u30FB4AL*5 \u2192 4d6\uC5D0\uC11C \uBAA9\uD45C\uCE58 3, \uACF5\uACA9\uB825 5\uC758 \uBA85\uC911 \uD310\uC815.
\u30FB7AL2x10 \u2192 7d6\uC5D0\uC11C \uBAA9\uD45C\uCE58 2, \uACF5\uACA9\uB825 10\uC758 \uBA85\uC911 \uD310\uC815.
\u30FB8ALC4x5 \u2192 8d6\uC5D0\uC11C \uBAA9\uD45C\uCE58 4, \uACF5\uACA9\uB825 5, \uD2B8\uB77C\uC774\uC5C4\uD504 \uC5C6\uB294 \uBA85\uC911 \uD310\uC815.
`),x.$register_prefix_from_super_class(),g(x,`$initialize`,function u(w){u.$$p;var y=this;return u.$$p=null,N(y,P(y,`initialize`,u,!1,!0),`initialize`,[w],null),y.locale=`ko_kr`})})(k[0],T(`Alsetto`),k)})($[0],$)})(C[0],C)});