import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/arithmetic_evaluator`]=function(e){var y=e.module,A=e.ensure_kwargs,g=e.truthy,L=e.thrower,H=e.def,h=[],v=e.nil,s=e.$$$;return(function(E,z){var C=[y(E,`BCDice`)].concat(z);return(function(G,I){var k=y(G,`ArithmeticEvaluator`),T=[k].concat(I);return(function(R,N){var Y=[R].concat(N),q=e.$r(Y);return H(R,`$eval`,function(S,m){try{L(`eval_return`);var B,F=v;return m=A(m),B=m.$$smap.round_type,B??=s(q(`RoundType`),`FLOOR`),g(S)&&g(F=q(`Arithmetic`).$eval(S,B))?F:0}catch(p){if(p===e.t_eval_return)return p.$v;throw p}},-2)})(e.get_singleton_class(k),T)})(C[0],C)})(h[0],h)};Opal.modules[`bcdice/game_system/Cthulhu`]=function(e){var y=e.module,A=e.klass,g=e.const_set,L=e.send2,H=e.find_super,h=e.def,v=e.eqeqeq,s=e.truthy,E=e.rb_le,z=e.rb_gt,D=e.rb_plus,C=e.send,G=e.thrower,I=e.rb_divide,k=e.rb_times,T=e.rb_lt,R=e.rb_ge,N=e.rb_minus,Y=e.top,q=[],n=e.nil;return Y.$require(`bcdice/arithmetic_evaluator`),(function(S,m){var B=[y(S,`BCDice`)].concat(m);return(function(F,p){var J=[y(F,`GameSystem`)].concat(p),U=e.$r(J);return(function(V,W,X){var d=A(V,W,`Cthulhu`),w=[d].concat(X),M=e.$r(w),j=d.$$prototype;return j.randomizer=j.locale=j.special_percentage=j.critical_percentage=j.fumble_percentage=n,g(w[0],`ID`,`Cthulhu`),g(w[0],`NAME`,`クトゥルフ神話TRPG`),g(w[0],`SORT_KEY`,`くとうるふしんわTRPG`),g(w[0],`HELP_MESSAGE`,`c=\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u5024 \uFF0F f=\u30D5\u30A1\u30F3\u30D6\u30EB\u5024 \uFF0F s=\u30B9\u30DA\u30B7\u30E3\u30EB

1d100<=n    c\u30FBf\u30FBs\u3059\u3079\u3066\u30AA\u30D5\uFF08\u5358\u7D14\u306A\u6570\u5024\u6BD4\u8F03\u5224\u5B9A\u306E\u307F\u884C\u3044\u307E\u3059\uFF09

\u30FBcfs\u5224\u5B9A\u4ED8\u304D\u5224\u5B9A\u30B3\u30DE\u30F3\u30C9

CC	 1d100\u30ED\u30FC\u30EB\u3092\u884C\u3046 c=1\u3001f=100
CCB  \u540C\u4E0A\u3001c=5\u3001f=96

\u4F8B\uFF1ACC<=80  \uFF08\u6280\u80FD\u502480\u3067\u884C\u70BA\u5224\u5B9A\u30021%\u30EB\u30FC\u30EB\u3067cf\u9069\u7528\uFF09
\u4F8B\uFF1ACCB<=55 \uFF08\u6280\u80FD\u502455\u3067\u884C\u70BA\u5224\u5B9A\u30025%\u30EB\u30FC\u30EB\u3067cf\u9069\u7528\uFF09

\u30FB\u7D44\u307F\u5408\u308F\u305B\u30ED\u30FC\u30EB\u306B\u3064\u3044\u3066

CBR(x,y)	c=1\u3001f=100
CBRB(x,y)	c=5\u3001f=96

\u30FB\u62B5\u6297\u8868\u30ED\u30FC\u30EB\u306B\u3064\u3044\u3066
RES(x-y)	c=1\u3001f=100
RESB(x-y)	c=5\u3001f=96

\u203B\u6545\u969C\u30CA\u30F3\u30D0\u30FC\u5224\u5B9A

