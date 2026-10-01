import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/arithmetic_evaluator`]=function(e){var y=e.module,T=e.ensure_kwargs,g=e.truthy,H=e.thrower,I=e.def,h=[],v=e.nil,s=e.$$$;return(function(E,S){var C=[y(E,`BCDice`)].concat(S);return(function(D,K){var k=y(D,`ArithmeticEvaluator`),G=[k].concat(K);return(function(R,N){var Y=[R].concat(N),q=e.$r(Y);return I(R,`$eval`,function(z,m){try{H(`eval_return`);var B,F=v;return m=T(m),B=m.$$smap.round_type,B??=s(q(`RoundType`),`FLOOR`),g(z)&&g(F=q(`Arithmetic`).$eval(z,B))?F:0}catch(p){if(p===e.t_eval_return)return p.$v;throw p}},-2)})(e.get_singleton_class(k),G)})(C[0],C)})(h[0],h)};Opal.modules[`bcdice/game_system/Cthulhu`]=function(e){var y=e.module,T=e.klass,g=e.const_set,H=e.send2,I=e.find_super,h=e.def,v=e.eqeqeq,s=e.truthy,E=e.rb_le,S=e.rb_gt,A=e.rb_plus,C=e.send,D=e.thrower,K=e.rb_divide,k=e.rb_times,G=e.rb_lt,R=e.rb_ge,N=e.rb_minus,Y=e.top,q=[],r=e.nil;return Y.$require(`bcdice/arithmetic_evaluator`),(function(z,m){var B=[y(z,`BCDice`)].concat(m);return(function(F,p){var J=[y(F,`GameSystem`)].concat(p),U=e.$r(J);return(function(V,W,X){var d=T(V,W,`Cthulhu`),w=[d].concat(X),P=e.$r(w),j=d.$$prototype;return j.randomizer=j.locale=j.special_percentage=j.critical_percentage=j.fumble_percentage=r,g(w[0],`ID`,`Cthulhu`),g(w[0],`NAME`,`クトゥルフ神話TRPG`),g(w[0],`SORT_KEY`,`くとうるふしんわTRPG`),g(w[0],`HELP_MESSAGE`,`c=\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u5024 \uFF0F f=\u30D5\u30A1\u30F3\u30D6\u30EB\u5024 \uFF0F s=\u30B9\u30DA\u30B7\u30E3\u30EB

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

