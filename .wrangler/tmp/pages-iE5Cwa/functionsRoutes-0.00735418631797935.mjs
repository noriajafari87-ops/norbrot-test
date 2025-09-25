import { onRequestGet as __api_auth_status_ts_onRequestGet } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\auth\\status.ts"
import { onRequestGet as __api_debug_env_ts_onRequestGet } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\debug-env.ts"
import { onRequestPost as __api_order_ts_onRequestPost } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\order.ts"
import { onRequestPost as __api_orders_ts_onRequestPost } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\orders.ts"
import { onRequestGet as __api_products_ts_onRequestGet } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\products.ts"
import { onRequestPost as __api_register_ts_onRequestPost } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\register.ts"
import { onRequestGet as __ping_ts_onRequestGet } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\ping.ts"

export const routes = [
    {
      routePath: "/api/auth/status",
      mountPath: "/api/auth",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_status_ts_onRequestGet],
    },
  {
      routePath: "/api/debug-env",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_debug_env_ts_onRequestGet],
    },
  {
      routePath: "/api/order",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_order_ts_onRequestPost],
    },
  {
      routePath: "/api/orders",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_orders_ts_onRequestPost],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_products_ts_onRequestGet],
    },
  {
      routePath: "/api/register",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_register_ts_onRequestPost],
    },
  {
      routePath: "/ping",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__ping_ts_onRequestGet],
    },
  ]