\u30FBCC(x) c=1\u3001f=100
x=\u6545\u969C\u30CA\u30F3\u30D0\u30FC\u3002\u51FA\u76EEx\u4EE5\u4E0A\u304C\u51FA\u305F\u4E0A\u3067\u3001\u30D5\u30A1\u30F3\u30D6\u30EB\u304C\u540C\u6642\u306B\u767A\u751F\u3057\u305F\u5834\u5408\u3001\u5171\u306B\u51FA\u529B\u3059\u308B\uFF08\u30C6\u30AD\u30B9\u30C8\u300C\u30D5\u30A1\u30F3\u30D6\u30EB\uFF06\u6545\u969C\u300D\uFF09
\u30D5\u30A1\u30F3\u30D6\u30EB\u3067\u306A\u3044\u5834\u5408\u3001\u6210\u529F\u30FB\u5931\u6557\u306B\u95A2\u308F\u3089\u305A\u30C6\u30AD\u30B9\u30C8\u300C\u6545\u969C\u300D\u306E\u307F\u3092\u51FA\u529B\u3059\u308B\uFF08\u6210\u529F\u30FB\u5931\u6557\u3092\u51FA\u529B\u305B\u305A\u3001\u4E0A\u66F8\u304D\u3057\u305F\u3082\u306E\u3092\u51FA\u529B\u3059\u308B\u5F62\uFF09

\u30FBCCB(x) c=5\u3001f=96
\u540C\u4E0A