`),d.$register_prefix(`CCB?`,`RESB?`,`CBRB?`),h(d,`$initialize`,function b($){b.$$p;var n=this;return b.$$p=null,H(n,I(n,`initialize`,b,!1,!0),`initialize`,[$],null),n.special_percentage=20,n.critical_percentage=1,n.fumble_percentage=1}),h(d,`$eval_game_system_specific_command`,function($){var i=this,n=r;return v(/CCB/i,n=$)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getCheckResult($)):v(/CC/i,n)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getCheckResult($)):v(/RESB/i,n)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getRegistResult($)):v(/CBRB/i,n)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getCombineRoll($)):v(/RES/i,n)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getRegistResult($)):v(/CBR/i,n)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getCombineRoll($)):r}),d.$private(),h(d,`$getCheckResult`,function($){try{D(`eval_return`);var n=this,a=r,u=r,l=r,t=r,c=r,f=r;return a=/^CCB?(\d+)?(?:<=([+-\/*\d]+))?$/i.$match($),s(a)?(u=a[`$[]`](1).$to_i(),l=P(`ArithmeticEvaluator`).$eval(a[`$[]`](2)),s(E(l,0))?(t=n.randomizer.$roll_once(100),P(`Result`).$new(`(1D100) ＞ `+t)):(c=`(1D100<=`+l+`)`,s(S(u,0))&&(c=A(c,` `+n.$translate(`Cthulhu.broken_number`)+`[`+u+`]`)),t=n.randomizer.$roll_once(100),f=n.$compare(t,l,u),C(f.$to_result(),`tap`,[],function(_){var x;return _??=r,x=[``+c+` ＞ `+t+` ＞ `+f.$text()],C(_,`text=`,x),x[x.length-1]}))):r}catch(o){if(o===e.t_eval_return)return o.$v;throw o}}),(function(b,$,i){var n=T(b,$,`CompareResult`),a=[n].concat(i),u=e.$r(a);return n.$include(u(`Translate`)),n.$attr_accessor(`success`,`failure`,`critical`,`fumble`,`special`,`broken`),h(n,`$initialize`,function(t){var c=this;return c.locale=t,c.success=!1,c.failure=!1,c.critical=!1,c.fumble=!1,c.special=!1,c.broke=!1}),h(n,`$text`,function(){var t=this;return s(t.$critical())&&s(t.$special())?t.$translate(`Cthulhu.critical_special`):s(t.$critical())?t.$translate(`Cthulhu.critical`):s(t.$special())?t.$translate(`Cthulhu.special`):s(t.$success())?t.$translate(`success`):s(t.$broken())&&s(t.$fumble())?``+t.$translate(`Cthulhu.fumble`)+`/`+t.$translate(`Cthulhu.broken`):s(t.$broken())?t.$translate(`Cthulhu.broken`):s(t.$fumble())?t.$translate(`Cthulhu.fumble`):s(t.$failure())?t.$translate(`failure`):r}),h(n,`$to_result`,function(){var t=this;return C(u(`Result`).$new(),`tap`,[],function c(f){var o,_=c.$$s==null?this:c.$$s;return f??=r,f[`$success=`](_.$success()),f[`$failure=`](_.$failure()),f[`$critical=`](_.$critical()),o=[_.$fumble()],C(f,`fumble=`,o),o[o.length-1]},{$$s:t})})})(w[0],null,w),h(d,`$compare`,function($,i,n){var a=this,u=r,l=r;return n??=0,u=P(`CompareResult`).$new(a.locale),l=K(k(i,a.special_percentage),100).$to_i().$clamp(1,100),s(E($,i))&&s(G($,100))?(u[`$success=`](!0),u[`$special=`](E($,l)),u[`$critical=`](E($,a.critical_percentage))):(u[`$failure=`](!0),u[`$fumble=`](R($,N(101,a.fumble_percentage)))),s(S(n,0))&&s(R($,n))&&(u[`$broken=`](!0),u[`$failure=`](!0),u[`$success=`](!1),u[`$special=`](!1),u[`$critical=`](!1)),u},-3),h(d,`$getRegistResult`,function($){var i=this,n=r,a=r,u=r,l=r,t=r;return n=/^RESB?(-?\d+)$/i.$match($),s(n)?(a=n[`$[]`](1).$to_i(),u=A(k(a,5),50),s(G(u,5))?P(`Result`).$failure(`(1d100<=`+u+`) ＞ `+i.$translate(`Cthulhu.automatic_failure`)):s(S(u,95))?P(`Result`).$success(`(1d100<=`+u+`) ＞ `+i.$translate(`Cthulhu.automatic_success`)):(l=i.randomizer.$roll_once(100),t=i.$compare(l,u),C(t.$to_result(),`tap`,[],function(f){var o;return f??=r,o=[`(1d100<=`+u+`) ＞ `+l+` ＞ `+t.$text()],C(f,`text=`,o),o[o.length-1]}))):r}),h(d,`$getCombineRoll`,function($){var i=this,n=r,a=r,u=r,l=r,t=r,c=r,f=r;return n=/^CBR(B)?\((\d+),(\d+)\)$/i.$match($),s(n)?(a=n[`$[]`](2).$to_i(),u=n[`$[]`](3).$to_i(),l=i.randomizer.$roll_once(100),t=i.$compare(l,a),c=i.$compare(l,u),f=s(t.$success())&&s(c.$success())?i.$translate(`success`):s(t.$success())||s(c.$success())?i.$translate(`Cthulhu.partial_success`):i.$translate(`failure`),C(P(`Result`).$new(),`tap`,[],function(_){var x,L=r;return _??=r,_[`$text=`](`(1d100<=`+a+`,`+u+`) ＞ `+l+`[`+t.$text()+`,`+c.$text()+`] ＞ `+f),_[`$critical=`](s(L=t.$critical())?L:c.$critical()),_[`$fumble=`](s(L=t.$fumble())?L:c.$fumble()),x=[s(L=t.$success())?L:c.$success()],C(_,`condition=`,x),x[x.length-1]})):r})})(J[0],U(`Base`),J)})(B[0],B)})(q[0],q)};Opal.queue(function(e){var y=e.module,T=e.klass,g=e.const_set,H=e.send2,I=e.find_super,h=e.def,v=e.top,s=[];e.nil;return v.$require(`bcdice/game_system/Cthulhu`),(function(S,A){var D=[y(S,`BCDice`)].concat(A);return(function(K,k){var R=[y(K,`GameSystem`)].concat(k),N=e.$r(R);return(function(Y,q,r){var z=T(Y,q,`Cthulhu_ChineseTraditional`),m=[z].concat(r);return g(m[0],`ID`,`Cthulhu:ChineseTraditional`),g(m[0],`NAME`,`克蘇魯神話`),g(m[0],`SORT_KEY`,`国際化:Chinese Traditional:克蘇魯神話`),g(m[0],`HELP_MESSAGE`,`c=\u7206\u64CA\u7387 \uFF0F f=\u5927\u5931\u6557\u503C \uFF0F s=\u7279\u6B8A

