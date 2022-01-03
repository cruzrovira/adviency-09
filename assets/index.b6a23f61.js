import {
  e as x,
  r as d,
  j as o,
  F as m,
  a as l,
  V as R,
  H as N,
  I as w,
  N as C,
  b as I,
  c as k,
  d as j,
  f as L,
  B as f,
  T as g,
  v as O,
  R as A,
  g as E,
  C as F,
} from "./vendor.c8c51aa9.js"
const B = function () {
  const a = document.createElement("link").relList

  if (a && a.supports && a.supports("modulepreload")) return
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e)
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === "childList")
        for (const i of r.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && s(i)
  }).observe(document, {childList: !0, subtree: !0})
  function c(e) {
    const r = {}

    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (r.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    )
  }
  function s(e) {
    if (e.ep) return
    e.ep = !0
    const r = c(e)

    fetch(e.href, r)
  }
}

B()
var D = "./assets/bg.6808d548.jpg",
  H = x({
    styles: {
      global: {
        body: {
          backgroundImage: `url(${D})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          fontSize: "16px",
          w: "100%",
          minH: "100vh",
        },
      },
    },
  })

function M() {
  const [n, a] = d.exports.useState([]),
    [c, s] = d.exports.useState(""),
    [e, r] = d.exports.useState(""),
    [i, u] = d.exports.useState(1)

  d.exports.useEffect(() => {
    localStorage.getItem("regalos") && a(JSON.parse(localStorage.getItem("regalos")))
  }, []),
    d.exports.useEffect(() => {
      localStorage.setItem("regalos", JSON.stringify(n))
    }, [n])
  const p = (t) => {
      t.preventDefault(), S() && a([...n, {id: O(), name: c, count: i}])
    },
    h = () => {
      a([]), s(""), u(1)
    },
    b = (t) => {
      a(n.filter((v) => v.id !== t))
    },
    S = () => {
      if (c.trim().length === 0) return r("Agregue regalos para enviar"), s(""), u(1), !1
      for (let t of n)
        if (t.name.trim().toLocaleUpperCase() === c.toLocaleUpperCase())
          return r("ya existe un regalo con ese nombre"), s(""), u(1), !1

      return s(""), u(1), !0
    },
    y = () =>
      n.map((t) =>
        l(
          m,
          {
            justifyContent: "space-between",
            w: "100%",
            children: [
              o(g, {children: t.name}),
              l(g, {children: ["X", t.count]}),
              o(f, {colorScheme: "red", size: "xs", onClick: () => b(t.id), children: "X"}),
            ],
          },
          t.id,
        ),
      )

  return o(m, {
    alignItems: "center",
    justifyContent: "center",
    minH: "100vh",
    w: "100%",
    children: l(R, {
      background: "white",
      boxShadow: "md",
      p: 4,
      w: "360px",
      children: [
        o(N, {fontFamily: "'Mountains of Christmas'", children: " Regalos"}),
        l(m, {
          as: "form",
          gap: 2,
          onSubmit: p,
          children: [
            o(w, {placeholder: "Regalo", value: c, onChange: (t) => s(t.target.value)}),
            l(C, {
              defaultValue: 1,
              max: 99,
              min: 1,
              value: i,
              w: "40%",
              onChange: (t) => u(Number(t)),
              children: [o(I, {}), l(k, {children: [o(j, {}), o(L, {})]})],
            }),
            o(f, {colorScheme: "red", type: "submit", children: "Agregar"}),
          ],
        }),
        l(g, {color: "red", children: [" ", e]}),
        n.length !== 0
          ? y()
          : o(g, {color: "gray.400", children: "No hay regalos Grinch!! agrega uno ."}),
        n.length !== 0 &&
          o(f, {colorScheme: "red", w: "100%", onClick: h, children: "Borrar Todo"}),
      ],
    }),
  })
}
A.render(
  o(E.StrictMode, {children: o(F, {theme: H, children: o(M, {})})}),
  document.getElementById("root"),
)