`),d.$register_prefix(`CCB?`,`RESB?`,`CBRB?`),h(d,`$initialize`,function b($){b.$$p;var r=this;return b.$$p=null,L(r,H(r,`initialize`,b,!1,!0),`initialize`,[$],null),r.special_percentage=20,r.critical_percentage=1,r.fumble_percentage=1}),h(d,`$eval_game_system_specific_command`,function($){var i=this,r=n;return v(/CCB/i,r=$)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getCheckResult($)):v(/CC/i,r)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getCheckResult($)):v(/RESB/i,r)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getRegistResult($)):v(/CBRB/i,r)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getCombineRoll($)):v(/RES/i,r)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getRegistResult($)):v(/CBR/i,r)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getCombineRoll($)):n}),d.$private(),h(d,`$getCheckResult`,function($){try{G(`eval_return`);var r=this,a=n,u=n,l=n,t=n,c=n,f=n;return a=/^CCB?(\d+)?(?:<=([+-\/*\d]+))?$/i.$match($),s(a)?(u=a[`$[]`](1).$to_i(),l=M(`ArithmeticEvaluator`).$eval(a[`$[]`](2)),s(E(l,0))?(t=r.randomizer.$roll_once(100),M(`Result`).$new(`(1D100) ＞ `+t)):(c=`(1D100<=`+l+`)`,s(z(u,0))&&(c=D(c,` `+r.$translate(`Cthulhu.broken_number`)+`[`+u+`]`)),t=r.randomizer.$roll_once(100),f=r.$compare(t,l,u),C(f.$to_result(),`tap`,[],function(_){var x;return _??=n,x=[``+c+` ＞ `+t+` ＞ `+f.$text()],C(_,`text=`,x),x[x.length-1]}))):n}catch(o){if(o===e.t_eval_return)return o.$v;throw o}}),(function(b,$,i){var r=A(b,$,`CompareResult`),a=[r].concat(i),u=e.$r(a);return r.$include(u(`Translate`)),r.$attr_accessor(`success`,`failure`,`critical`,`fumble`,`special`,`broken`),h(r,`$initialize`,function(t){var c=this;return c.locale=t,c.success=!1,c.failure=!1,c.critical=!1,c.fumble=!1,c.special=!1,c.broke=!1}),h(r,`$text`,function(){var t=this;return s(t.$critical())&&s(t.$special())?t.$translate(`Cthulhu.critical_special`):s(t.$critical())?t.$translate(`Cthulhu.critical`):s(t.$special())?t.$translate(`Cthulhu.special`):s(t.$success())?t.$translate(`success`):s(t.$broken())&&s(t.$fumble())?``+t.$translate(`Cthulhu.fumble`)+`/`+t.$translate(`Cthulhu.broken`):s(t.$broken())?t.$translate(`Cthulhu.broken`):s(t.$fumble())?t.$translate(`Cthulhu.fumble`):s(t.$failure())?t.$translate(`failure`):n}),h(r,`$to_result`,function(){var t=this;return C(u(`Result`).$new(),`tap`,[],function c(f){var o,_=c.$$s==null?this:c.$$s;return f??=n,f[`$success=`](_.$success()),f[`$failure=`](_.$failure()),f[`$critical=`](_.$critical()),o=[_.$fumble()],C(f,`fumble=`,o),o[o.length-1]},{$$s:t})})})(w[0],null,w),h(d,`$compare`,function($,i,r){var a=this,u=n,l=n;return r??=0,u=M(`CompareResult`).$new(a.locale),l=I(k(i,a.special_percentage),100).$to_i().$clamp(1,100),s(E($,i))&&s(T($,100))?(u[`$success=`](!0),u[`$special=`](E($,l)),u[`$critical=`](E($,a.critical_percentage))):(u[`$failure=`](!0),u[`$fumble=`](R($,N(101,a.fumble_percentage)))),s(z(r,0))&&s(R($,r))&&(u[`$broken=`](!0),u[`$failure=`](!0),u[`$success=`](!1),u[`$special=`](!1),u[`$critical=`](!1)),u},-3),h(d,`$getRegistResult`,function($){var i=this,r=n,a=n,u=n,l=n,t=n;return r=/^RESB?(-?\d+)$/i.$match($),s(r)?(a=r[`$[]`](1).$to_i(),u=D(k(a,5),50),s(T(u,5))?M(`Result`).$failure(`(1d100<=`+u+`) ＞ `+i.$translate(`Cthulhu.automatic_failure`)):s(z(u,95))?M(`Result`).$success(`(1d100<=`+u+`) ＞ `+i.$translate(`Cthulhu.automatic_success`)):(l=i.randomizer.$roll_once(100),t=i.$compare(l,u),C(t.$to_result(),`tap`,[],function(f){var o;return f??=n,o=[`(1d100<=`+u+`) ＞ `+l+` ＞ `+t.$text()],C(f,`text=`,o),o[o.length-1]}))):n}),h(d,`$getCombineRoll`,function($){var i=this,r=n,a=n,u=n,l=n,t=n,c=n,f=n;return r=/^CBR(B)?\((\d+),(\d+)\)$/i.$match($),s(r)?(a=r[`$[]`](2).$to_i(),u=r[`$[]`](3).$to_i(),l=i.randomizer.$roll_once(100),t=i.$compare(l,a),c=i.$compare(l,u),f=s(t.$success())&&s(c.$success())?i.$translate(`success`):s(t.$success())||s(c.$success())?i.$translate(`Cthulhu.partial_success`):i.$translate(`failure`),C(M(`Result`).$new(),`tap`,[],function(_){var x,P=n;return _??=n,_[`$text=`](`(1d100<=`+a+`,`+u+`) ＞ `+l+`[`+t.$text()+`,`+c.$text()+`] ＞ `+f),_[`$critical=`](s(P=t.$critical())?P:c.$critical()),_[`$fumble=`](s(P=t.$fumble())?P:c.$fumble()),x=[s(P=t.$success())?P:c.$success()],C(_,`condition=`,x),x[x.length-1]})):n})})(J[0],U(`Base`),J)})(B[0],B)})(q[0],q)};Opal.queue(function(e){var y=e.module,A=e.klass,g=e.const_set,L=e.send2,H=e.find_super,h=e.def,v=e.top,s=[];e.nil;return v.$require(`bcdice/game_system/Cthulhu`),(function(z,D){var G=[y(z,`BCDice`)].concat(D);return(function(I,k){var R=[y(I,`GameSystem`)].concat(k),N=e.$r(R);return(function(Y,q,n){var S=A(Y,q,`Cthulhu_Korean`),m=[S].concat(n);return g(m[0],`ID`,`Cthulhu:Korean`),g(m[0],`NAME`,`크툴루`),g(m[0],`SORT_KEY`,`国際化:Korean:크툴루`),g(m[0],`HELP_MESSAGE`,`c=\uD06C\uB9AC\uD2F0\uCEEC\uCE58 \uFF0F f=\uD38C\uBE14\uCE58 \uFF0F s=\uC2A4\uD398\uC15C