1d100<=n    c\u30FBf\u30FBs\u5168\u95DC\u9589\uFF08\u53EA\u9032\u884C\u55AE\u7D14\u6578\u503C\u6BD4\u8F03\u5224\u5B9A\uFF09

\u30FBcfs\u4ED8\u8A3B\u5224\u5B9A\u6307\u4EE4

CC	 1d100\u64F2\u9AB0 c=1\u3001f=100
CCB  \u540C\u4E0A\u3001c=5\u3001f=96

\u4F8B\uFF1ACC<=80  \uFF08\u4EE5\u6280\u80FD\u503C80\u4F86\u5224\u5B9A\u3002cf\u9069\u7528\u65BC1%\u898F\u5247\uFF09
\u4F8B\uFF1ACCB<=55 \uFF08\u4EE5\u6280\u80FD\u503C55\u4F86\u5224\u5B9A\u3002cf\u9069\u7528\u65BC5%\u898F\u5247\uFF09

\u30FB\u95DC\u65BC\u7D44\u5408\u9AB0\u7D44

CBR(x,y)	c=1\u3001f=100
CBRB(x,y)	c=5\u3001f=96

\u30FB\u95DC\u65BC\u5C0D\u6297\u9AB0
RES(x-y)	c=1\u3001f=100
RESB(x-y)	c=5\u3001f=96

\u203B\u6545\u969C\u7387\u5224\u5B9A

\u30FBCC(x) c=1\u3001f=100
x=\u6545\u969C\u7387\u3002\u64F2\u51FA\u9AB0\u503Cx\u4EE5\u4E0A\u6642\u3001\u9700\u5728\u5927\u5931\u6557\u767C\u751F\u540C\u6642\u8F38\u51FA\uFF08\u53C3\u7167\u300C\u5927\u5931\u6557\uFF06\u6545\u969C\u300D\uFF09
\u6C92\u6709\u5927\u5931\u6557\u6642\uFF0C\u7121\u8AD6\u6210\u529F\u6216\u5931\u6557\u53EA\u9700\u53C3\u8003[\u6545\u969C]\u4F86\u8F38\u51FA(\u4E26\u975E\u6210\u529F\u6216\u5931\u6557\u4F86\u8F38\u51FA\uFF0C\u800C\u662F\u8986\u84CB\u4E0A\u53BB\u4E26\u5C0D\u5176\u8F38\u51FA)

\u30FBCCB(x) c=5\u3001f=96
\u540C\u4E0A

`),z.$register_prefix_from_super_class(),h(z,`$initialize`,function M(B){M.$$p;var p=this;return M.$$p=null,H(p,I(p,`initialize`,M,!1,!0),`initialize`,[B],null),p.locale=`zh_hant`})})(R[0],N(`Cthulhu`),R)})(D[0],D)})(s[0],s)});