1d100<=n    c\u30FBf\u30FBs \uBAA8\uB450 \uC624\uD504\uFF08\uB2E8\uC21C\uD558\uAC8C \uC218\uCE58\uB9CC\uC744 \uBF51\uC544\uB0BC \uB54C \uC0AC\uC6A9\uFF09

\u30FBcfs\uC774 \uBD99\uB294 \uD310\uC815\uC758 \uCEE4\uB9E8\uB4DC

CC	 1d100 \uD310\uC815\uC744 \uD589\uD568 c=1\u3001f=100
CCB  \uC704\uC640 \uB3D9\uC77C\u3001c=5\u3001f=96

\uC608\uFF1ACC<=80  \uFF08\uAE30\uB2A5\uCE58 80\uB85C \uD589\uD718\uD310\uC815. 1%\uB8F0\uC73C\uB85C cf\uC801\uC6A9\uFF09
\uC608\uFF1ACCB<=55 \uFF08\uAE30\uB2A5\uCE58 55\uB85C \uD589\uD718\uD310\uC815. 5%\uB8F0\uC73C\uB85C cf\uC801\uC6A9\uFF09

\u30FB\uACBD\uC6B0\uC758 \uC218 \uD310\uC815\uC5D0 \uB300\uD574\uC11C

CBR(x,y)	c=1\u3001f=100
CBRB(x,y)	c=5\u3001f=96

\u30FB\uC800\uD56D \uD310\uC815\uC5D0 \uB300\uD574\uC11C
RES(x-y)	c=1\u3001f=100
RESB(x-y)	c=5\u3001f=96

\u203B\uACE0\uC7A5 \uB118\uBC84 \uD310\uC815

\u30FBCC(x) c=1\u3001f=100
x=\uACE0\uC7A5 \uB118\uBC84. \uC8FC\uC0AC\uC704 \uB208x\uC774\uC0C1\uC774 \uB098\uC628 \uD6C4\uC5D0, \uD38C\uBE14\uC774 \uB3D9\uC2DC\uC5D0 \uBC1C\uC0DD\uD588\uC744 \uACBD\uC6B0. \uBAA8\uB450 \uCD9C\uB825\uD55C\uB2E4. \uFF08\uD14D\uC2A4\uD2B8 \u300C\uD38C\uBE14\uFF06\uACE0\uC7A5\u300D\uFF09
\uD38C\uBE14\uC774 \uC544\uB2CC \uACBD\uC6B0, \uC131\uACF5\u30FB\uC2E4\uD328\uC5D0 \uAD00\uB828\uB418\uC9C0 \uC54A\uACE0 \u300C\uACE0\uC7A5\u300D\uB9CC\uC744 \uCD9C\uB825\uD55C\uB2E4. \uFF08\uC131\uACF5\u30FB\uC2E4\uD328\uB97C \uCD9C\uB825\uD558\uC9C0 \uC54A\uACE0 \uB367\uC4F0\uAE30\uD55C \uAC83\uC744 \uCD9C\uB825\uD558\uB294 \uD615\uD0DC\uFF09

\u30FBCCB(x) c=5\u3001f=96
\uC704\uC640 \uB3D9\uC77C
`),S.$register_prefix_from_super_class(),h(S,`$initialize`,function K(B){K.$$p;var p=this;return K.$$p=null,L(p,H(p,`initialize`,K,!1,!0),`initialize`,[B],null),p.locale=`ko_kr`})})(R[0],N(`Cthulhu`),R)})(G[0],G)})(s[0],s)});